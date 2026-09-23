import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/../context/themeContext";

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image
} from "react-native";

import { router } from "expo-router";

export default function Perfil() {
    const { darkMode, toggleDarkMode } = useTheme();

    const colors = {
        background: darkMode ? "#181818" : "#FFFFFF",
        card: darkMode ? "#2B2B2B" : "#FAFAFA",
        text: darkMode ? "#FFFFFF" : "#171717",
        secondary: darkMode ? "#CCCCCC" : "#333333",
        border: darkMode ? "#2B2B2B" : "#DDDDDD",
        green: darkMode ? "#A5D6A7" : "#155B3A",
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >

                {/* TÍTULO */}

                <Text
                    style={[
                        styles.titulo,
                        { color: colors.text },
                    ]}
                >
                    Meu perfil
                </Text>


                {/* RESTAURANTE */}

                <View
                    style={[
                        styles.restaurante,
                        {
                            backgroundColor: colors.card,
                        },
                    ]}
                >

                    <Image
                        source={require("../../../assets/images/logorestaurante/logorestaurante.png")}
                        style={styles.logoRestaurante}
                    />


                    <View style={styles.infoRestaurante}>

                        <Text
                            style={[
                                styles.label,
                                { color: colors.text },
                            ]}
                        >
                            Restaurante
                        </Text>

                        <View style={styles.nomeLinha}>

                            <Text
                                style={[
                                    styles.nome,
                                    { color: colors.text },
                                ]}
                            >
                                Sabor & Mesa
                            </Text>

                            <Ionicons
                                name="checkmark-circle"
                                size={13}
                                color="#4C914A"
                            />

                        </View>

                        <Text
                            style={[
                                styles.descricao,
                                { color: colors.secondary },
                            ]}
                        >
                            Cozinha contemporânea
                            {"\n"}
                            com propósito
                        </Text>

                        <View style={styles.statusLinha}>

                            <View style={styles.status}>
                                <Text style={styles.statusTexto}>
                                    Ativo
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.data,
                                    { color: colors.secondary },
                                ]}
                            >
                                Desde 08/2023
                            </Text>

                        </View>

                    </View>


                    <Ionicons
                        name="lock-closed-outline"
                        size={12}
                        color={colors.secondary}
                        style={styles.cadeado}
                    />

                </View>


                {/* DADOS DO RESTAURANTE */}

                <View style={styles.tituloSecao}>

                    <Text
                        style={[
                            styles.tituloVerde,
                            { color: colors.green },
                        ]}
                    >
                        Dados do restaurante
                    </Text>

                    <TouchableOpacity>

                        <Ionicons
                            name="pencil-outline"
                            size={19}
                            color={colors.text}
                        />

                    </TouchableOpacity>

                </View>


                {/* DADOS */}

                <View
                    style={[
                        styles.cardDados,
                        {
                            backgroundColor: colors.card,
                        },
                    ]}
                >

                    <InfoLinha
                        icon="document-text-outline"
                        titulo="Nome do restaurante"
                        valor="Sabor & Mesa"
                        colors={colors}
                    />

                    <InfoLinha
                        icon="restaurant-outline"
                        titulo="Tipo de cozinha"
                        valor="Contemporânea"
                        colors={colors}
                    />

                    <InfoLinha
                        icon="location-outline"
                        titulo="Endereço"
                        valor={"Rua das Auras, 067\nCentro, São Paulo - SP"}
                        colors={colors}
                    />

                    <InfoLinha
                        icon="call-outline"
                        titulo="Telefone"
                        valor="(11) 99999-9999"
                        colors={colors}
                    />

                    <InfoLinha
                        icon="mail-outline"
                        titulo="E-mail"
                        valor="contato@saboremesa.com.br"
                        colors={colors}
                    />

                    <InfoLinha
                        icon="keypad-outline"
                        titulo="CNPJ"
                        valor="12.345.678/0001-90"
                        colors={colors}
                    />

                </View>


                {/* MODO ESCURO */}

                <View
                    style={[
                        styles.modoEscuro,
                        {
                            backgroundColor: colors.card,
                        },
                    ]}
                >

                    <Text
                        style={[
                            styles.modoTexto,
                            { color: colors.text },
                        ]}
                    >
                        Modo Escuro
                    </Text>

                    <Switch
                        value={darkMode}
                        onValueChange={toggleDarkMode}
                        trackColor={{
                            false: "#C9C9C9",
                            true: "#4C7553",
                        }}
                        thumbColor="#FFFFFF"
                    />

                </View>


                {/* SAIR */}
                <TouchableOpacity
                    style={styles.botaoSair}
                    onPress={() => {
                        router.dismissAll();
                        router.replace("/");
                    }}
                >
                    <Text style={styles.textoSair}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}


/* COMPONENTE DAS INFORMAÇÕES */

function InfoLinha({
    icon,
    titulo,
    valor,
    colors,
}: any) {

    return (
        <View style={styles.linhaInfo}>

            <View style={styles.ladoEsquerdo}>

                <Ionicons
                    name={icon}
                    size={16}
                    color={colors.secondary}
                />

                <Text
                    style={[
                        styles.nomeInfo,
                        { color: colors.text },
                    ]}
                >
                    {titulo}
                </Text>

            </View>

            <Text
                style={[
                    styles.valorInfo,
                    { color: colors.text },
                ]}
            >
                {valor}
            </Text>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    scroll: {
        paddingHorizontal: 18,
        paddingTop: 48,
        paddingBottom: 100,
    },

    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 38,
    },

    restaurante: {
        minHeight: 102,
        borderRadius: 9,
        padding: 9,
        flexDirection: "row",
        alignItems: "center",
    },

    logoRestaurante: {
        width: 80,
        height: 80,
        borderRadius: 45,
        resizeMode: "cover",
    },

    infoRestaurante: {
        flex: 1,
        marginLeft: 14,
    },

    label: {
        fontSize: 9,
    },

    nomeLinha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    nome: {
        fontSize: 13,
        fontWeight: "bold",
    },

    descricao: {
        fontSize: 8,
        lineHeight: 10,
        marginTop: 2,
    },

    statusLinha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        marginTop: 5,
    },

    status: {
        backgroundColor: "#4C914A",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 2,
    },

    statusTexto: {
        color: "#FFFFFF",
        fontSize: 7,
    },

    data: {
        fontSize: 7,
    },

    cadeado: {
        alignSelf: "flex-end",
    },

    tituloSecao: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 22,
        marginBottom: 17,
    },

    tituloVerde: {
        fontSize: 10,
        fontWeight: "bold",
    },

    cardDados: {
        borderRadius: 9,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    linhaInfo: {
        minHeight: 34,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    ladoEsquerdo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flex: 1,
    },

    nomeInfo: {
        fontSize: 9,
    },

    valorInfo: {
        fontSize: 8,
        textAlign: "right",
        maxWidth: "52%",
    },

    modoEscuro: {
        height: 42,
        borderRadius: 9,
        marginTop: 18,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    modoTexto: {
        fontSize: 14,
        fontWeight: "bold",
    },

    botaoSair: {
        height: 42,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: "#E85B5B",
        marginTop: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    textoSair: {
        color: "#E85B5B",
        fontSize: 12,
        fontWeight: "500",
    },

});