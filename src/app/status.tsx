
import React, { useState } from "react";
import { Alert, Image, StatusBar, StyleSheet, Text,TouchableOpacity, View, } from "react-native";
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
    <View style={estilos.container}>
    <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
    />

    <View style={estilos.cabecalho}>
        <View style={estilos.linhaLogo}>
        <Image
            source={require("../../assets/images/logoecofood/logoecofood.png")}
            style={estilos.logo}
            resizeMode="contain"
        />
        </View>

        <View style={estilos.linhaTitulo}>
        <TouchableOpacity
            style={estilos.botaoVoltar}
            onPress={() => router.back()}
            accessibilityLabel="Voltar"
        >
            <Ionicons
            name="arrow-back"
            size={23}
            color="#222222"
            />
        </TouchableOpacity>

        <Text style={estilos.tituloCabecalho}>
            Status do Produto
        </Text>

        <View style={estilos.espacoCabecalho} />
        </View>
    </View>

    <View style={estilos.cartaoProduto}>
        <View style={estilos.imagemTomate}>
        <Text style={estilos.emojiTomate}>🍅</Text>
        </View>

        <View style={estilos.informacoesProduto}>
        <Text style={estilos.nomeProduto}>
            Tomate Italiano
        </Text>

        <Text style={estilos.avisoVencimento}>
            Próximo do vencimento
        </Text>
        </View>
    </View>

    <View style={estilos.cartaoStatus}>
        <Text style={estilos.tituloStatus}>Status</Text>

        <TouchableOpacity
        style={[
            estilos.opcaoStatus,
            statusSelecionado === "aproveitado" &&
            estilos.opcaoSelecionada,
        ]}
        onPress={() => setStatusSelecionado("aproveitado")}
        activeOpacity={0.8}
        >
        <View
            style={[
            estilos.radio,
            statusSelecionado === "aproveitado" &&
                estilos.radioSelecionado,
            ]}
        >
            {statusSelecionado === "aproveitado" && (
            <View style={estilos.radioInterno} />
            )}
        </View>

        <Text style={estilos.textoAproveitado}>
            Aproveitado
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[
            estilos.opcaoStatus,
            estilos.segundaOpcao,
            statusSelecionado === "naoAproveitado" &&
            estilos.opcaoSelecionada,
        ]}
        onPress={() =>
            setStatusSelecionado("naoAproveitado")
        }
        activeOpacity={0.8}
        >
        <View
            style={[
            estilos.radio,
            statusSelecionado === "naoAproveitado" &&
                estilos.radioSelecionado,
            ]}
        >
            {statusSelecionado === "naoAproveitado" && (
            <View style={estilos.radioInterno} />
            )}
        </View>

        <Text style={estilos.textoNaoAproveitado}>
            Não Aproveitado
        </Text>
        </TouchableOpacity>
    </View>

    <TouchableOpacity
        style={estilos.botaoConcluir}
        onPress={concluir}
        activeOpacity={0.85}
    >
        <Text style={estilos.textoBotaoConcluir}>
        Concluir
        </Text>
    </TouchableOpacity>

    <View style={estilos.menuInferior}>
        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() => navegar("/(tabs)")}
        >
        <Ionicons
            name="home-outline"
            size={19}
            color="#173B2C"
        />
        <Text style={estilos.textoMenu}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() => navegar("/(tabs)/estoque")}
        >
        <Ionicons
            name="cube-outline"
            size={19}
            color="#173B2C"
        />
        <Text style={estilos.textoMenu}>Estoque</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() => navegar("/(tabs)/adicionarProduto")}
        >
        <View style={estilos.botaoAdicionar}>
            <Ionicons
            name="add"
            size={29}
            color="#FFFFFF"
            />
        </View>
        <Text style={estilos.textoMenu}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() => navegar("/(tabs)/listaDeCompras")}
        >
        <Ionicons
            name="cart-outline"
            size={19}
            color="#173B2C"
        />
        <Text style={estilos.textoMenu}>Compras</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() => navegar("/(tabs)/perfil")}
        >
        <Ionicons
            name="person-outline"
            size={19}
            color="#173B2C"
        />
        <Text style={estilos.textoMenu}>Perfil</Text>
        </TouchableOpacity>
    </View>
    </View>
);
}

const estilos = StyleSheet.create({
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
    height: 35,
    alignItems: "center",
    justifyContent: "center",
},

logo: {
    width: 52,
    height: 32,
},

linhaTitulo: {
    height: 43,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
},

botaoVoltar: {
    width: 48,
    height: 43,
    justifyContent: "center",
    paddingLeft: 7,
},

tituloCabecalho: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111111",
},

espacoCabecalho: {
    width: 48,
},

cartaoProduto: {
    marginHorizontal: 4,
    marginTop: 1,
    height: 68,
    borderWidth: 1,
    borderColor: "#FF2929",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
},

imagemTomate: {
    width: 53,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
},

emojiTomate: {
    fontSize: 37,
},

informacoesProduto: {
    flex: 1,
    marginLeft: 6,
},

nomeProduto: {
    fontSize: 13,
    fontWeight: "500",
    color: "#171717",
},

avisoVencimento: {
    fontSize: 9,
    color: "#FF2929",
    fontWeight: "600",
    marginTop: 3,
},

cartaoStatus: {
    marginHorizontal: 15,
    marginTop: 23,
    backgroundColor: "#F4F0E6",
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingTop: 12,
    paddingBottom: 23,

    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2,
    elevation: 3,
},

tituloStatus: {
    fontSize: 9,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 12,
},

opcaoStatus: {
    height: 21,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
},

segundaOpcao: {
    marginTop: 17,
},

opcaoSelecionada: {
    borderWidth: 1,
    borderColor: "#B7C9B5",
},

radio: {
    width: 11,
    height: 11,
    borderWidth: 1,
    borderColor: "#777777",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
},

radioSelecionado: {
    borderColor: "#173B2C",
},

radioInterno: {
    width: 5,
    height: 5,
    backgroundColor: "#173B2C",
},

textoAproveitado: {
    fontSize: 7,
    color: "#218C36",
},

textoNaoAproveitado: {
    fontSize: 7,
    color: "#D51E1E",
},

botaoConcluir: {
    alignSelf: "center",
    width: "46%",
    height: 25,
    marginTop: 66,
    backgroundColor: "#1B5E3B",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
},

textoBotaoConcluir: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
},

menuInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 43,
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
    fontSize: 6,
    color: "#173B2C",
    marginTop: 2,
    fontWeight: "600",
},

botaoAdicionar: {
    width: 23,
    height: 23,
    borderRadius: 15,
    backgroundColor: "#C59B45",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
},
});