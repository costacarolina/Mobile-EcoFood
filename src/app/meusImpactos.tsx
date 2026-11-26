import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useTheme } from "@/../context/themeContext";
import { getUsuario } from "@/lib/session";
import { getImpacto, Impacto } from "../api/get-impacto";

const ALTURA_MAXIMA_BARRA = 120;

export default function MeuImpacto() {
  const { darkMode } = useTheme();

  const cores = {
    fundo: darkMode ? "#121A15" : "#FFFFFF",
    fundoFinal: darkMode ? "#1B2920" : "#F4F5EC",
    card: darkMode ? "#243329" : "#f1f1f1",
    texto: darkMode ? "#F2F5F0" : "#111111",
    textoSecundario: darkMode ? "#D0D9D1" : "#222222",
    titulo: darkMode ? "#A7D5AE" : "#000000",
    verde: darkMode ? "#80D68A" : "#29952E",
    amarelo: darkMode ? "#F0D95A" : "#E6C600",
    barra: darkMode ? "#80B88A" : "#416F49",
    desperdicio: darkMode ? "#E57373" : "#D9534F",
  };

  const [impacto, setImpacto] = useState<Impacto | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Atualiza sempre que a tela abre, para refletir os status atualizados
  useFocusEffect(
    useCallback(() => {
      const id = getUsuario()?.id;
      if (!id) {
        setCarregando(false);
        return;
      }

      setCarregando(true);
      getImpacto(id)
        .then(setImpacto)
        .catch((erro) => console.log("Erro ao carregar impacto:", erro.response?.data || erro.message))
        .finally(() => setCarregando(false));
    }, [])
  );

  const kg = (valor: number) => `${String(valor ?? 0).replace(".", ",")} kg`;

  const evolucao = impacto?.evolucao ?? [];
  const maiorValor = Math.max(
    1,
    ...evolucao.map((semana) => Math.max(semana.alimentosSalvos, semana.desperdicios))
  );
  const semRegistros = !carregando && (impacto?.totalAlimentos ?? 0) === 0 && (impacto?.unidades.aproveitadas ?? 0) + (impacto?.unidades.desperdicadas ?? 0) === 0;

  function alturaBarra(valor: number) {
    if (valor <= 0) return 0;
    return Math.max(4, (valor / maiorValor) * ALTURA_MAXIMA_BARRA);
  }

  return (
    <LinearGradient colors={[cores.fundo, cores.fundo, cores.fundoFinal]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color={cores.titulo} />
        </TouchableOpacity>

        <Text style={[styles.titulo, { color: cores.titulo }]}>Meu Impacto</Text>

        <Ionicons name="notifications-outline" size={27} color={cores.texto} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: cores.card }]}>
          <View style={styles.textosCard}>
            <Text style={[styles.textoPequeno, { color: cores.texto }]}>🌱 Com pequenas escolhas,</Text>
            <Text style={[styles.textoDestaque, { color: cores.texto }]}>
              geramos grandes{"\n"}mudanças.
            </Text>
          </View>

          <Text style={styles.planta}>🪴</Text>
        </View>

        <Text style={[styles.subtitulo, { color: cores.texto }]}>Seu resumo de impacto</Text>

        {carregando && !impacto ? (
          <ActivityIndicator size="large" color={cores.verde} style={{ marginVertical: 30 }} />
        ) : (
          <View style={[styles.resumo, { backgroundColor: cores.card }]}>
            <View style={styles.itemResumo}>
              <Text style={[styles.verde, { color: cores.verde }]}>{kg(impacto?.alimentosSalvos ?? 0)}</Text>
              <Text style={[styles.descricao, { color: cores.textoSecundario }]}>
                de alimentos{"\n"}aproveitados
              </Text>
            </View>

            <View style={styles.itemResumo}>
              <Text style={[styles.amarelo, { color: cores.amarelo }]}>
                {String(impacto?.reducaoResiduos ?? 0).replace(".", ",")}%
              </Text>
              <Text style={[styles.descricao, { color: cores.textoSecundario }]}>
                de aproveitamento{"\n"}dos alimentos
              </Text>
            </View>

            <View style={styles.itemResumo}>
              <Text style={[styles.preto, { color: cores.texto }]}>{impacto?.escolhasConscientes ?? 0}</Text>
              <Text style={[styles.descricao, { color: cores.textoSecundario }]}>
                escolhas{"\n"}conscientes
              </Text>
            </View>
          </View>
        )}

        {(impacto?.unidades.aproveitadas ?? 0) > 0 || (impacto?.unidades.desperdicadas ?? 0) > 0 ? (
          <Text style={[styles.descricao, styles.textoUnidades, { color: cores.textoSecundario }]}>
            Itens por unidade: {impacto?.unidades.aproveitadas ?? 0} aproveitadas ·{" "}
            {impacto?.unidades.desperdicadas ?? 0} não aproveitadas
          </Text>
        ) : null}

        <Text style={[styles.subtitulo, { color: cores.texto }]}>Evolução do seu impacto (kg)</Text>

        <View style={[styles.grafico, { backgroundColor: cores.card }]}>
          {semRegistros ? (
            <Text style={[styles.descricao, styles.textoVazio, { color: cores.textoSecundario }]}>
              Ainda não há registros. Atualize o status de um produto para ver seu impacto aqui.
            </Text>
          ) : (
            <View style={styles.barras}>
              {evolucao.map((semana) => (
                <View key={semana.semana} style={styles.itemGrafico}>
                  <Text style={[styles.valor, { color: cores.texto }]}>
                    {String(semana.alimentosSalvos).replace(".", ",")}
                  </Text>

                  <View style={styles.par}>
                    <View
                      style={[
                        styles.barra,
                        { height: alturaBarra(semana.alimentosSalvos), backgroundColor: cores.barra },
                      ]}
                    />
                    <View
                      style={[
                        styles.barra,
                        { height: alturaBarra(semana.desperdicios), backgroundColor: cores.desperdicio },
                      ]}
                    />
                  </View>

                  <Text style={[styles.nomeSemana, { color: cores.texto }]}>{semana.semana}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.legenda}>
          <View style={styles.legendaItem}>
            <View style={[styles.bolinha, { backgroundColor: cores.barra }]} />
            <Text style={[styles.descricao, { color: cores.textoSecundario }]}>Aproveitados (kg)</Text>
          </View>

          <View style={styles.legendaItem}>
            <View style={[styles.bolinha, { backgroundColor: cores.desperdicio }]} />
            <Text style={[styles.descricao, { color: cores.textoSecundario }]}>Não aproveitados (kg)</Text>
          </View>
        </View>

        <View style={[styles.cardIncentivo, { backgroundColor: cores.card }]}>
          <Text style={styles.trofeu}>🏆</Text>

          <View style={styles.textosIncentivo}>
            <Text style={[styles.textoDestaque, { color: cores.texto }]}>Continue assim!</Text>
            <Text style={[styles.descricaoIncentivo, { color: cores.textoSecundario }]}>
              Você está fazendo a diferença.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  par: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },

  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  textoUnidades: {
    textAlign: "center",
    marginTop: 4,
  },

  textoVazio: {
    textAlign: "center",
    paddingVertical: 30,
  },

  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginBottom: 32,
    paddingHorizontal: 5,
    paddingTop: 12,
  },

  titulo: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
  },

  card: {
    borderRadius: 16,
    padding: 24,
    minHeight: 145,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    elevation: 3,
  },

  textosCard: {
    flex: 1,
    paddingRight: 8,
  },

  textoPequeno: {
    fontSize: 14,
    marginBottom: 10,
  },

  textoDestaque: {
    fontSize: 18,
    fontWeight: "700",
  },

  planta: {
    fontSize: 60,
  },

  subtitulo: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 15,
  },

  resumo: {
    flexDirection: "row",
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 32,
    elevation: 3,
  },

  itemResumo: {
    flex: 1,
    alignItems: "center",
  },

  verde: {
    fontWeight: "700",
    fontSize: 19,
  },

  amarelo: {
    fontWeight: "700",
    fontSize: 19,
  },

  preto: {
    fontWeight: "700",
    fontSize: 19,
  },

  descricao: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },

  grafico: {
    borderRadius: 16,
    padding: 18,
    elevation: 3,
  },

  barras: {
    height: 155,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  itemGrafico: {
    alignItems: "center",
    justifyContent: "flex-end",
  },

  valor: {
    fontSize: 15,
    marginBottom: 6,
  },

  barra: {
    width: 29,
    borderRadius: 6,
  },

  nomeSemana: {
    fontSize: 12,
    marginTop: 8,
  },

  legenda: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 28,
  },

  bolinha: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 7,
  },

  cardIncentivo: {
    borderRadius: 16,
    padding: 22,
    minHeight: 105,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    elevation: 3,
  },

  trofeu: {
    fontSize: 50,
    marginRight: 22,
  },

  textosIncentivo: {
    flex: 1,
  },

  descricaoIncentivo: {
    fontSize: 14,
    marginTop: 8,
  },
});
