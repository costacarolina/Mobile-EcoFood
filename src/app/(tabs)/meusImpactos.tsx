import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function MeuImpacto() {
  const semanas = [
    { nome: "Sem 1", valor: 12 },
    { nome: "Sem 2", valor: 18 },
    { nome: "Sem 3", valor: 24 },
    { nome: "Sem 4", valor: 32 },
    { nome: "Sem 5", valor: 29 },
  ];

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#F4F5EC"]}
      style={styles.container}
    >
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="#193F30" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Meu impacto</Text>

        <Ionicons
          name="notifications-outline"
          size={27}
          color="#111111"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* MENSAGEM */}
        <View style={styles.card}>
          <View>
            <Text style={styles.textoPequeno}>
              🌱 Com pequenas escolhas,
            </Text>

            <Text style={styles.textoDestaque}>
              geramos grandes{"\n"}mudanças.
            </Text>
          </View>

          <Text style={styles.planta}>🪴</Text>
        </View>

        {/* RESUMO */}
        <Text style={styles.subtitulo}>Seu resumo de impacto</Text>

        <View style={styles.resumo}>
          <View style={styles.itemResumo}>
            <Text style={styles.verde}>32 kg</Text>
            <Text style={styles.descricao}>de alimentos{"\n"}salvos</Text>
          </View>

          <View style={styles.itemResumo}>
            <Text style={styles.amarelo}>14%</Text>
            <Text style={styles.descricao}>de redução{"\n"}de resíduos</Text>
          </View>

          <View style={styles.itemResumo}>
            <Text style={styles.preto}>24</Text>
            <Text style={styles.descricao}>escolhas{"\n"}conscientes</Text>
          </View>
        </View>

        {/* GRÁFICO SIMPLES */}
        <Text style={styles.subtitulo}>
          Evolução do seu impacto (kg)
        </Text>

        <View style={styles.grafico}>
          <View style={styles.barras}>
            {semanas.map((semana) => (
              <View key={semana.nome} style={styles.itemGrafico}>
                <Text style={styles.valor}>{semana.valor}</Text>

                <View
                  style={[
                    styles.barra,
                    { height: semana.valor * 2.5 },
                  ]}
                />

                <Text style={styles.nomeSemana}>
                  {semana.nome}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.legenda}>
          <View style={styles.bolinha} />
          <Text style={styles.descricao}>
            Kg de alimentos salvos
          </Text>
        </View>

        {/* INCENTIVO */}
        <View style={styles.cardIncentivo}>
          <Text style={styles.trofeu}>🏆</Text>

          <View>
            <Text style={styles.textoDestaque}>
              Continue assim!
            </Text>

            <Text style={styles.descricaoIncentivo}>
              Você está fazendo a diferença.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 30,
    paddingHorizontal: 5,
  },

  titulo: {
    flex: 1,
    fontSize: 21,
    fontWeight: "700",
    color: "#193F30",
  },

  card: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    elevation: 2,
  },

  textoPequeno: {
    fontSize: 11,
    color: "#111111",
    marginBottom: 8,
  },

  textoDestaque: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
  },

  planta: {
    fontSize: 43,
  },

  subtitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 12,
  },

  resumo: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 28,
    elevation: 2,
  },

  itemResumo: {
    flex: 1,
    alignItems: "center",
  },

  verde: {
    color: "#29952E",
    fontWeight: "700",
    fontSize: 16,
  },

  amarelo: {
    color: "#E6C600",
    fontWeight: "700",
    fontSize: 16,
  },

  preto: {
    color: "#111111",
    fontWeight: "700",
    fontSize: 16,
  },

  descricao: {
    fontSize: 10,
    color: "#222222",
    textAlign: "center",
    marginTop: 4,
  },

  grafico: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },

  barras: {
    height: 145,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  itemGrafico: {
    alignItems: "center",
    justifyContent: "flex-end",
  },

  valor: {
    fontSize: 13,
    color: "#111111",
    marginBottom: 5,
  },

  barra: {
    width: 25,
    backgroundColor: "#416F49",
    borderRadius: 5,
  },

  nomeSemana: {
    fontSize: 11,
    color: "#111111",
    marginTop: 7,
  },

  legenda: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },

  bolinha: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#416F49",
    marginRight: 6,
  },

  cardIncentivo: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    elevation: 2,
  },

  trofeu: {
    fontSize: 42,
    marginRight: 22,
  },

  descricaoIncentivo: {
    fontSize: 12,
    color: "#222222",
    marginTop: 7,
  },
});