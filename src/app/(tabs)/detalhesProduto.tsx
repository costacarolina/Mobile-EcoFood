import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../context/themeContext";

export default function DetalhesProduto() {
  const { darkMode } = useTheme();

  const params = useLocalSearchParams<{
    id?: string;
    nome?: string;
    categoria?: string;          // <-- Adicionado para receber
    localArmazenamento?: string; // <-- Adicionado para receber
    validade?: string;
    quantidade?: string;
    dias?: string;
  }>();

  // Função de emoji que você já gosta
  function getEmojiParaProduto(nomeProduto: string, localArmazenamento: string) {
    const nome = nomeProduto ? nomeProduto.toLowerCase() : "";
    if (nome.includes("banana")) return "🍌";
    if (nome.includes("maçã") || nome.includes("maca")) return "🍎";
    if (nome.includes("tomate")) return "🍅";
    if (nome.includes("alface") || nome.includes("salada")) return "🥬";
    if (nome.includes("frango") || nome.includes("peito")) return "🍗";
    if (nome.includes("carne") || nome.includes("bife") || nome.includes("boi")) return "🥩";
    if (nome.includes("arroz")) return "🍚";
    if (nome.includes("feijão") || nome.includes("feijao")) return "🫘";
    if (nome.includes("leite")) return "🥛";
    if (nome.includes("queijo")) return "🧀";
    if (nome.includes("ovo")) return "🥚";

    const localUpper = localArmazenamento ? localArmazenamento.toUpperCase() : "";
    if (localUpper.includes("GELADEIRA")) return "🥗";
    if (localUpper.includes("FREEZER")) return "🥩";
    if (localUpper.includes("DESPENSA")) return "🍚";
    return "📦";
  }

  const nomeProduto = params.nome || "Produto";
  const localParam = params.localArmazenamento || "Geladeira";
  const categoriaParam = params.categoria || "Geral";
  const emojiProduto = getEmojiParaProduto(nomeProduto, localParam);
  
  const validadeProduto = params.validade || "10/08/2026";
  const quantidadeProduto = params.quantidade
    ? params.quantidade.replace(/^Estoque:\s*/i, "")
    : "1";
  const diasProduto = params.dias || "0 dias";

  const [editando, setEditando] = useState(false);
  const [status, setStatus] = useState("Próximo do vencimento");
  const [quantidade, setQuantidade] = useState(quantidadeProduto);
  
  // Aqui entram os estados com os valores reais que vieram da tela anterior:
  const [categoria, setCategoria] = useState(categoriaParam);
  const [local, setLocal] = useState(localParam);
  
  const [validade, setValidade] = useState(validadeProduto);

  function salvarEdicao() {
    setEditando(false);
    Alert.alert(
      "Produto atualizado",
      "As informações do produto foram alteradas com sucesso."
    );
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
          styles.linhaInformacao,
          { borderBottomColor: darkMode ? "#444444" : "#D8D8D8" },
          ultimaLinha && styles.ultimaLinha,
        ]}
      >
        <Text
          style={[
            styles.nomeCampo,
            { color: darkMode ? "#EEEEEE" : "#111111" },
          ]}
        >
          {titulo}
        </Text>

        {editando ? (
          <TextInput
            value={valor}
            onChangeText={alterar}
            placeholderTextColor={darkMode ? "#AAAAAA" : "#888888"}
            style={[
              styles.inputEdicao,
              {
                color: darkMode ? "#FFFFFF" : "#111111",
                borderBottomColor: darkMode ? "#8BC9A1" : "#145C36",
              },
            ]}
          />
        ) : (
          <Text
            style={[
              styles.valorCampo,
              { color: darkMode ? "#EEEEEE" : "#111111" },
            ]}
          >
            {valor}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#FFFFFF" },
      ]}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={darkMode ? "#121212" : "#FFFFFF"}
      />

      <View
        style={[
          styles.cabecalho,
          { backgroundColor: darkMode ? "#121212" : "#FFFFFF" },
        ]}
      >
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={darkMode ? "#FFFFFF" : "#111111"}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.tituloCabecalho,
            { color: darkMode ? "#C1E3CC" : "#173B2C" },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Detalhes do Produto
        </Text>

        <View style={styles.espacoCabecalho} />
      </View>

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoInterno}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.cardProduto,
            {
              backgroundColor: darkMode ? "#252525" : "#FFFFFF",
              shadowColor: darkMode ? "#000000" : "#000000",
            },
          ]}
        >
          <View
            style={[
              styles.areaImagem,
              { backgroundColor: darkMode ? "#38352C" : "#F4F0E6" },
            ]}
          >
            <Text style={styles.emojiTomate}>{emojiProduto}</Text>
          </View>

          <View style={styles.infoProduto}>
            <Text
              style={[
                styles.nomeProduto,
                { color: darkMode ? "#FFFFFF" : "#171717" },
              ]}
            >
              {nomeProduto}
            </Text>

            <Text style={styles.avisoValidade}>
              {status} ({diasProduto})
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.cardInformacoes,
            { backgroundColor: darkMode ? "#252525" : "#FFFFFF" },
          ]}
        >
          {campo("Quantidade", quantidade, setQuantidade)}
          {campo("Categoria", categoria, setCategoria)}
          {campo("Local", local, setLocal)}

          <View
            style={[
              styles.linhaInformacao,
              { borderBottomColor: darkMode ? "#444444" : "#D8D8D8" },
            ]}
          >
            <Text
              style={[
                styles.nomeCampo,
                { color: darkMode ? "#EEEEEE" : "#111111" },
              ]}
            >
              Data de validade
            </Text>

            {editando ? (
              <TextInput
                value={validade}
                onChangeText={setValidade}
                placeholderTextColor={darkMode ? "#AAAAAA" : "#888888"}
                style={[
                  styles.inputEdicao,
                  {
                    color: darkMode ? "#FFFFFF" : "#111111",
                    borderBottomColor: darkMode ? "#8BC9A1" : "#145C36",
                  },
                ]}
              />
            ) : (
              <Text
                style={[
                  styles.valorCampo,
                  { color: darkMode ? "#EEEEEE" : "#111111" },
                ]}
              >
                {validade}
              </Text>
            )}
          </View>

          <View
            style={[
              styles.linhaInformacao,
              styles.ultimaLinha,
              { borderBottomColor: darkMode ? "#444444" : "#D8D8D8" },
            ]}
          >
            <Text
              style={[
                styles.nomeCampo,
                { color: darkMode ? "#EEEEEE" : "#111111" },
              ]}
            >
              Cadastro em
            </Text>

            <Text
              style={[
                styles.valorCampo,
                { color: darkMode ? "#EEEEEE" : "#111111" },
              ]}
            >
              {new Date().toLocaleDateString("pt-BR")}
            </Text>
          </View>
        </View>

        <View style={styles.areaBotoes}>
          <TouchableOpacity
            style={[
              styles.botaoEditar,
              { backgroundColor: darkMode ? "#252525" : "#FFFFFF" },
            ]}
            onPress={() => {
              if (editando) {
                salvarEdicao();
              } else {
                setEditando(true);
              }
            }}
          >
            <Text
              style={[
                styles.textoBotaoEditar,
                { color: darkMode ? "#FFFFFF" : "#111111" },
              ]}
            >
              {editando ? "Salvar" : "Editar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
    style={styles.botaoStatus}
    onPress={() => router.push({
      pathname: "/status",
      params: {
        id: params.id,
        nome: nomeProduto,
        localArmazenamento: local,
        dias: params.dias
      }
    })}
  >
    <Text style={styles.textoBotaoStatus}>Status</Text>
  </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    marginTop: 4,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  areaImagem: {
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: "#F4F0E6",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiTomate: {
    fontSize: 48,
  },
  infoProduto: {
    flex: 1,
    marginLeft: 12,
  },
  nomeProduto: {
    fontSize: 19,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 5,
  },
  avisoValidade: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF2929",
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
});