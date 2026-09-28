import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/../context/themeContext";

import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Image,
    TextInput,
} from "react-native";

import { useState } from "react";

export default function Perfil() {
    const { darkMode, toggleDarkMode } = useTheme();

    const [editando, setEditando] = useState(false);

    const [dados, setDados] = useState({
        nome: "Sabor & Mesa",
        cozinha: "Contemporânea",
        endereco: "Rua das Auras, 067\nCentro, São Paulo - SP",
        telefone: "(11) 99999-9999",
        email: "contato@saboremesa.com.br",
        cnpj: "12.345.678/0001-90",
    });

    const [dadosEditados, setDadosEditados] = useState(dados);

    const colors = {
        background: darkMode ? "#181818" : "#FFFFFF",
        card: darkMode ? "#2B2B2B" : "#FAFAFA",
        text: darkMode ? "#FFFFFF" : "#171717",
        secondary: darkMode ? "#CCCCCC" : "#333333",
        border: darkMode ? "#444444" : "#DDDDDD",
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
                    {/* LOGO DO RESTAURANTE */}

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
                                {dados.nome}
                            </Text>

                            <Ionicons
                                name="checkmark-circle"
                                size={18}
                                color="#4C914A"
                            />
                        </View>

                        <Text
                            style={[
                                styles.descricao,
                                { color: colors.secondary },
                            ]}
                        >
                            Cozinha {dados.cozinha.toLowerCase()}
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
                        size={17}
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

                    <TouchableOpacity
                        onPress={() => {
                            setDadosEditados(dados);
                            setEditando(true);
                        }}
                    >
                        <Ionicons
                            name="pencil-outline"
                            size={23}
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
                    {editando ? (
                        <>
                            <CampoEdicao
                                titulo="Nome do restaurante"
                                valor={dadosEditados.nome}
                                onChangeText={(valor: string) =>
                                    setDadosEditados({
                                        ...dadosEditados,
                                        nome: valor,
                                    })
                                }
                                colors={colors}
                            />

                            <CampoEdicao
                                titulo="Tipo de cozinha"
                                valor={dadosEditados.cozinha}
                                onChangeText={(valor: string) =>
                                    setDadosEditados({
                                        ...dadosEditados,
                                        cozinha: valor,
                                    })
                                }
                                colors={colors}
                            />

                            <CampoEdicao
                                titulo="Endereço"
                                valor={dadosEditados.endereco}
                                onChangeText={(valor: string) =>
                                    setDadosEditados({
                                        ...dadosEditados,
                                        endereco: valor,
                                    })
                                }
                                colors={colors}
                                multiline
                            />

                            <CampoEdicao
                                titulo="Telefone"
                                valor={dadosEditados.telefone}
                                onChangeText={(valor: string) =>
                                    setDadosEditados({
                                        ...dadosEditados,
                                        telefone: valor,
                                    })
                                }
                                colors={colors}
                                keyboardType="phone-pad"
                            />

                            <CampoEdicao
                                titulo="E-mail"
                                valor={dadosEditados.email}
                                onChangeText={(valor: string) =>
                                    setDadosEditados({
                                        ...dadosEditados,
                                        email: valor,
                                    })
                                }
                                colors={colors}
                                keyboardType="email-address"
                            />

                            <CampoEdicao
                                titulo="CNPJ"
                                valor={dadosEditados.cnpj}
                                onChangeText={(valor: string) =>
                                    setDadosEditados({
                                        ...dadosEditados,
                                        cnpj: valor,
                                    })
                                }
                                colors={colors}
                            />

                            {/* BOTÕES */}

                            <View style={styles.botoesEdicao}>
                                <TouchableOpacity
                                    style={styles.botaoCancelar}
                                    onPress={() => {
                                        setDadosEditados(dados);
                                        setEditando(false);
                                    }}
                                >
                                    <Text style={styles.textoCancelar}>
                                        Cancelar
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.botaoSalvar}
                                    onPress={() => {
                                        setDados(dadosEditados);
                                        setEditando(false);
                                    }}
                                >
                                    <Text style={styles.textoSalvar}>
                                        Salvar alterações
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <InfoLinha
                                icon="document-text-outline"
                                titulo="Nome do restaurante"
                                valor={dados.nome}
                                colors={colors}
                            />

                            <InfoLinha
                                icon="restaurant-outline"
                                titulo="Tipo de cozinha"
                                valor={dados.cozinha}
                                colors={colors}
                            />

                            <InfoLinha
                                icon="location-outline"
                                titulo="Endereço"
                                valor={dados.endereco}
                                colors={colors}
                            />

                            <InfoLinha
                                icon="call-outline"
                                titulo="Telefone"
                                valor={dados.telefone}
                                colors={colors}
                            />

                            <InfoLinha
                                icon="mail-outline"
                                titulo="E-mail"
                                valor={dados.email}
                                colors={colors}
                            />

                            <InfoLinha
                                icon="keypad-outline"
                                titulo="CNPJ"
                                valor={dados.cnpj}
                                colors={colors}
                            />
                        </>
                    )}
                </View>

                {/* MODO ESCURO */}

                <View
                    style={[
                        styles.modoEscuro,
                        {
                            backgroundColor: darkMode ? "#2B2B2B" : "#FAFAFA",
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.modoTexto,
                            {
                                color: darkMode ? "#FFFFFF" : "#242424",
                            },
                        ]}
                    >
                        Modo Escuro
                    </Text>

                    <View style={styles.switchContainer}>
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
                </View>

                {/* SAIR */}

                <TouchableOpacity style={styles.botaoSair}>
                    <Text style={styles.textoSair}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

/* COMPONENTE DOS CAMPOS DE EDIÇÃO */

function CampoEdicao({
    titulo,
    valor,
    onChangeText,
    colors,
    multiline = false,
    keyboardType = "default",
}: any) {
    return (
        <View style={styles.campoEdicao}>
            <Text
                style={[
                    styles.labelEdicao,
                    { color: colors.text },
                ]}
            >
                {titulo}
            </Text>

            <TextInput
                value={valor}
                onChangeText={onChangeText}
                multiline={multiline}
                keyboardType={keyboardType}
                placeholderTextColor={colors.secondary}
                style={[
                    styles.inputEdicao,
                    {
                        color: colors.text,
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                    },
                    multiline && styles.inputMultiline,
                ]}
            />
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
                    size={21}
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
        paddingTop: 75,
        paddingBottom: 110,
    },

    /* TÍTULO */

    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },

    /* CARD RESTAURANTE */

    restaurante: {
        minHeight: 125,
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    logoRestaurante: {
        width: 92,
        height: 92,
        borderRadius: 46,
        resizeMode: "cover",
        flexShrink: 0,
    },

    infoRestaurante: {
        flex: 1,
        marginLeft: 15,
    },

    label: {
        fontSize: 12,
        marginBottom: 3,
    },

    nomeLinha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    nome: {
        fontSize: 18,
        fontWeight: "bold",
    },

    descricao: {
        fontSize: 12,
        lineHeight: 16,
        marginTop: 5,
    },

    statusLinha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        marginTop: 8,
    },

    status: {
        backgroundColor: "#4C914A",
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 4,
    },

    statusTexto: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "600",
    },

    data: {
        fontSize: 10,
    },

    cadeado: {
        alignSelf: "flex-start",
        marginLeft: 5,
    },

    /* TÍTULO DA SEÇÃO */

    tituloSecao: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 28,
        marginBottom: 15,
    },

    tituloVerde: {
        fontSize: 17,
        fontWeight: "bold",
    },

    /* CARD DE DADOS */

    cardDados: {
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },

    linhaInfo: {
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 9,
    },

    ladoEsquerdo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
        paddingRight: 10,
    },

    nomeInfo: {
        fontSize: 14,
        fontWeight: "600",
        flexShrink: 1,
    },

    valorInfo: {
        fontSize: 14,
        textAlign: "right",
        maxWidth: "55%",
        lineHeight: 19,
    },

    /* EDIÇÃO */

    campoEdicao: {
        marginBottom: 15,
    },

    labelEdicao: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 7,
    },

    inputEdicao: {
        minHeight: 48,
        borderWidth: 1,
        borderRadius: 9,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
    },

    inputMultiline: {
        minHeight: 75,
        textAlignVertical: "top",
    },

    botoesEdicao: {
        flexDirection: "row",
        gap: 10,
        marginTop: 5,
    },

    botaoCancelar: {
        flex: 1,
        height: 48,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#C94C4C",
        justifyContent: "center",
        alignItems: "center",
    },

    textoCancelar: {
        color: "#C94C4C",
        fontSize: 13,
        fontWeight: "600",
    },

    botaoSalvar: {
        flex: 1,
        height: 48,
        borderRadius: 9,
        backgroundColor: "#2F6B4F",
        justifyContent: "center",
        alignItems: "center",
    },

    textoSalvar: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },

    /* MODO ESCURO */

    modoEscuro: {
        minHeight: 58,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    modoTexto: {
        fontSize: 15,
        fontWeight: "bold",
    },
    
    switchContainer: {
        height: 72,
        justifyContent: "center",
        alignItems: "center",
    },

    /* SAIR */

    botaoSair: {
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#E85B5B",
        marginTop: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    textoSair: {
        color: "#E85B5B",
        fontSize: 14,
        fontWeight: "600",
    },
});