import React, { useState } from "react";
import { Alert, Image, ScrollView, StatusBar ,StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function DetalhesProduto() {
const [editando, setEditando] = useState(false);
const [status, setStatus] = useState("Próximo do vencimento");

const [quantidade, setQuantidade] = useState("2,3kg");
const [categoria, setCategoria] = useState("Hortifruti");
const [local, setLocal] = useState("Geladeira");
const [validade, setValidade] = useState("10/08/2026");
const [fornecedor, setFornecedor] = useState("Hortifruti Central");

function salvarEdicao() {
    setEditando(false);

    Alert.alert(
    "Produto atualizado",
    "As informações do produto foram alteradas com sucesso."
    );
}

function alterarStatus() {
    const novoStatus =
    status === "Próximo do vencimento"
        ? "Em estoque"
        : "Próximo do vencimento";

    setStatus(novoStatus);

    Alert.alert("Status alterado", `O produto agora está como "${novoStatus}".`);
}

function campo(
    titulo: string,
    valor: string,
    alterar: (texto: string) => void,
    ultimaLinha = false
) {
    return (
<View
        style={[
        estilos.linhaInformacao,
        ultimaLinha && estilos.ultimaLinha,
        ]}
>
<Text style={estilos.nomeCampo}>{titulo}</Text>

        {editando ? (
<TextInput
            value={valor}
            onChangeText={alterar}
            style={estilos.inputEdicao}
        />
        ) : (
<Text style={estilos.valorCampo}>{valor}</Text>
        )}
</View>
    );
}

return (
<View style={estilos.container}>
<StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
    />

<View style={estilos.cabecalho}>
<TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={() => router.back()}
>
<Ionicons
            name="arrow-back"
            size={24}
            color="#111111"
        />
</TouchableOpacity>

        <Text style={estilos.tituloCabecalho}>
        Detalhes do Produto
</Text>

        <View style={estilos.espacoCabecalho} />
</View>

    <ScrollView
        style={estilos.conteudo}
        contentContainerStyle={estilos.conteudoInterno}
        showsVerticalScrollIndicator={false}
>
<View style={estilos.cardProduto}>
<View style={estilos.areaImagem}>
<Image
            source={{
                uri: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300",
            }}
            style={estilos.imagemProduto}
            />
</View>

        <View style={estilos.infoProduto}>
<Text style={estilos.nomeProduto}>
            Tomate Italiano
</Text>

            <Text style={estilos.avisoValidade}>
            Próximo do vencimento
</Text>
</View>
</View>

<View style={estilos.cardInformacoes}>
        {campo(
            "Quantidade",
            quantidade,
            setQuantidade
        )}

        {campo(
            "Categoria",
            categoria,
            setCategoria
        )}

        {campo(
            "Local",
            local,
            setLocal
        )}

<View style={estilos.linhaInformacao}>
<Text style={estilos.nomeCampo}>
            Data de validade
</Text>

            {editando ? (
<TextInput
                value={validade}
                onChangeText={setValidade}
                style={estilos.inputEdicao}
            />
            ) : (
<View style={estilos.validadeContainer}>
<Text style={estilos.valorCampo}>
                {validade}
</Text>

                <Text style={estilos.diasRestantes}>
                {" "}
                - 2 dias
</Text>
</View>
            )}
</View>

        {campo(
            "Fornecedor",
            fornecedor,
            setFornecedor
        )}

<View
            style={[
            estilos.linhaInformacao,
            estilos.ultimaLinha,
            ]}
>
<Text style={estilos.nomeCampo}>
            Cadastro em
</Text>

            <Text style={estilos.valorCampo}>
            05/08/2026
</Text>
</View>
</View>

<View style={estilos.areaBotoes}>
<TouchableOpacity
            style={estilos.botaoEditar}
            onPress={() => {
            if (editando) {
                salvarEdicao();
            } else {
                setEditando(true);
            }
            }}
>
<Text style={estilos.textoBotaoEditar}>
            {editando ? "Salvar" : "Editar"}
</Text>
</TouchableOpacity>

        <TouchableOpacity
            style={estilos.botaoStatus}
            onPress={alterarStatus}
>
<Text style={estilos.textoBotaoStatus}>
            Status
</Text>
</TouchableOpacity>
</View>
</ScrollView>

<View style={estilos.menuInferior}>
<TouchableOpacity
        style={estilos.itemMenu}
        onPress={() => Alert.alert("Início", "Tela inicial")}
>
<Ionicons
            name="home-outline"
            size={20}
            color="#145C36"
        />

        <Text style={estilos.textoMenu}>
            Início
</Text>
</TouchableOpacity>

        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() =>
            Alert.alert("Estoque", "Tela de estoque")
        }
>
<Ionicons
            name="cube-outline"
            size={20}
            color="#145C36"
        />

        <Text style={estilos.textoMenu}>
            Estoque
</Text>
</TouchableOpacity>

<TouchableOpacity
        style={estilos.itemAdicionar}
        onPress={() =>
            Alert.alert(
            "Adicionar produto",
            "Tela para adicionar um novo produto."
            )
        }
>
<View style={estilos.circuloAdicionar}>
<Ionicons
            name="add"
            size={28}
            color="#FFFFFF"
            />
</View>

        <Text style={estilos.textoMenu}>
            Adicionar
</Text>
</TouchableOpacity>

        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() =>
            Alert.alert("Compras", "Tela de compras")
        }
>
<Ionicons
            name="cart-outline"
            size={20}
            color="#145C36"
        />

        <Text style={estilos.textoMenu}>
            Compras
</Text>
</TouchableOpacity>

        <TouchableOpacity
        style={estilos.itemMenu}
        onPress={() =>
            Alert.alert("Perfil", "Tela de perfil")
        }
>
<Ionicons
            name="person-outline"
            size={20}
            color="#145C36"
        />

        <Text style={estilos.textoMenu}>
            Perfil
</Text>
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
    height: 82,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
},

botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
},

tituloCabecalho: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
},

espacoCabecalho: {
    width: 40,
},

conteudo: {
    flex: 1,
},

conteudoInterno: {
    paddingHorizontal: 5,
    paddingBottom: 25,
},
cardProduto: {
    height: 84,
    borderWidth: 1.5,
    borderColor: "#FF2D20",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    marginBottom: 15,
},

areaImagem: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
},

imagemProduto: {
    width: 65,
    height: 65,
    resizeMode: "contain",
},

infoProduto: {
    flex: 1,
    marginLeft: 5,
},

nomeProduto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111111",
    marginBottom: 4,
},

avisoValidade: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FF2D20",
},

cardInformacoes: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,

    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3,

    paddingHorizontal: 11,
},

linhaInformacao: {
    minHeight: 37,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
},

ultimaLinha: {
    borderBottomWidth: 0,
},

nomeCampo: {
    fontSize: 11,
    color: "#111111",
},

valorCampo: {
    fontSize: 11,
    color: "#111111",
    textAlign: "right",
},

validadeContainer: {
    flexDirection: "row",
    alignItems: "center",
},

diasRestantes: {
    fontSize: 11,
    color: "#FF2D20",
    fontWeight: "600",
},

inputEdicao: {
    minWidth: 90,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#145C36",
    fontSize: 11,
    color: "#111111",
    textAlign: "right",
    paddingVertical: 0,
},

areaBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 27,
    paddingHorizontal: 2,
},

botaoEditar: {
    width: "47%",
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,

    elevation: 3,
},

textoBotaoEditar: {
    fontSize: 10,
    color: "#111111",
    fontWeight: "500",
},

botaoStatus: {
    width: "47%",
    height: 32,
    backgroundColor: "#146039",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,

    elevation: 3,
},

textoBotaoStatus: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "500",
},

menuInferior: {
    height: 57,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",

    paddingBottom: 5,
},

itemMenu: {
    width: 52,
    alignItems: "center",
    justifyContent: "center",
},

textoMenu: {
    fontSize: 7,
    color: "#145C36",
    fontWeight: "600",
    marginTop: 2,
},

itemAdicionar: {
    width: 58,
    alignItems: "center",
    justifyContent: "center",
},

circuloAdicionar: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#C49A45",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
},
});