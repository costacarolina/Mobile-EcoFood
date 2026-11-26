import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "@/../context/themeContext";

type Categoria =
    | "Hortifruti"
    | "Proteínas"
    | "Laticínios"
    | "Mercearia";

type Produto = {
    id: number;
    nome: string;
    quantidade: string;
    categoria: Categoria;
    comprado: boolean;
};

const categorias: Categoria[] = [
    "Hortifruti",
    "Proteínas",
    "Laticínios",
    "Mercearia",
];

const produtosIniciais: Produto[] = [
    {
        id: 1,
        nome: "Alface Crespa",
        quantidade: "2 un",
        categoria: "Hortifruti",
        comprado: false,
    },
    {
        id: 2,
        nome: "Tomate Italiano",
        quantidade: "2 kg",
        categoria: "Hortifruti",
        comprado: false,
    },
    {
        id: 3,
        nome: "Peito de Frango",
        quantidade: "5 kg",
        categoria: "Proteínas",
        comprado: false,
    },
    {
        id: 4,
        nome: "Queijo Mussarela",
        quantidade: "2 kg",
        categoria: "Laticínios",
        comprado: false,
    },
    {
        id: 5,
        nome: "Arroz Parboilizado",
        quantidade: "5 kg",
        categoria: "Mercearia",
        comprado: false,
    },
];

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

    const [produtos, setProdutos] =
        useState<Produto[]>(produtosIniciais);

    const [porCategoria, setPorCategoria] = useState(true);
    const [modalVisivel, setModalVisivel] = useState(false);

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState<Categoria>("Hortifruti");

    const itensPendentes = produtos.filter(
        (produto) => !produto.comprado
    ).length;

    function alternarProduto(id: number) {
        setProdutos((atuais) =>
            atuais.map((produto) =>
                produto.id === id
                    ? { ...produto, comprado: !produto.comprado }
                    : produto
            )
        );
    }

    function adicionarProduto() {
        if (!nome.trim() || !quantidade.trim()) {
            Alert.alert(
                "Campos obrigatórios",
                "Informe o nome e a quantidade do produto."
            );
            return;
        }

        const novoProduto: Produto = {
            id: Date.now(),
            nome: nome.trim(),
            quantidade: quantidade.trim(),
            categoria: categoriaSelecionada,
            comprado: false,
        };

        setProdutos((atuais) => [...atuais, novoProduto]);

        setNome("");
        setQuantidade("");
        setCategoriaSelecionada("Hortifruti");
        setModalVisivel(false);
    }

    function excluirComprados() {
        const existemComprados = produtos.some(
            (produto) => produto.comprado
        );

        if (!existemComprados) {
            Alert.alert(
                "Nenhum produto marcado",
                "Marque os produtos comprados antes de usar a lixeira."
            );
            return;
        }

        Alert.alert(
            "Excluir produtos",
            "Deseja remover os produtos já comprados?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () =>
                        setProdutos((atuais) =>
                            atuais.filter((produto) => !produto.comprado)
                        ),
                },
            ]
        );
    }

    function renderProduto(produto: Produto) {
        return (
            <TouchableOpacity
                key={produto.id}
                style={[
                    estilos.linhaProduto,
                    { backgroundColor: cores.item },
                ]}
                activeOpacity={0.8}
                onPress={() => alternarProduto(produto.id)}
            >
                <View
                    style={[
                        estilos.checkbox,
                        { borderColor: cores.checkbox },
                        produto.comprado && {
                            backgroundColor: cores.verde,
                            borderColor: cores.verde,
                        },
                    ]}
                >
                    {produto.comprado && (
                        <Ionicons
                            name="checkmark"
                            size={19}
                            color="#FFFFFF"
                        />
                    )}
                </View>

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

                <Text
                    style={[
                        estilos.quantidadeProduto,
                        { color: cores.texto },
                    ]}
                >
                    {produto.quantidade}
                </Text>
            </TouchableOpacity>
        );
    }

    function renderCategorias() {
        return categorias.map((categoria) => {
            const itens = produtos.filter(
                (produto) => produto.categoria === categoria
            );

            if (itens.length === 0) {
                return null;
            }

            return (
                <View key={categoria} style={estilos.grupoCategoria}>
                    <Text
                        style={[
                            estilos.tituloCategoria,
                            { color: cores.verdeTitulo },
                        ]}
                    >
                        {categoria} ({itens.length})
                    </Text>

                    <View style={estilos.listaCategoria}>
                        {itens.map((produto) => renderProduto(produto))}
                    </View>
                </View>
            );
        });
    }

    return (
        <View
            style={[
                estilos.tela,
                { backgroundColor: cores.fundo },
            ]}
        >
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
                        <Ionicons
                            name="cart-outline"
                            size={31}
                            color={cores.verdeTitulo}
                        />

                        <Text
                            style={[
                                estilos.titulo,
                                { color: cores.texto },
                            ]}
                        >
                            Lista de Compras
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        estilos.botaoCategoria,
                        { backgroundColor: cores.verde },
                    ]}
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
                    <Text
                        style={[
                            estilos.contador,
                            { color: cores.texto },
                        ]}
                    >
                        {itensPendentes}{" "}
                        {itensPendentes === 1
                            ? "item para comprar"
                            : "itens para comprar"}
                    </Text>

                    <View style={estilos.acoes}>
                        <TouchableOpacity
                            onPress={excluirComprados}
                            style={[
                                estilos.botaoAcao,
                                { backgroundColor: cores.verde },
                            ]}
                            accessibilityLabel="Excluir produtos comprados"
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name="trash-outline"
                                size={23}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisivel(true)}
                            style={[
                                estilos.botaoAcao,
                                { backgroundColor: cores.verde },
                            ]}
                            accessibilityLabel="Adicionar produto"
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name="add"
                                size={28}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={[
                        estilos.cartaoLista,
                        { backgroundColor: cores.card },
                    ]}
                >
                    {produtos.length === 0 ? (
                        <View style={estilos.listaVazia}>
                            <Ionicons
                                name="cart-outline"
                                size={48}
                                color={cores.verde}
                            />

                            <Text
                                style={[
                                    estilos.textoListaVazia,
                                    { color: cores.verdeTitulo },
                                ]}
                            >
                                Sua lista está vazia.
                            </Text>

                            <Text
                                style={[
                                    estilos.subtextoListaVazia,
                                    { color: cores.textoSecundario },
                                ]}
                            >
                                Toque no botão + para adicionar produtos.
                            </Text>
                        </View>
                    ) : porCategoria ? (
                        renderCategorias()
                    ) : (
                        <View style={estilos.listaCategoria}>
                            {produtos.map((produto) => renderProduto(produto))}
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
                    <View
                        style={[
                            estilos.conteudoModal,
                            { backgroundColor: cores.fundoModal },
                        ]}
                    >
                        <View style={estilos.cabecalhoModal}>
                            <Text
                                style={[
                                    estilos.tituloModal,
                                    { color: cores.verdeTitulo },
                                ]}
                            >
                                Novo produto
                            </Text>

                            <TouchableOpacity
                                onPress={() => setModalVisivel(false)}
                                accessibilityLabel="Fechar"
                            >
                                <Ionicons
                                    name="close"
                                    size={30}
                                    color={cores.verdeTitulo}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={[
                                estilos.rotuloCampo,
                                { color: cores.verdeTitulo },
                            ]}
                        >
                            Nome do produto
                        </Text>

                        <TextInput
                            style={[
                                estilos.campo,
                                {
                                    color: cores.texto,
                                    borderColor: cores.borda,
                                    backgroundColor: cores.item,
                                },
                            ]}
                            placeholder="Ex.: Maçã"
                            placeholderTextColor={cores.placeholder}
                            value={nome}
                            onChangeText={setNome}
                            maxLength={60}
                        />

                        <Text
                            style={[
                                estilos.rotuloCampo,
                                { color: cores.verdeTitulo },
                            ]}
                        >
                            Quantidade
                        </Text>

                        <TextInput
                            style={[
                                estilos.campo,
                                {
                                    color: cores.texto,
                                    borderColor: cores.borda,
                                    backgroundColor: cores.item,
                                },
                            ]}
                            placeholder="Ex.: 2 kg ou 3 unidades"
                            placeholderTextColor={cores.placeholder}
                            value={quantidade}
                            onChangeText={setQuantidade}
                            maxLength={30}
                        />

                        <Text
                            style={[
                                estilos.rotuloCampo,
                                { color: cores.verdeTitulo },
                            ]}
                        >
                            Categoria
                        </Text>

                        <View style={estilos.opcoesCategoria}>
                            {categorias.map((categoria) => (
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
                                    onPress={() =>
                                        setCategoriaSelecionada(categoria)
                                    }
                                >
                                    <Text
                                        style={[
                                            estilos.textoOpcao,
                                            { color: cores.verdeTitulo },
                                            categoriaSelecionada === categoria &&
                                            estilos.textoOpcaoSelecionada,
                                        ]}
                                    >
                                        {categoria}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[
                                estilos.botaoSalvar,
                                { backgroundColor: cores.verde },
                            ]}
                            onPress={adicionarProduto}
                            activeOpacity={0.8}
                        >
                            <Text style={estilos.textoBotaoSalvar}>
                                Adicionar à lista
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const estilos = StyleSheet.create({
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