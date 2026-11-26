import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { useTheme } from "@/../context/themeContext";
import { CATEGORIAS_PRODUTO, CategoriaProduto, LOCAIS_ARMAZENAMENTO } from "@/lib/categorias";
import {
    atualizarComprado,
    criarItemListaCompra,
    excluirItemListaCompra,
    getListaCompras,
    ItemListaCompra,
} from "../../api/get-lista-compras";

// Aceita "2 kg", "3 un", "3 unidades", "1,5kg"...
function interpretarQuantidade(texto: string): { quantidade: number; unidade: string } | null {
    const correspondencia = texto.trim().toLowerCase().match(/^(\d+(?:[.,]\d+)?)\s*([a-zç]*)$/);
    if (!correspondencia) return null;

    const quantidade = Number(correspondencia[1].replace(",", "."));
    if (!Number.isFinite(quantidade) || quantidade <= 0) return null;

    const unidadeTexto = correspondencia[2] || "un";
    if (unidadeTexto === "kg") return { quantidade, unidade: "kg" };
    if (["un", "und", "unid", "unidade", "unidades"].includes(unidadeTexto)) {
        return { quantidade, unidade: "un" };
    }
    return null;
}

export default function ListaDeCompras() {
    const { darkMode } = useTheme();

    const cores = {
        fundo: darkMode ? "#202522" : "#f7f7f4",
        card: darkMode ? "#303831" : "#F3F0E6",
        item: darkMode ? "#3A443D" : "#FFFFFF",
        texto: darkMode ? "#F2F4F0" : "#111111",
        textoSecundario: darkMode ? "#D0D7D0" : "#555555",
        verde: darkMode ? "#85C995" : "#1B603C",
        verdeTitulo: darkMode ? "#A9D8B2" : "#173B2C",
        borda: darkMode ? "#536257" : "#D7DFD6",
        checkbox: darkMode ? "#85C995" : "#64C96C",
        sombra: "#000000",
        placeholder: darkMode ? "#B2BBB4" : "#888888",
        fundoModal: darkMode ? "#29322C" : "#FFFFFF",
    };

    const [itens, setItens] = useState<ItemListaCompra[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    const [porCategoria, setPorCategoria] = useState(true);
    const [modalVisivel, setModalVisivel] = useState(false);

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaProduto>("Hortifruti");
    const [localSelecionado, setLocalSelecionado] = useState<string>("Despensa");

    async function carregarLista() {
        try {
            setCarregando(true);
            setItens(await getListaCompras());
        } catch (erro: any) {
            console.log("Erro ao carregar lista:", erro.response?.data || erro.message);
            Alert.alert("Erro", "Não foi possível carregar a lista de compras.");
        } finally {
            setCarregando(false);
        }
    }

    // Recarrega sempre que a aba é aberta, para mostrar produtos adicionados pelo status
    useFocusEffect(
        useCallback(() => {
            carregarLista();
        }, [])
    );

    const itensPendentes = itens.filter((item) => !item.comprado).length;

    // Marca/desmarca na hora e reverte se a API falhar
    async function alternarProduto(item: ItemListaCompra) {
        const novoValor = !item.comprado;

        setItens((atuais) =>
            atuais.map((i) => (i.id === item.id ? { ...i, comprado: novoValor } : i))
        );

        try {
            await atualizarComprado(item.id, novoValor);
        } catch (erro: any) {
            console.log("Erro ao atualizar item:", erro.response?.data || erro.message);
            setItens((atuais) =>
                atuais.map((i) => (i.id === item.id ? { ...i, comprado: item.comprado } : i))
            );
            Alert.alert("Erro", "Não foi possível atualizar o item.");
        }
    }

    async function adicionarProduto() {
        const nomeLimpo = nome.trim();

        if (!nomeLimpo || !quantidade.trim()) {
            Alert.alert("Campos obrigatórios", "Informe o nome e a quantidade do produto.");
            return;
        }

        const medida = interpretarQuantidade(quantidade);
        if (!medida) {
            Alert.alert("Quantidade inválida", "Use um valor com kg ou unidades. Ex.: 2 kg ou 3 unidades.");
            return;
        }

        // Evita duplicar um produto que já está pendente na lista
        const jaExiste = itens.some(
            (item) => !item.comprado && item.nome.trim().toLowerCase() === nomeLimpo.toLowerCase()
        );
        if (jaExiste) {
            Alert.alert("Já está na lista", "Este produto já está na lista de compras.");
            return;
        }

        try {
            setSalvando(true);

            const criado = await criarItemListaCompra({
                nome: nomeLimpo,
                categoria: categoriaSelecionada,
                localArmazenamento: localSelecionado,
                quantidade: medida.quantidade,
                unidade: medida.unidade,
            });

            setItens((atuais) => [...atuais, criado]);

            setNome("");
            setQuantidade("");
            setCategoriaSelecionada("Hortifruti");
            setLocalSelecionado("Despensa");
            setModalVisivel(false);
        } catch (erro: any) {
            console.log("Erro ao adicionar item:", erro.response?.data || erro.message);
            Alert.alert("Erro", erro.response?.data?.error ?? "Não foi possível adicionar o item.");
        } finally {
            setSalvando(false);
        }
    }

    function excluirComprados() {
        const comprados = itens.filter((item) => item.comprado);

        if (comprados.length === 0) {
            Alert.alert("Nenhum produto marcado", "Marque os produtos comprados antes de usar a lixeira.");
            return;
        }

        Alert.alert("Excluir produtos", "Deseja remover os produtos já comprados?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    try {
                        await Promise.all(comprados.map((item) => excluirItemListaCompra(item.id)));
                        setItens((atuais) => atuais.filter((item) => !item.comprado));
                    } catch (erro: any) {
                        console.log("Erro ao excluir:", erro.response?.data || erro.message);
                        Alert.alert("Erro", "Não foi possível excluir alguns itens. Atualize a lista e tente novamente.");
                        carregarLista();
                    }
                },
            },
        ]);
    }

    function renderProduto(produto: ItemListaCompra) {
        return (
            <TouchableOpacity
                key={produto.id}
                style={[estilos.linhaProduto, { backgroundColor: cores.item }]}
                activeOpacity={0.8}
                onPress={() => alternarProduto(produto)}
            >
                <View
                    style={[
                        estilos.checkbox,
                        { borderColor: cores.checkbox },
                        produto.comprado && { backgroundColor: cores.verde, borderColor: cores.verde },
                    ]}
                >
                    {produto.comprado && <Ionicons name="checkmark" size={19} color="#FFFFFF" />}
                </View>

                <View style={{ flex: 1 }}>
                    <Text
                        style={[
                            estilos.nomeProduto,
                            { color: cores.texto },
                            produto.comprado && estilos.nomeComprado,
                        ]}
                        numberOfLines={2}
                    >
                        {produto.nome}
                    </Text>
                    <Text style={[estilos.localProduto, { color: cores.textoSecundario }]}>
                        {produto.localArmazenamento}
                    </Text>
                </View>

                <Text style={[estilos.quantidadeProduto, { color: cores.texto }]}>
                    {String(produto.quantidade).replace(".", ",")} {produto.unidade}
                </Text>
            </TouchableOpacity>
        );
    }

    // Agrupa por categoria, na mesma ordem usada no cadastro de produtos
    const categoriasComItens = [...CATEGORIAS_PRODUTO, ...itens.map((i) => i.categoria)]
        .filter((categoria, posicao, lista) => lista.indexOf(categoria) === posicao)
        .map((categoria) => ({
            categoria,
            itens: itens.filter((item) => item.categoria === categoria),
        }))
        .filter((grupo) => grupo.itens.length > 0);

    function renderCategorias() {
        return categoriasComItens.map((grupo) => (
            <View key={grupo.categoria} style={estilos.grupoCategoria}>
                <Text style={[estilos.tituloCategoria, { color: cores.verdeTitulo }]}>
                    {grupo.categoria} ({grupo.itens.length})
                </Text>

                <View style={estilos.listaCategoria}>
                    {grupo.itens.map((item) => renderProduto(item))}
                </View>
            </View>
        ));
    }

    return (
        <View style={[estilos.tela, { backgroundColor: cores.fundo }]}>
            <StatusBar
                barStyle={darkMode ? "light-content" : "dark-content"}
                backgroundColor={cores.fundo}
            />

            <ScrollView
                style={estilos.rolagem}
                contentContainerStyle={estilos.conteudo}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={estilos.cabecalho}>
                    <View style={estilos.grupoTitulo}>
                        <Ionicons name="cart-outline" size={31} color={cores.verdeTitulo} />
                        <Text style={[estilos.titulo, { color: cores.texto }]}>Lista de Compras</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[estilos.botaoCategoria, { backgroundColor: cores.verde }]}
                    onPress={() => setPorCategoria((atual) => !atual)}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name={porCategoria ? "grid-outline" : "list-outline"}
                        size={21}
                        color="#FFFFFF"
                    />
                    <Text style={estilos.textoBotaoCategoria}>
                        {porCategoria ? "Por categoria" : "Lista completa"}
                    </Text>
                </TouchableOpacity>

                <View style={estilos.barraAcoes}>
                    <Text style={[estilos.contador, { color: cores.texto }]}>
                        {itensPendentes} {itensPendentes === 1 ? "item para comprar" : "itens para comprar"}
                    </Text>

                    <View style={estilos.acoes}>
                        <TouchableOpacity
                            onPress={excluirComprados}
                            style={[estilos.botaoAcao, { backgroundColor: cores.verde }]}
                            accessibilityLabel="Excluir produtos comprados"
                            activeOpacity={0.8}
                        >
                            <Ionicons name="trash-outline" size={23} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisivel(true)}
                            style={[estilos.botaoAcao, { backgroundColor: cores.verde }]}
                            accessibilityLabel="Adicionar produto"
                            activeOpacity={0.8}
                        >
                            <Ionicons name="add" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[estilos.cartaoLista, { backgroundColor: cores.card }]}>
                    {carregando ? (
                        <ActivityIndicator size="large" color={cores.verde} style={{ marginVertical: 30 }} />
                    ) : itens.length === 0 ? (
                        <View style={estilos.listaVazia}>
                            <Ionicons name="cart-outline" size={48} color={cores.verde} />
                            <Text style={[estilos.textoListaVazia, { color: cores.verdeTitulo }]}>
                                Sua lista está vazia.
                            </Text>
                            <Text style={[estilos.subtextoListaVazia, { color: cores.textoSecundario }]}>
                                Toque no botão + para adicionar produtos.
                            </Text>
                        </View>
                    ) : porCategoria ? (
                        renderCategorias()
                    ) : (
                        <View style={estilos.listaCategoria}>
                            {itens.map((item) => renderProduto(item))}
                        </View>
                    )}
                </View>
            </ScrollView>

            <Modal
                visible={modalVisivel}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={estilos.fundoModal}>
                    <ScrollView
                        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={[estilos.conteudoModal, { backgroundColor: cores.fundoModal }]}>
                            <View style={estilos.cabecalhoModal}>
                                <Text style={[estilos.tituloModal, { color: cores.verdeTitulo }]}>
                                    Novo produto
                                </Text>

                                <TouchableOpacity
                                    onPress={() => setModalVisivel(false)}
                                    accessibilityLabel="Fechar"
                                >
                                    <Ionicons name="close" size={30} color={cores.verdeTitulo} />
                                </TouchableOpacity>
                            </View>

                            <Text style={[estilos.rotuloCampo, { color: cores.verdeTitulo }]}>Nome do produto</Text>
                            <TextInput
                                style={[estilos.campo, { color: cores.texto, borderColor: cores.borda, backgroundColor: cores.item }]}
                                placeholder="Ex.: Maçã"
                                placeholderTextColor={cores.placeholder}
                                value={nome}
                                onChangeText={setNome}
                                maxLength={60}
                            />

                            <Text style={[estilos.rotuloCampo, { color: cores.verdeTitulo }]}>Quantidade</Text>
                            <TextInput
                                style={[estilos.campo, { color: cores.texto, borderColor: cores.borda, backgroundColor: cores.item }]}
                                placeholder="Ex.: 2 kg ou 3 unidades"
                                placeholderTextColor={cores.placeholder}
                                value={quantidade}
                                onChangeText={setQuantidade}
                                maxLength={30}
                            />

                            <Text style={[estilos.rotuloCampo, { color: cores.verdeTitulo }]}>Categoria</Text>
                            <View style={estilos.opcoesCategoria}>
                                {CATEGORIAS_PRODUTO.map((categoria) => (
                                    <TouchableOpacity
                                        key={categoria}
                                        style={[
                                            estilos.opcaoCategoria,
                                            { borderColor: cores.borda },
                                            categoriaSelecionada === categoria && {
                                                backgroundColor: cores.verde,
                                                borderColor: cores.verde,
                                            },
                                        ]}
                                        onPress={() => setCategoriaSelecionada(categoria)}
                                    >
                                        <Text
                                            style={[
                                                estilos.textoOpcao,
                                                { color: cores.verdeTitulo },
                                                categoriaSelecionada === categoria && estilos.textoOpcaoSelecionada,
                                            ]}
                                        >
                                            {categoria}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={[estilos.rotuloCampo, { color: cores.verdeTitulo }]}>Local</Text>
                            <View style={estilos.opcoesCategoria}>
                                {LOCAIS_ARMAZENAMENTO.map((local) => (
                                    <TouchableOpacity
                                        key={local}
                                        style={[
                                            estilos.opcaoCategoria,
                                            { borderColor: cores.borda },
                                            localSelecionado === local && {
                                                backgroundColor: cores.verde,
                                                borderColor: cores.verde,
                                            },
                                        ]}
                                        onPress={() => setLocalSelecionado(local)}
                                    >
                                        <Text
                                            style={[
                                                estilos.textoOpcao,
                                                { color: cores.verdeTitulo },
                                                localSelecionado === local && estilos.textoOpcaoSelecionada,
                                            ]}
                                        >
                                            {local}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[estilos.botaoSalvar, { backgroundColor: cores.verde }, salvando && { opacity: 0.7 }]}
                                onPress={adicionarProduto}
                                activeOpacity={0.8}
                                disabled={salvando}
                            >
                                {salvando ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={estilos.textoBotaoSalvar}>Adicionar à lista</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

const estilos = StyleSheet.create({
    localProduto: {
        fontSize: 12,
        marginTop: 2,
    },

    tela: {
        flex: 1,
    },

    rolagem: {
        flex: 1,
    },

    conteudo: {
        paddingHorizontal: 22,
        paddingBottom: 30,
    },

    cabecalho: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 48,
        marginTop: 80,
    },

    grupoTitulo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    titulo: {
        fontSize: 23,
        fontWeight: "700",
    },

    botaoCategoria: {
        alignSelf: "center",
        width: 190,
        minHeight: 48,
        borderRadius: 13,
        flexDirection: "row",
        gap: 9,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 24,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    textoBotaoCategoria: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },

    barraAcoes: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        paddingHorizontal: 2,
        gap: 10,
    },

    contador: {
        flex: 1,
        fontSize: 14,
        fontWeight: "600",
    },

    acoes: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    botaoAcao: {
        width: 42,
        height: 42,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },

    cartaoLista: {
        borderRadius: 22,
        paddingHorizontal: 18,
        paddingTop: 21,
        paddingBottom: 22,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.13,
        shadowRadius: 5,
        elevation: 4,
    },

    grupoCategoria: {
        marginBottom: 16,
    },

    tituloCategoria: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 9,
        marginLeft: 1,
    },

    listaCategoria: {
        gap: 8,
    },

    linhaProduto: {
        minHeight: 49,
        borderRadius: 12,
        paddingHorizontal: 11,
        paddingVertical: 9,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1.5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    nomeProduto: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
    },

    nomeComprado: {
        textDecorationLine: "line-through",
        opacity: 0.65,
    },

    quantidadeProduto: {
        fontSize: 12,
        fontWeight: "600",
    },

    listaVazia: {
        alignItems: "center",
        paddingVertical: 35,
        gap: 11,
    },

    textoListaVazia: {
        fontSize: 18,
        fontWeight: "700",
    },

    subtextoListaVazia: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 21,
    },

    fundoModal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        padding: 22,
    },

    conteudoModal: {
        borderRadius: 22,
        padding: 23,
        maxHeight: "90%",
    },

    cabecalhoModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    tituloModal: {
        fontSize: 24,
        fontWeight: "700",
    },

    rotuloCampo: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 10,
    },

    campo: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 15,
    },

    opcoesCategoria: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 9,
        marginTop: 5,
    },

    opcaoCategoria: {
        paddingHorizontal: 13,
        paddingVertical: 11,
        borderRadius: 10,
        borderWidth: 1,
    },

    textoOpcao: {
        fontSize: 13,
    },

    textoOpcaoSelecionada: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    botaoSalvar: {
        borderRadius: 13,
        alignItems: "center",
        paddingVertical: 16,
        marginTop: 25,
    },

    textoBotaoSalvar: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});