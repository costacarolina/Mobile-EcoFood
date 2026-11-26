import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/../context/themeContext";
import { getNotificacoes, Notificacao } from "@/api/get-notificacoes";
import { getUsuario } from "@/lib/session";

const TIPOS = {
  VENCIDO: { icon: "alert-circle", cor: "#D9534F" },
  VENCE_HOJE: { icon: "time", cor: "#E08A2E" },
  PROXIMO_DO_VENCIMENTO: { icon: "warning-outline", cor: "#C9A34B" },
} as const;

// "2026-10-30T00:00:00.000Z" -> "30/10/2026" (sem mudar o dia por causa do fuso)
function formatarData(iso: string) {
  return iso.slice(0, 10).split("-").reverse().join("/");
}

export default function Notificacoes() {
  const { darkMode } = useTheme();

  const [lista, setLista] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  const colors = {
    background: darkMode ? "#181818" : "#FFFFFF",
    card: darkMode ? "#2B2B2B" : "#FAFAFA",
    text: darkMode ? "#FFFFFF" : "#171717",
    secondary: darkMode ? "#C8C8C8" : "#777777",
    border: darkMode ? "#444444" : "#DDDDDD",
  };

  useFocusEffect(
    useCallback(() => {
      const id = getUsuario()?.id;
      if (!id) {
        setCarregando(false);
        return;
      }

      setCarregando(true);
      getNotificacoes(id)
        .then((dados) => setLista(dados.notificacoes))
        .catch((erro) =>
          console.log("Erro ao buscar notificações:", erro.response?.data || erro.message)
        )
        .finally(() => setCarregando(false));
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.titulo, { color: colors.text }]}>Notificações</Text>

        <View style={{ width: 24 }} />
      </View>

      {carregando ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#155B3A" />
      ) : (
        <ScrollView contentContainerStyle={styles.lista}>
          {lista.length === 0 && (
            <Text style={[styles.vazio, { color: colors.secondary }]}>
              Nenhum produto próximo do vencimento. 🎉
            </Text>
          )}

          {lista.map((item) => {
            const tipo = TIPOS[item.tipo] ?? TIPOS.PROXIMO_DO_VENCIMENTO;

            return (
              <View
                key={item.produtoId}
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons name={tipo.icon} size={28} color={tipo.cor} />

                <View style={styles.info}>
                  <Text style={[styles.nome, { color: colors.text }]}>{item.nome}</Text>
                  <Text style={[styles.texto, { color: colors.secondary }]}>
                    {item.mensagem}
                  </Text>
                  <Text style={[styles.texto, { color: colors.secondary }]}>
                    Validade: {formatarData(item.dataValidade)}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 55 },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  titulo: { fontSize: 20, fontWeight: "700" },
  lista: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
  vazio: { textAlign: "center", marginTop: 40, fontSize: 15 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  texto: { fontSize: 13 },
});