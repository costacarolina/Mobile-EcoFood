
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
        style={estilos.linhaProduto}
        activeOpacity={0.8}
        onPress={() => alternarProduto(produto.id)}
    >
        <View
        style={[
            estilos.checkbox,
            produto.comprado && estilos.checkboxMarcado,
        ]}
        >
        {produto.comprado && (
            <Ionicons
            name="checkmark"
            size={15}
            color="#FFFFFF"
            />
        )}
        </View>

        <Text
        style={[
            estilos.nomeProduto,
            produto.comprado && estilos.nomeComprado,
        ]}
        numberOfLines={1}
        >
        {produto.nome}
        </Text>

        <Text style={estilos.quantidadeProduto}>
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
        <Text style={estilos.tituloCategoria}>
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
    <View style={estilos.tela}>
    <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
    />

    <ScrollView
        style={estilos.rolagem}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
    >

        <View style={estilos.areaLogo}>
        <Image
            source={require("../../../assets/images/logoecofood/logoecofood.png")}
            style={estilos.logo}
            resizeMode="contain"
        />
        </View>

        <View style={estilos.cabecalho}>
        <Ionicons
            name="cart-outline"
            size={25}
            color="#000000"
        />

        <Text style={estilos.titulo}>
            Lista de Compras
        </Text>

        <View style={estilos.espacoCabecalho} />
        </View>

        {/* Alternar visualização */}
        <TouchableOpacity
        style={estilos.botaoCategoria}
        onPress={() => setPorCategoria((atual) => !atual)}
        activeOpacity={0.8}
        >
        <Text style={estilos.textoBotaoCategoria}>
            {porCategoria ? "Por categoria" : "Lista completa"}
        </Text>
        </TouchableOpacity>

        {/* Quantidade e ações */}
        <View style={estilos.barraAcoes}>
        <Text style={estilos.contador}>
            {itensPendentes}{" "}
            {itensPendentes === 1
            ? "item para comprar"
            : "itens para comprar"}
        </Text>

        <View style={estilos.acoes}>
            <TouchableOpacity
            onPress={excluirComprados}
            style={estilos.botaoAcao}
            accessibilityLabel="Excluir produtos comprados"
            >
            <Ionicons
                name="trash-outline"
                size={20}
                color="#FFFFFF"
            />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => setModalVisivel(true)}
            style={estilos.botaoAcao}
            accessibilityLabel="Adicionar produto"
            >
            <Ionicons
                name="add"
                size={23}
                color="#FFFFFF"
            />
            </TouchableOpacity>
        </View>
        </View>

        <View style={estilos.cartaoLista}>
        {produtos.length === 0 ? (
            <View style={estilos.listaVazia}>
            <Ionicons
                name="cart-outline"
                size={38}
                color="#1B603C"
            />
            <Text style={estilos.textoListaVazia}>
                Sua lista está vazia.
            </Text>
            <Text style={estilos.subtextoListaVazia}>
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
        <View style={estilos.conteudoModal}>
            <View style={estilos.cabecalhoModal}>
            <Text style={estilos.tituloModal}>
                Novo produto
            </Text>

            <TouchableOpacity
                onPress={() => setModalVisivel(false)}
                accessibilityLabel="Fechar"
            >
                <Ionicons
                name="close"
                size={25}
                color="#173B2C"
                />
            </TouchableOpacity>
            </View>

            <Text style={estilos.rotuloCampo}>
            Nome do produto
            </Text>

            <TextInput
            style={estilos.campo}
            placeholder="Ex.: Maçã"
            placeholderTextColor="#888888"
            value={nome}
            onChangeText={setNome}
            maxLength={60}
            />

            <Text style={estilos.rotuloCampo}>
            Quantidade
            </Text>

            <TextInput
            style={estilos.campo}
            placeholder="Ex.: 2 kg ou 3 unidades"
            placeholderTextColor="#888888"
            value={quantidade}
            onChangeText={setQuantidade}
            maxLength={30}
            />

            <Text style={estilos.rotuloCampo}>
            Categoria
            </Text>

            <View style={estilos.opcoesCategoria}>
            {categorias.map((categoria) => (
                <TouchableOpacity
                key={categoria}
                style={[
                    estilos.opcaoCategoria,
                    categoriaSelecionada === categoria &&
                    estilos.opcaoSelecionada,
                ]}
                onPress={() =>
                    setCategoriaSelecionada(categoria)
                }
                >
                <Text
                    style={[
                    estilos.textoOpcao,
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
            style={estilos.botaoSalvar}
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
    backgroundColor: "#FFFFFF",
},

rolagem: {
    flex: 1,
},

conteudo: {
    paddingHorizontal: 26,
    paddingBottom: 24,
},

areaLogo: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 12,
},

logo: {
    width: 65,
    height: 44,
},

cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 30,
},

titulo: {
    color: "#080808",
    fontSize: 18,
    fontWeight: "700",
},

espacoCabecalho: {
    width: 25,
},

botaoCategoria: {
    alignSelf: "center",
    backgroundColor: "#1B603C",
    width: 139,
    minHeight: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
},

textoBotaoCategoria: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
},

barraAcoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 1,
},

contador: {
    fontSize: 12,
    color: "#111111",
},

acoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
},

botaoAcao: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#1B603C",
    alignItems: "center",
    justifyContent: "center",
},

cartaoLista: {
    backgroundColor: "#F3F0E6",
    borderRadius: 19,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 17,
    marginBottom: 10,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 4,
},

grupoCategoria: {
    marginBottom: 7,
},

tituloCategoria: {
    color: "#111111",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
    marginLeft: 0,
},

listaCategoria: {
    gap: 4,
},

linhaProduto: {
    minHeight: 31,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
},

checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "#64C96C",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
},

checkboxMarcado: {
    backgroundColor: "#1B603C",
    borderColor: "#1B603C",
},

nomeProduto: {
    flex: 1,
    fontSize: 10,
    color: "#111111",
},

nomeComprado: {
    textDecorationLine: "line-through",
    color: "#888888",
},

quantidadeProduto: {
    fontSize: 9,
    fontWeight: "600",
    color: "#111111",
},

listaVazia: {
    alignItems: "center",
    paddingVertical: 25,
    gap: 8,
},

textoListaVazia: {
    fontSize: 15,
    fontWeight: "700",
    color: "#173B2C",
},

subtextoListaVazia: {
    color: "#555555",
    fontSize: 12,
    textAlign: "center",
},

fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 22,
},

conteudoModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
},

cabecalhoModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
},

tituloModal: {
    color: "#173B2C",
    fontSize: 20,
    fontWeight: "700",
},

rotuloCampo: {
    color: "#173B2C",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 8,
},

campo: {
    borderWidth: 1,
    borderColor: "#D7DFD6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#111111",
    fontSize: 14,
},

opcoesCategoria: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
},

opcaoCategoria: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#D7DFD6",
},

opcaoSelecionada: {
    backgroundColor: "#1B603C",
    borderColor: "#1B603C",
},

textoOpcao: {
    color: "#173B2C",
    fontSize: 11,
},

textoOpcaoSelecionada: {
    color: "#FFFFFF",
    fontWeight: "600",
},

botaoSalvar: {
    backgroundColor: "#1B603C",
    borderRadius: 11,
    alignItems: "center",
    paddingVertical: 13,
    marginTop: 22,
},

textoBotaoSalvar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
},
});
