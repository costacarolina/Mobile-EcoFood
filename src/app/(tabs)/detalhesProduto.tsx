import React, { useState } from "react";
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
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

                <Text
                    style={estilos.tituloCabecalho}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
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
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    cabecalho: {
        height: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingTop: 8,
        backgroundColor: "#FFFFFF",
    },

    botaoVoltar: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    tituloCabecalho: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: "#173B2C",
        textAlign: "center",
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
        minHeight: 115,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        marginTop: 4,
        backgroundColor: "#FFFFFF",
        padding: 16,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,

    },

    areaImagem: {
        width: 90,
        height: 90,
        borderRadius: 10,
        backgroundColor: "#F4F0E6",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },

    imagemProduto: {
        width: "100%",
        height: "100%",
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
        minHeight: 62,
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
        fontSize: 15,
        color: "#111111",
    },

    valorCampo: {
        flexShrink: 1,
        fontSize: 13,
        color: "#111111",
        textAlign: "right",
    },

    validadeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flexShrink: 1,
        flexWrap: "wrap",
        gap: 3,
    },
    diasRestantes: {
        fontSize: 12,
        color: "#C94C4C",
        fontWeight: "700",
        flexShrink: 0,
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
        height: 52,
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
        fontSize: 15,
        color: "#111111",
        fontWeight: "500",
    },

    botaoStatus: {
        width: "47%",
        height: 52,
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
        fontSize: 15,
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