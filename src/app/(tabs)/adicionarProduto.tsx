import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useTheme } from "@/../context/themeContext";
import { getUsuario } from "@/lib/session";
import { criarProduto } from "../../api/post-produto";

export default function AdicionarProduto() {
  const { darkMode } = useTheme();

  const [modo, setModo] = useState<"codigo" | "manual">("codigo");

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("kg");
  const [validade, setValidade] = useState("");
  const [fornecedor, setFornecedor] = useState("");

  // Estado para controlar o botão de salvar e os modais
  const [salvando, setSalvando] = useState(false);
  const [modalCategoria, setModalCategoria] = useState(false);
  const [modalLocal, setModalLocal] = useState(false);

  const colors = darkMode
    ? {
      background: "#181818",
      card: "#2B2B2B",
      text: "#FFFFFF",
      secondary: "#BDBDBD",
      border: "#444444",
      green: "#A5D6A7",
      greenDark: "#2F6B4F",
      input: "#242424",
    }
    : {
      background: "#FFFDF8",
      card: "#FFFFFF",
      text: "#171717",
      secondary: "#888888",
      border: "#DDDDDD",
      green: "#2F6B4F",
      greenDark: "#2F6B4F",
      input: "#FFFFFF",
    };

  function limparFormulario() {
    setNome("");
    setCategoria("");
    setLocal("");
    setQuantidade("");
    setUnidade("kg");
    setValidade("");
    setFornecedor("");
  }

  function formatarData(dataPtBR: string) {
    const partes = dataPtBR.split('/');
    if (partes.length === 3) {
      return new Date(`${partes[2]}-${partes[1]}-${partes[0]}T12:00:00Z`);
    }
    return undefined;
  }

  function aplicarMascaraData(texto: string) {
    let valor = texto.replace(/\D/g, "");
    if (valor.length > 2) valor = valor.replace(/^(\d{2})(\d)/, "$1/$2");
    if (valor.length > 5) valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    setValidade(valor.slice(0, 10));
  }

  async function salvarProduto() {

    if (!nome || !categoria || !local) {
      Alert.alert("Atenção", "Preencha pelo menos o Nome, Categoria e Local de armazenamento.");
      return;
    }

    try {
      setSalvando(true);

      let qtdeFormatada: number | undefined = undefined;
      if (quantidade) {
        const formatada = quantidade.replace(',', '.');
        qtdeFormatada = parseFloat(formatada);
      }

      let dataValidadeISO: string | undefined = undefined;
      if (validade && validade.length === 10) {
        const partes = validade.split('/'); 
        dataValidadeISO = new Date(`${partes[2]}-${partes[1]}-${partes[0]}T00:00:00.000Z`).toISOString();
      }

     
      const dados = {
        nome,
        categoria,
        localArmazenamento: local,
        quantidade: qtdeFormatada, 
        unidade,
        restauranteId: getUsuario()?.id ?? 1,
        dataValidade: dataValidadeISO 
      };

      await criarProduto(dados);

      Alert.alert(
        "Sucesso!",
        "Produto cadastrado no estoque com sucesso.",
        [
          {
            text: "OK",
            onPress: () => {
              limparFormulario();
              router.back();
            }
          }
        ]
      );

    } catch (error: any) {
      // Isto vai mostrar-nos no terminal exatamente qual campo o banco recusou!
      console.log("Erro completo:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível cadastrar o produto. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

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
        keyboardShouldPersistTaps="handled"
      >

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={30}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.titulo,
              {
                color: colors.text,
              },
            ]}
          >
            Adicionar Produto
          </Text>
        </View>

        {/* ABAS */}
        <View
          style={[
            styles.abas,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.aba,
              modo === "codigo" && styles.abaSelecionada,
            ]}
            onPress={() => setModo("codigo")}
          >
            <Text
              style={[
                styles.textoAba,
                {
                  color:
                    modo === "codigo"
                      ? "#FFFFFF"
                      : colors.text,
                },
              ]}
            >
              Código de barras
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.aba,
              modo === "manual" && styles.abaSelecionada,
            ]}
            onPress={() => setModo("manual")}
          >
            <Text
              style={[
                styles.textoAba,
                {
                  color:
                    modo === "manual"
                      ? "#FFFFFF"
                      : colors.text,
                },
              ]}
            >
              Manual
            </Text>
          </TouchableOpacity>
        </View>

        {/* CONTEÚDO */}
        {modo === "codigo" ? (
          <View style={styles.codigoContainer}>
            <TouchableOpacity
              style={[
                styles.areaCodigo,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => router.push("/scanner")}
            >
              {/* CANTOS */}
              <View
                style={[
                  styles.canto,
                  styles.cantoSuperiorEsquerdo,
                  {
                    borderColor: colors.green,
                  },
                ]}
              />

              <View
                style={[
                  styles.canto,
                  styles.cantoSuperiorDireito,
                  {
                    borderColor: colors.green,
                  },
                ]}
              />

              <View
                style={[
                  styles.canto,
                  styles.cantoInferiorEsquerdo,
                  {
                    borderColor: colors.green,
                  },
                ]}
              />

              <View
                style={[
                  styles.canto,
                  styles.cantoInferiorDireito,
                  {
                    borderColor: colors.green,
                  },
                ]}
              />

              <Ionicons
                name="barcode-outline"
                size={90}
                color={colors.secondary}
              />

              <Text
                style={[
                  styles.textoAreaCodigo,
                  {
                    color: colors.secondary,
                  },
                ]}
              >
                Toque para escanear
              </Text>
            </TouchableOpacity>

            <Text
              style={[
                styles.instrucao,
                {
                  color: colors.text,
                },
              ]}
            >
              Posicione o código de barras{"\n"}
              no centro da câmera.
            </Text>
          </View>
        ) : (
          <View style={styles.manualContainer}>
            {/* NOME */}
            <Text
              style={[
                styles.label,
                {
                  color: colors.green,
                },
              ]}
            >
              Nome do Produto
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.input,
                },
              ]}
            >
              <Ionicons
                name="cube-outline"
                size={23}
                color={colors.green}
              />

              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Ex.: Banana Maçã"
                placeholderTextColor={colors.secondary}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            {/* CATEGORIA */}
            <Text
              style={[
                styles.label,
                {
                  color: colors.green,
                },
              ]}
            >
              Categoria
            </Text>

            <TouchableOpacity
              style={[
                styles.inputContainer,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.input,
                },
              ]}
              onPress={() => setModalCategoria(true)}
            >
              <Ionicons
                name="pricetag-outline"
                size={23}
                color={colors.green}
              />

              <Text
                style={[
                  styles.placeholder,
                  {
                    color:
                      categoria !== ""
                        ? colors.text
                        : colors.secondary,
                  },
                ]}
              >
                {categoria || "Selecione a categoria"}
              </Text>

              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.secondary}
              />
            </TouchableOpacity>

            {/* LOCAL */}
            <Text
              style={[
                styles.label,
                {
                  color: colors.green,
                },
              ]}
            >
              Local do Armazenamento
            </Text>

            <TouchableOpacity
              style={[
                styles.inputContainer,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.input,
                },
              ]}
              onPress={() => setModalLocal(true)}
            >
              <Ionicons
                name="archive-outline"
                size={23}
                color={colors.green}
              />

              <Text
                style={[
                  styles.placeholder,
                  {
                    color:
                      local !== ""
                        ? colors.text
                        : colors.secondary,
                  },
                ]}
              >
                {local || "Selecione o local"}
              </Text>

              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.secondary}
              />
            </TouchableOpacity>

            {/* QUANTIDADE */}
            <Text
              style={[
                styles.label,
                {
                  color: colors.green,
                },
              ]}
            >
              Quantidade
            </Text>

            <View style={styles.quantidadeLinha}>
              <View
                style={[
                  styles.quantidadeInput,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.input,
                  },
                ]}
              >
                <Ionicons
                  name="calculator-outline"
                  size={23}
                  color={colors.green}
                />

                <TextInput
                  value={quantidade}
                  onChangeText={setQuantidade}
                  placeholder="Ex.: 2.5"
                  placeholderTextColor={colors.secondary}
                  keyboardType="decimal-pad"
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.unidade,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.input,
                  },
                ]}
                onPress={() => setUnidade(unidade === "kg" ? "un" : "kg")}
              >
                <Text
                  style={[
                    styles.textoUnidade,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {unidade}
                </Text>

                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>

            {/* VALIDADE */}
            <Text
              style={[
                styles.label,
                {
                  color: colors.green,
                },
              ]}
            >
              Data de Validade
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.input,
                },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={23}
                color={colors.green}
              />

              <TextInput
                value={validade}
                onChangeText={aplicarMascaraData}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.secondary}
                keyboardType="number-pad"
                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>

            {/* DATA DO CADASTRO */}
            <Text
              style={[
                styles.label,
                {
                  color: colors.green,
                },
              ]}
            >
              Data do Cadastro
            </Text>

            <View
              style={[
                styles.inputContainer,
                styles.inputDesabilitado,
                {
                  borderColor: colors.border,
                  backgroundColor: darkMode
                    ? "#202020"
                    : "#F0EFEC",
                },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={23}
                color={colors.green}
              />

              <Text
                style={[
                  styles.dataCadastro,
                  {
                    color: colors.secondary,
                  },
                ]}
              >
                {new Date().toLocaleDateString('pt-BR')}
              </Text>
            </View>

            {/* SALVAR */}
            <TouchableOpacity
              style={[
                styles.botaoSalvar,
                salvando && { opacity: 0.7 }
              ]}
              onPress={salvarProduto}
              disabled={salvando}
            >
              {salvando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.textoSalvar}>
                  SALVAR PRODUTO
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* --- MODAL DA CATEGORIA --- */}
      <Modal visible={modalCategoria} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalFundo}
          activeOpacity={1}
          onPress={() => setModalCategoria(false)}
        >
          <View style={[styles.modalConteudo, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.modalTitulo, { color: colors.text }]}>
              Selecione a Categoria
            </Text>

            {["Hortifruti", "Carnes", "Laticínios", "Bebidas", "Outros"].map((item, index, arr) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.modalItem,
                  { borderBottomColor: colors.border },
                  index === arr.length - 1 && { borderBottomWidth: 0 } // tira a borda do último
                ]}
                onPress={() => {
                  setCategoria(item);
                  setModalCategoria(false);
                }}
              >
                <Text style={[styles.modalItemTexto, { color: colors.text }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- MODAL DO LOCAL --- */}
      <Modal visible={modalLocal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalFundo}
          activeOpacity={1}
          onPress={() => setModalLocal(false)}
        >
          <View style={[styles.modalConteudo, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.modalTitulo, { color: colors.text }]}>
              Selecione o Local
            </Text>

            {["Geladeira", "Freezer", "Despensa"].map((item, index, arr) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.modalItem,
                  { borderBottomColor: colors.border },
                  index === arr.length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => {
                  setLocal(item);
                  setModalLocal(false);
                }}
              >
                <Text style={[styles.modalItemTexto, { color: colors.text }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },

  header: {
    minHeight: 58,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingVertical: 6,
  },

  botaoVoltar: {
    position: "absolute",
    left: -4,
    top: 8,
  },

  titulo: {
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    flexShrink: 1,
  },

  abas: {
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
    marginTop: 8,
  },

  aba: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  abaSelecionada: {
    backgroundColor: "#2F6B4F",
    borderRadius: 9,
  },

  textoAba: {
    fontSize: 14,
    fontWeight: "500",
  },

  codigoContainer: {
    alignItems: "center",
    paddingTop: 45,
  },

  areaCodigo: {
    width: "100%",
    height: 230,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
  },

  canto: {
    position: "absolute",
    width: 48,
    height: 48,
  },

  cantoSuperiorEsquerdo: {
    top: -1,
    left: -1,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 28,
  },

  cantoSuperiorDireito: {
    top: -1,
    right: -1,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 28,
  },

  cantoInferiorEsquerdo: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 28,
  },

  cantoInferiorDireito: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 28,
  },

  textoAreaCodigo: {
    fontSize: 15,
    marginTop: 10,
  },

  instrucao: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 34,
  },

  opcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 55,
  },

  opcao: {
    alignItems: "center",
  },

  iconeOpcao: {
    width: 62,
    height: 62,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  textoOpcao: {
    fontSize: 13,
    marginTop: 7,
  },

  manualContainer: {
    paddingTop: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
    marginLeft: 5,
  },

  inputContainer: {
    minHeight: 50,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },

  input: {
    flex: 1,
    fontSize: 15,
    marginLeft: 9,
  },

  placeholder: {
    flex: 1,
    fontSize: 14,
    marginLeft: 9,
  },

  quantidadeLinha: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 10,
  },

  quantidadeInput: {
    flex: 1,
    minHeight: 50,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  unidade: {
    width: 80,
    minHeight: 50,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  textoUnidade: {
    fontSize: 14,
  },

  inputDesabilitado: {
    shadowOpacity: 0,
    elevation: 0,
  },

  dataCadastro: {
    fontSize: 14,
    marginLeft: 9,
  },

  botaoSalvar: {
    height: 50,
    backgroundColor: "#005500",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 15,
  },

  textoSalvar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  /* NOVOS ESTILOS PARA OS MODAIS */
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalConteudo: {
    width: "80%",
    borderRadius: 15,
    borderWidth: 1,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },

  modalItemTexto: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});