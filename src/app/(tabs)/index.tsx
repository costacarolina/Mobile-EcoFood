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

                    <Ionicons
                        name="menu"
                        size={27}
                        color={colors.text}
                    />

                    <Image
                        source={require("../../../assets/images/logoecofood/logoecofood.png")}
                        style={styles.logo}
                    />

                    <View style={styles.icons}>

                        <Ionicons
                            name="notifications-outline"
                            size={25}
                            color={colors.text}
                        />

                        <Ionicons
                            name="scan-outline"
                            size={25}
                            color={colors.text}
                        />

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

                </View>


                {/* IMPACTO */}

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
                            texto="Alimentos aproveitados"
                        />

                        <ImpactoItem
                            icon="cash-outline"
                            valor="R$ 680"
                            texto="Economia gerada"
                        />

                        <ImpactoItem
                            icon="trending-up-outline"
                            valor="14%"
                            texto="Redução no desperdício"
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
        paddingHorizontal: 10,
        paddingTop: 18,
        paddingBottom: 90,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 58,
    },

    logo: {
        width: 70,
        height: 55,
        resizeMode: "contain",
    },

    icons: {
        flexDirection: "row",
        gap: 15,
    },

    bem: {
        fontSize: 14,
        marginTop: 8,
    },

    titulo: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 2,
    },

    data: {
        fontSize: 10,
        marginTop: 2,
    },

    cards: {
        marginTop: 15,
        paddingRight: 10,
        gap: 8,
    },


    /* CARD DE ALERTA */

    alerta: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 15,
        minHeight: 64,

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
        fontSize: 12,
        fontWeight: "bold",
    },

    alertTexto: {
        fontSize: 10,
        marginTop: 1,
    },

    alertButton: {
        borderRadius: 8,
        paddingVertical: 9,
        paddingHorizontal: 9,
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },

    alertButtonText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "bold",
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
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
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
        fontSize: 9,
    },

    itemLista: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },

    itemEsquerdo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
    },

    itemTexto: {
        fontSize: 10,
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
        fontSize: 10,
        marginBottom: 12,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    relatorio: {
        paddingVertical: 7,
        borderRadius: 8,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 3,
    },

    relatorioTexto: {
        fontSize: 9,
    },

});