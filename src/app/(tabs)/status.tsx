
import React, { useState } from "react";
import { Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type StatusProduto = "aproveitado" | "naoAproveitado";

export default function Status() {
  const [statusSelecionado, setStatusSelecionado] =
    useState<StatusProduto | null>(null);

  function concluir() {
    if (!statusSelecionado) {
      Alert.alert(
        "Atenção",
        "Selecione o status do produto antes de concluir."
      );
      return;
    }

    const mensagem =
      statusSelecionado === "aproveitado"
        ? "O tomate foi marcado como aproveitado."
        : "O tomate foi marcado como não aproveitado.";

    Alert.alert("Status atualizado", mensagem, [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  }

  function navegar(destino: string) {
    router.replace(destino as never);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <View style={styles.cabecalho}>
        <View style={styles.linhaLogo}>
          <Image
            source={require("../../../assets/images/logoecofood/logoecofood.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.linhaTitulo}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            accessibilityLabel="Voltar para detalhes"
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#222222"
            />
          </TouchableOpacity>

          <Text style={styles.tituloCabecalho}>
            Status do Produto
          </Text>

          <View style={styles.espacoCabecalho} />
        </View>
      </View>

      <View style={styles.cartaoProduto}>
        <View style={styles.imagemTomate}>
          <Text style={styles.emojiTomate}>🍅</Text>
        </View>

        <View style={styles.informacoesProduto}>
          <Text style={styles.nomeProduto}>
            Tomate Italiano
          </Text>

          <Text style={styles.avisoVencimento}>
            Próximo do vencimento
          </Text>
        </View>
      </View>

      <View style={styles.cartaoStatus}>
        <Text style={styles.tituloStatus}>Status</Text>

        <TouchableOpacity
          style={[
            styles.opcaoStatus,
            statusSelecionado === "aproveitado" &&
            styles.opcaoSelecionada,
          ]}
          onPress={() => setStatusSelecionado("aproveitado")}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.radio,
              statusSelecionado === "aproveitado" &&
              styles.radioSelecionado,
            ]}
          >
            {statusSelecionado === "aproveitado" && (
              <View style={styles.radioInterno} />
            )}
          </View>

          <Text style={styles.textoAproveitado}>
            Aproveitado
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcaoStatus,
            styles.segundaOpcao,
            statusSelecionado === "naoAproveitado" &&
            styles.opcaoSelecionada,
          ]}
          onPress={() =>
            setStatusSelecionado("naoAproveitado")
          }
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.radio,
              statusSelecionado === "naoAproveitado" &&
              styles.radioSelecionado,
            ]}
          >
            {statusSelecionado === "naoAproveitado" && (
              <View style={styles.radioInterno} />
            )}
          </View>

          <Text style={styles.textoNaoAproveitado}>
            Não Aproveitado
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoConcluir}
        onPress={concluir}
        activeOpacity={0.85}
      >
        <Text style={styles.textoBotaoConcluir}>
          Concluir
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  cabecalho: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
  },

  linhaLogo: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },

  logo: {
    width: 130,
    height: 60,
    resizeMode: "contain",
  },

  linhaTitulo: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  botaoVoltar: {
    width: 55,
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
  },

  tituloCabecalho: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111111",
  },

  espacoCabecalho: {
    width: 55,
  },

  cartaoProduto: {
  marginHorizontal: 10,
  marginTop: 10,
  minHeight: 105,
  borderRadius: 12,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 15,
  paddingVertical: 12,

  backgroundColor: "#FFFFFF",

  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.12,
  shadowRadius: 5,

  elevation: 3,
},

  imagemTomate: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },

  emojiTomate: {
    fontSize: 48,
  },

  informacoesProduto: {
    flex: 1,
    marginLeft: 12,
  },

  nomeProduto: {
    fontSize: 19,
    fontWeight: "600",
    color: "#171717",
  },

  avisoVencimento: {
    fontSize: 14,
    color: "#FF2929",
    fontWeight: "600",
    marginTop: 5,
  },

  cartaoStatus: {
    marginHorizontal: 18,
    marginTop: 28,
    backgroundColor: "#F4F0E6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.13,
    shadowRadius: 5,
    elevation: 4,
  },

  tituloStatus: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 18,
  },

  opcaoStatus: {
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  segundaOpcao: {
    marginTop: 16,
  },

  opcaoSelecionada: {
    borderWidth: 1.5,
    borderColor: "#B7C9B5",
  },

  radio: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#777777",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  radioSelecionado: {
    borderColor: "#173B2C",
  },

  radioInterno: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#173B2C",
  },

  textoAproveitado: {
    fontSize: 14,
    color: "#218C36",
    fontWeight: "500",
  },

  textoNaoAproveitado: {
    fontSize: 14,
    color: "#D51E1E",
    fontWeight: "500",
  },

  botaoConcluir: {
    alignSelf: "center",
    width: "72%",
    minHeight: 52,
    marginTop: 38,
    backgroundColor: "#1B5E3B",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  textoBotaoConcluir: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  menuInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
    backgroundColor: "#FFFDF8",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 2,
  },

  itemMenu: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  textoMenu: {
    fontSize: 11,
    color: "#173B2C",
    marginTop: 4,
    fontWeight: "600",
  },

  botaoAdicionar: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#C59B45",
    alignItems: "center",
    justifyContent: "center",
  },
});