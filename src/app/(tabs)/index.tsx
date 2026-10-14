import InfoCard from "@/components/InfoCard";
import CategoriaItem from "@/components/categoriaItem";
import ImpactoItem from "@/components/impactoItem";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/../context/themeContext";

import {
    ScrollView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { router } from "expo-router";

export default function Home() {
    const { darkMode } = useTheme();

    const colors = darkMode
        ? {
            background: "#181818",
            card: "#2B2B2B",
            text: "#FFFFFF",
            secondary: "#C8C8C8",
            green: "#4FA36B",
            lightGreen: "#607D63",
            border: "#444444",
            red: "#D9534F",
            gold: "#C59B45",
        }
        : {
            background: "#FFFFFF",
            card: "#FAFAFA",
            text: "#171717",
            secondary: "#777777",
            green: "#155B3A",
            lightGreen: "#D6E7D0",
            border: "#DDDDDD",
            red: "#D9534F",
            gold: "#DFC687",
        };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >

                {/* HEADER */}

                <View style={styles.header}>

                    <Image
                        source={require("../../../assets/images/logoecofood/logoecofood.png")}
                        style={styles.logo}
                    />

                    <View style={styles.icons}>

                        <Ionicons
                            name="notifications-outline"
                            size={28}
                            color={colors.text}
                        />

                        <TouchableOpacity
                            onPress={() => router.push("/adicionarProduto")}
                        >
                            <Ionicons
                                name="scan-outline"
                                size={28}
                                color={colors.text}
                            />
                        </TouchableOpacity>

                    </View>

                </View>


                {/* TÍTULO */}

                <Text
                    style={[
                        styles.bem,
                        { color: colors.text },
                    ]}
                >
                    Bem-vindo, Chef Rafael
                </Text>

                <Text
                    style={[
                        styles.titulo,
                        { color: darkMode ? "#4FA36B" : "#155B3A" },
                    ]}
                >
                    Visão geral do seu restaurante
                </Text>

                <Text
                    style={[
                        styles.data,
                        { color: colors.secondary },
                    ]}
                >
                    Atualizado hoje, 08:30
                </Text>


                {/* CARDS DE INFORMAÇÃO */}

                <FlatList
                    data={[
                        {
                            icon: "cube-outline",
                            valor: "124",
                            texto: "Produtos cadastrados",
                            cor: "#075B2A",
                        },
                        {
                            icon: "alert-circle-outline",
                            valor: "18",
                            texto: "Próximos do vencimento",
                            cor: "#D9534F",
                        },
                        {
                            icon: "cart-outline",
                            valor: "5",
                            texto: "Produtos em falta",
                            cor: "#C9A34B",
                        },
                        {
                            icon: "leaf-outline",
                            valor: "12,4 kg",
                            texto: "Desperdício evitado este mês",
                            cor: "#287552",
                        },
                        {
                            icon: "cash-outline",
                            valor: "R$ 680",
                            texto: "Economia gerada este mês",
                            cor: "#075B2A",
                        },
                    ]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.texto}
                    contentContainerStyle={styles.cards}
                    renderItem={({ item }) => (
                        <InfoCard
                            icon={item.icon as any}
                            valor={item.valor}
                            texto={item.texto}
                            cor={item.cor}
                        />
                    )}
                />


                {/* ALERTA */}

                <View
                    style={[
                        styles.alerta,
                        {
                            borderColor: colors.red,
                            backgroundColor: darkMode ? "#242424" : "#FFFFFF",
                        },
                    ]}
                >

                    <Ionicons
                        name="warning"
                        size={28}
                        color={colors.red}
                    />

                    <View style={styles.alertInfo}>

                        <Text
                            style={[
                                styles.alertTitulo,
                                { color: "#E15B5B" },
                            ]}
                        >
                            Atenção
                        </Text>

                        <Text
                            style={[
                                styles.alertTexto,
                                { color: colors.text },
                            ]}
                        >
                            18 produtos próximos do vencimento.
                        </Text>

                    </View>

                    <TouchableOpacity
                        style={[
                            styles.alertButton,
                            { backgroundColor: colors.red },
                        ]}
                    >

                        <Text style={styles.alertButtonText}>
                            Ver estoque
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={15}
                            color="#FFFFFF"
                        />

                    </TouchableOpacity>

                </View>

                <View
                    style={[
                        styles.impacto,
                        { backgroundColor: colors.card },
                    ]}
                >

                    <Text
                        style={[
                            styles.impactoTitulo,
                            { color: colors.text },
                        ]}
                    >
                        Impacto do seu restaurante
                    </Text>

                    <View style={styles.row}>

                        <ImpactoItem
                            icon="leaf-outline"
                            valor="12,4 kg"
                            texto="Aproveitados"
                        />

                        <ImpactoItem
                            icon="cash-outline"
                            valor="R$ 680"
                            texto="Economia"
                        />

                        <ImpactoItem
                            icon="trending-up-outline"
                            valor="14%"
                            texto="Redução"
                        />

                    </View>

                    <TouchableOpacity
                        style={[
                            styles.relatorio,
                            {
                                backgroundColor: darkMode
                                    ? "#666666"
                                    : "#BBBBBB",
                            },
                        ]}
                    >

                        <Text
                            style={[
                                styles.relatorioTexto,
                                { color: colors.text },
                            ]}
                        >
                            Ver relatórios completos
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={15}
                            color={colors.text}
                        />

                    </TouchableOpacity>

                </View>


                {/* ESTOQUE */}

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.card },
                    ]}
                >

                    <Text
                        style={[
                            styles.cardTitulo,
                            { color: colors.text },
                        ]}
                    >
                        Estoque por categoria
                    </Text>

                    <CategoriaItem
                        nome="Geladeira"
                        porcentagem="45%"
                        icon="snow-outline"
                    />

                    <CategoriaItem
                        nome="Freezer"
                        porcentagem="30%"
                        icon="cube-outline"
                    />

                    <CategoriaItem
                        nome="Despensa"
                        porcentagem="25%"
                        icon="file-tray-outline"
                    />

                    <TouchableOpacity
                        style={[
                            styles.verde,
                            {
                                backgroundColor: darkMode
                                    ? "#607D63"
                                    : "#D6E7D0",
                            },
                        ]}
                    >

                        <Text
                            style={[
                                styles.verTexto,
                                {
                                    color: darkMode
                                        ? "#FFFFFF"
                                        : "#171717",
                                },
                            ]}
                        >
                            Ver estoque completo
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={darkMode ? "#FFFFFF" : "#171717"}
                        />

                    </TouchableOpacity>

                </View>


                {/* LISTA DE COMPRAS */}

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.card },
                    ]}
                >

                    <Text
                        style={[
                            styles.cardTitulo,
                            { color: colors.text },
                        ]}
                    >
                        Lista de compras
                    </Text>

                    <ListaItem
                        icon="leaf-outline"
                        texto="5 itens para repor"
                        color={colors.green}
                        textColor={colors.text}
                    />

                    <ListaItem
                        icon="time-outline"
                        texto="Priorize os próximos vencimentos"
                        color="#C9A34B"
                        textColor={colors.text}
                    />

                    <ListaItem
                        icon="cube-outline"
                        texto="Gere pedidos para fornecedores"
                        color="#999999"
                        textColor={colors.text}
                    />

                    <TouchableOpacity
                        style={[
                            styles.amarelo,
                            {
                                backgroundColor: darkMode
                                    ? "#A48643"
                                    : "#DFC687",
                            },
                        ]}
                    >

                        <Text
                            style={[
                                styles.verTexto,
                                { color: colors.text },
                            ]}
                        >
                            Ver lista de compras
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={colors.text}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/(tabs)/detalhesProduto")}
                        style={{
                            backgroundColor: "#2F6B4F",
                            padding: 15,
                            borderRadius: 10,
                            margin: 20,
                        }}
                    >
                        <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                            Visualizar detalhes do produto
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </View>
    );
}


/* ITEM DA LISTA DE COMPRAS */

function ListaItem({
    icon,
    texto,
    color,
    textColor,
}: any) {
    return (
        <View style={styles.itemLista}>

            <View style={styles.itemEsquerdo}>

                <Ionicons
                    name={icon}
                    size={15}
                    color={color}
                />

                <Text
                    style={[
                        styles.itemTexto,
                        { color: textColor },
                    ]}
                >
                    {texto}
                </Text>

            </View>

            <Ionicons
                name="chevron-forward"
                size={16}
                color={textColor}
            />

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    scroll: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },

    header: {
        height: 70,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 100,
        height: 62,
        resizeMode: "contain",
    },

    icons: {
        position: "absolute",
        right: 0,
        top: 0,
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
    },

    bem: {
        fontSize: 17,
        fontWeight: "500",
        marginTop: 12,
        flexShrink: 1,
        flexWrap: "wrap",
    },

    titulo: {
        fontSize: 21,
        fontWeight: "bold",
        marginTop: 4,
        flexShrink: 1,
        flexWrap: "wrap",
    },

    data: {
        fontSize: 10,
        marginTop: 4,
        flexShrink: 1,
    },

    cards: {
        marginTop: 15,
        paddingRight: 10,
        gap: 8,
    },


    /* CARD DE ALERTA */

    alerta: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 18,
        minHeight: 86,

        // SOMBRA
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 5,
        elevation: 3,
    },

    alertInfo: {
        flex: 1,
    },

    alertTitulo: {
        fontSize: 15,
        fontWeight: "bold",
    },

    alertTexto: {
        fontSize: 13,
        marginTop: 4,
        flexShrink: 1,
    },

    alertButton: {
        borderRadius: 9,
        paddingVertical: 11,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        flexShrink: 1,
        flexWrap: "wrap",
    },

    alertButtonText: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "bold",
        flexShrink: 1,
        textAlign: "center",
    },


    /* CARDS MAIORES */

    card: {
        borderRadius: 10,
        padding: 12,
        marginTop: 15,

        // SOMBRA
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 5,
        elevation: 3,
    },

    cardTitulo: {
        fontSize: 19,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },

    verde: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 3,
    },

    amarelo: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
    },

    verTexto: {
        fontSize: 13,
        fontWeight: "600",
    },

    itemLista: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },

    itemEsquerdo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
    },

    itemTexto: {
        flex: 1,
        flexShrink: 1,
        fontSize: 14,
        fontWeight: "600",
        includeFontPadding: true,
    },


    /* IMPACTO */

    impacto: {
        borderRadius: 10,
        padding: 12,
        marginTop: 15,

        // SOMBRA
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 5,
        elevation: 3,
    },

    impactoTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 18,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    relatorio: {
        paddingVertical: 11,
        borderRadius: 9,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 5,
    },

    relatorioTexto: {
        fontSize: 13,
        fontWeight: "600"
    },

});