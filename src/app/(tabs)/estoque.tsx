
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

export default function Estoque() {
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
          <TouchableOpacity style={styles.categoriaAtiva}>
            <Text style={styles.textoCategoriaAtiva}>
              Geladeira
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoria}>
            <Text style={styles.textoCategoria}>Freezer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoria}>
            <Text style={styles.textoCategoria}>Despensa</Text>
          </TouchableOpacity>
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
            />
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
          showsVerticalScrollIndicator={false}
        >
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

            {/* PRODUTO DE EXEMPLO */}
            <View style={styles.cardProduto}>
              <View style={styles.imagemProduto}>
                <Text style={styles.emojiProduto}>🍅</Text>
              </View>

              <View style={styles.dadosProduto}>
                <Text style={styles.nomeProduto}>
                  Tomate Italiano 1kg
                </Text>

                <Text style={styles.validade}>
                  Vence em 16/10 (2 dias)
                </Text>

                <Text style={styles.estoque}>
                  Estoque: 2,3 kg
                </Text>
              </View>

              <Text style={styles.dias}>
                2 dias
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* MENU INFERIOR */}
        <View style={styles.menuInferior}>
          <TouchableOpacity
            style={styles.itemMenu}
            onPress={() => router.push("/")}
          >
            <Ionicons
              name="home-outline"
              size={27}
              color="#858585"
            />
            <Text style={styles.textoMenu}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Ionicons
              name="clipboard-outline"
              size={27}
              color="#858585"
            />
            <Text style={styles.textoMenu}>
              Lista de Compras
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoAdicionar}
          >
            <Ionicons
              name="add"
              size={37}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <MaterialCommunityIcons
              name="archive"
              size={28}
              color="#216641"
            />
            <Text style={styles.textoMenuAtivo}>
              Estoque
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Ionicons
              name="person-outline"
              size={27}
              color="#858585"
            />
            <Text style={styles.textoMenu}>Perfil</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    height: 42,
    backgroundColor: "#216641",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCategoriaAtiva: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
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

  alerta: {
    backgroundColor: "#FAF7F1",
    marginHorizontal: 21,
    borderRadius: 20,
    padding: 10,
    paddingTop: 18,
    minHeight: 145,
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