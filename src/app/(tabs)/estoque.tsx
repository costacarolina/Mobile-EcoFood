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

  return (
    <LinearGradient
      colors={[
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#F9F8F3",
        "#F4F5EC",
      ]}
      locations={[0, 0.35, 0.65, 0.85, 1]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="#193F30"
            />
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/logoecofood/logoecofood.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={25}
              color="#193F30"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Estoque</Text>

        {/* CATEGORIAS */}
        <View style={styles.categorias}>
          {(["Geladeira", "Freezer", "Despensa"] as const).map(
            (categoria) => {
              const ativa = categoriaSelecionada === categoria;

              return (
                <TouchableOpacity
                  key={categoria}
                  style={[
                    styles.categoria,
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

        {/* BUSCA */}
        <View style={styles.buscaContainer}>
          <View style={styles.busca}>
            <Ionicons
              name="search-outline"
              size={23}
              color="#888888"
            />

            <TextInput
              placeholder="Buscar produto"
              placeholderTextColor="#888888"
              style={styles.inputBusca}
              value={busca}
              onChangeText={setBusca}
            />

            {busca.length > 0 && (
              <TouchableOpacity onPress={() => setBusca("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color="#888888"
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity>
            <Ionicons
              name="filter-outline"
              size={25}
              color="#777777"
            />
          </TouchableOpacity>
        </View>

        {/* LISTA DE PRODUTOS */}
        <ScrollView
          style={styles.lista}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ALERTA DE VENCIMENTO DA GELADEIRA */}
          {categoriaSelecionada === "Geladeira" &&
            produtosFiltrados.length > 0 && (
              <View style={styles.alerta}>
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
                  <View
                    key={produto.id}
                    style={styles.cardProduto}
                  >
                    <View style={styles.imagemProduto}>
                      <Text style={styles.emojiProduto}>
                        {produto.emoji}
                      </Text>
                    </View>

                    <View style={styles.dadosProduto}>
                      <Text style={styles.nomeProduto}>
                        {produto.nome}
                      </Text>

                      <Text style={styles.validade}>
                        {produto.validade}
                      </Text>

                      <Text style={styles.estoque}>
                        {produto.quantidade}
                      </Text>
                    </View>

                    <Text style={styles.dias}>
                      {produto.dias}
                    </Text>
                  </View>
                ))}
              </View>
            )}

          {/* TÍTULO DA CATEGORIA */}
          <Text style={styles.tituloCategoria}>
            {categoriaSelecionada}
          </Text>

          {/* PRODUTOS */}
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <View
                key={produto.id}
                style={[
                  styles.cardProduto,
                  styles.cardLista,
                ]}
              >
                <View style={styles.imagemProduto}>
                  <Text style={styles.emojiProduto}>
                    {produto.emoji}
                  </Text>
                </View>

                <View style={styles.dadosProduto}>
                  <Text style={styles.nomeProduto}>
                    {produto.nome}
                  </Text>

                  <Text style={styles.validade}>
                    {produto.validade}
                  </Text>

                  <Text style={styles.estoque}>
                    {produto.quantidade}
                  </Text>
                </View>

                <TouchableOpacity>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    color="#777777"
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.vazio}>
              <Ionicons
                name="search-outline"
                size={35}
                color="#A0A0A0"
              />

              <Text style={styles.textoVazio}>
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
    color: "#193F30",
    textAlign: "center",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DADADA",
    alignItems: "center",
    justifyContent: "center",
  },

  textoCategoriaAtiva: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },

  textoCategoria: {
    color: "#666666",
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
    borderColor: "#E9E9E9",
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
  },

  inputBusca: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    color: "#444444",
  },

  lista: {
    flex: 1,
  },

  listaConteudo: {
    paddingBottom: 20,
  },

  alerta: {
    backgroundColor: "#FAF7F1",
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
    color: "#214D35",
    marginHorizontal: 22,
    marginBottom: 10,
  },

  cardProduto: {
    minHeight: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0EDE8",
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
    color: "#505050",
  },

  validade: {
    fontSize: 12,
    color: "#454545",
    marginTop: 2,
  },

  estoque: {
    fontSize: 12,
    fontWeight: "500",
    color: "#707070",
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
    color: "#858585",
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