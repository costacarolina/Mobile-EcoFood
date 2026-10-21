import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { useTheme } from "../../../context/themeContext";

type Categoria = "Geladeira" | "Freezer" | "Despensa";

type Produto = {
  id: number;
  nome: string;
  validade: string;
  quantidade: string;
  dias: string;
  emoji: string;
};

export default function Estoque() {
  const { darkMode } = useTheme();

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categoria>("Geladeira");

  const [busca, setBusca] = useState("");

  const produtos: Record<Categoria, Produto[]> = {
    Geladeira: [
      {
        id: 1,
        nome: "Tomate Italiano 1kg",
        validade: "Vence em 21/10 (2 dias)",
        quantidade: "Estoque: 2,3 kg",
        dias: "2 dias",
        emoji: "🍅",
      },
    ],

    Freezer: [
      {
        id: 2,
        nome: "Peito de Frango",
        validade: "Vence em 25/10",
        quantidade: "Estoque: 2 kg",
        dias: "6 dias",
        emoji: "🍗",
      },
    ],

    Despensa: [
      {
        id: 3,
        nome: "Arroz Integral 1kg",
        validade: "Vence em 20/12",
        quantidade: "Estoque: 3 pacotes",
        dias: "62 dias",
        emoji: "🍚",
      },
    ],
  };

  const produtosFiltrados = produtos[categoriaSelecionada].filter(
    (produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirDetalhes(produto: Produto) {
    router.push({
      pathname: "/(tabs)/detalhesProduto",
      params: {
        id: String(produto.id),
        nome: produto.nome,
        validade: produto.validade,
        quantidade: produto.quantidade,
        dias: produto.dias,
        emoji: produto.emoji,
      },
    });
  }

  return (
    <LinearGradient
      colors={
        darkMode
          ? ["#121212", "#121212", "#181818", "#202020", "#202020"]
          : ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#F9F8F3", "#F4F5EC"]
      }
      locations={[0, 0.35, 0.65, 0.85, 1]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ transform: [{ translateY: 35 }] }}
          >
            <Ionicons
              name="arrow-back"
              size={30}
              color={darkMode ? "#FFFFFF" : "#193F30"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ transform: [{ translateY: 35 }] }}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={25}
              color={darkMode ? "#FFFFFF" : "#193F30"}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.titulo,
            { color: darkMode ? "#FFFFFF" : "#000000" },
          ]}
        >
          Estoque
        </Text>

        <View style={styles.categorias}>
          {(["Geladeira", "Freezer", "Despensa"] as const).map(
            (categoria) => {
              const ativa = categoriaSelecionada === categoria;

              return (
                <TouchableOpacity
                  key={categoria}
                  style={[
                    styles.categoria,
                    {
                      backgroundColor: darkMode ? "#252525" : "#FFFFFF",
                      borderColor: darkMode ? "#444444" : "#DADADA",
                    },
                    ativa && styles.categoriaAtiva,
                  ]}
                  onPress={() => {
                    setCategoriaSelecionada(categoria);
                    setBusca("");
                  }}
                >
                  <Text
                    style={[
                      styles.textoCategoria,
                      {
                        color: darkMode ? "#E0E0E0" : "#666666",
                      },
                      ativa && styles.textoCategoriaAtiva,
                    ]}
                  >
                    {categoria}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        <View style={styles.buscaContainer}>
          <View
            style={[
              styles.busca,
              {
                backgroundColor: darkMode ? "#252525" : "#FFFFFF",
                borderColor: darkMode ? "#444444" : "#E9E9E9",
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={23}
              color={darkMode ? "#BBBBBB" : "#888888"}
            />

            <TextInput
              placeholder="Buscar produto"
              placeholderTextColor={darkMode ? "#AAAAAA" : "#888888"}
              style={[
                styles.inputBusca,
                { color: darkMode ? "#FFFFFF" : "#444444" },
              ]}
              value={busca}
              onChangeText={setBusca}
            />

            {busca.length > 0 && (
              <TouchableOpacity onPress={() => setBusca("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={darkMode ? "#BBBBBB" : "#888888"}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity>
            <Ionicons
              name="filter-outline"
              size={25}
              color={darkMode ? "#CCCCCC" : "#777777"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.lista}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {categoriaSelecionada === "Geladeira" &&
            produtosFiltrados.length > 0 && (
              <View
                style={[
                  styles.alerta,
                  {
                    backgroundColor: darkMode ? "#30251F" : "#FAF7F1",
                  },
                ]}
              >
                <View style={styles.alertaTitulo}>
                  <Ionicons
                    name="alert-circle"
                    size={17}
                    color="#F05252"
                  />

                  <Text style={styles.textoAlerta}>
                    1 produto próximo do vencimento
                  </Text>
                </View>

                {produtosFiltrados.map((produto) => (
                  <TouchableOpacity
                    key={produto.id}
                    style={[
                      styles.cardProduto,
                      {
                        backgroundColor: darkMode ? "#252525" : "#FFFFFF",
                        borderColor: darkMode ? "#444444" : "#F0EDE8",
                      },
                    ]}
                    onPress={() => abrirDetalhes(produto)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.imagemProduto}>
                      <Text style={styles.emojiProduto}>
                        {produto.emoji}
                      </Text>
                    </View>

                    <View style={styles.dadosProduto}>
                      <Text
                        style={[
                          styles.nomeProduto,
                          { color: darkMode ? "#FFFFFF" : "#505050" },
                        ]}
                      >
                        {produto.nome}
                      </Text>

                      <Text
                        style={[
                          styles.validade,
                          { color: darkMode ? "#DDDDDD" : "#454545" },
                        ]}
                      >
                        {produto.validade}
                      </Text>

                      <Text
                        style={[
                          styles.estoque,
                          { color: darkMode ? "#BBBBBB" : "#707070" },
                        ]}
                      >
                        {produto.quantidade}
                      </Text>
                    </View>

                    <Text style={styles.dias}>
                      {produto.dias}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

          <Text
            style={[
              styles.tituloCategoria,
              { color: darkMode ? "#C1E3CC" : "#214D35" },
            ]}
          >
            {categoriaSelecionada}
          </Text>

          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <TouchableOpacity
                key={produto.id}
                style={[
                  styles.cardProduto,
                  styles.cardLista,
                  {
                    backgroundColor: darkMode ? "#252525" : "#FFFFFF",
                    borderColor: darkMode ? "#444444" : "#F0EDE8",
                  },
                ]}
                onPress={() => abrirDetalhes(produto)}
                activeOpacity={0.8}
              >
                <View style={styles.imagemProduto}>
                  <Text style={styles.emojiProduto}>
                    {produto.emoji}
                  </Text>
                </View>

                <View style={styles.dadosProduto}>
                  <Text
                    style={[
                      styles.nomeProduto,
                      { color: darkMode ? "#FFFFFF" : "#505050" },
                    ]}
                  >
                    {produto.nome}
                  </Text>

                  <Text
                    style={[
                      styles.validade,
                      { color: darkMode ? "#DDDDDD" : "#454545" },
                    ]}
                  >
                    {produto.validade}
                  </Text>

                  <Text
                    style={[
                      styles.estoque,
                      { color: darkMode ? "#BBBBBB" : "#707070" },
                    ]}
                  >
                    {produto.quantidade}
                  </Text>
                </View>

                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={darkMode ? "#BBBBBB" : "#777777"}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.vazio}>
              <Ionicons
                name="search-outline"
                size={35}
                color={darkMode ? "#BBBBBB" : "#A0A0A0"}
              />

              <Text
                style={[
                  styles.textoVazio,
                  { color: darkMode ? "#BBBBBB" : "#858585" },
                ]}
              >
                Nenhum produto encontrado.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },

  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 23,
  },

  logo: {
    width: 75,
    height: 52,
  },

  titulo: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -10,
    marginBottom: 17,
  },

  categorias: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 9,
  },

  categoriaAtiva: {
    backgroundColor: "#216641",
    borderColor: "#216641",
  },

  categoria: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCategoriaAtiva: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },

  textoCategoria: {
    fontSize: 15,
  },

  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 21,
    marginTop: 25,
    marginBottom: 21,
  },

  busca: {
    flex: 1,
    height: 43,
    borderWidth: 1,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
  },

  inputBusca: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
  },

  lista: {
    flex: 1,
  },

  listaConteudo: {
    paddingBottom: 20,
  },

  alerta: {
    marginHorizontal: 21,
    borderRadius: 20,
    padding: 10,
    paddingTop: 18,
    marginBottom: 20,
  },

  alertaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },

  textoAlerta: {
    color: "#F05252",
    fontSize: 13,
    fontWeight: "500",
  },

  tituloCategoria: {
    fontSize: 17,
    fontWeight: "700",
    marginHorizontal: 22,
    marginBottom: 10,
  },

  cardProduto: {
    minHeight: 72,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 7,
  },

  cardLista: {
    marginHorizontal: 21,
    marginBottom: 8,
  },

  imagemProduto: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },

  emojiProduto: {
    fontSize: 43,
  },

  dadosProduto: {
    flex: 1,
    marginLeft: 2,
  },

  nomeProduto: {
    fontSize: 15,
    fontWeight: "600",
  },

  validade: {
    fontSize: 12,
    marginTop: 2,
  },

  estoque: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },

  dias: {
    color: "#FF4545",
    fontSize: 13,
    fontWeight: "500",
    marginHorizontal: 5,
  },

  vazio: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 35,
  },

  textoVazio: {
    fontSize: 14,
    marginTop: 10,
  },

  menuInferior: {
    height: 82,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 3,
  },

  itemMenu: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textoMenu: {
    color: "#858585",
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },

  textoMenuAtivo: {
    color: "#216641",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  botaoAdicionar: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: "#216641",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
});
