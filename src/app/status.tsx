import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  atualizarStatusProduto,
  StatusProduto,
} from "../api/patch-status-produto";

type EtapaModal = null | "quantidade" | "lista";

export default function Status() {
  const params = useLocalSearchParams<{
    id?: string;
    nome?: string;
    categoria?: string;
    localArmazenamento?: string;
    unidade?: string;
    quantidadeDisponivel?: string;
    dias?: string;
  }>();

  const nomeProduto = params.nome || "Produto";
  const unidade = params.unidade || "un";
  const quantidadeDisponivel = Number(params.quantidadeDisponivel ?? 0);

  const [statusSelecionado, setStatusSelecionado] =
    useState<StatusProduto | null>(null);

  const [etapa, setEtapa] = useState<EtapaModal>(null);
  const [quantidadeTexto, setQuantidadeTexto] = useState("");
  const [erroQuantidade, setErroQuantidade] = useState("");
  const [quantidadeUtilizada, setQuantidadeUtilizada] = useState(0);
  const [enviando, setEnviando] = useState(false);

  // 1) Ao concluir, pergunta a quantidade utilizada (vale para aproveitado e não aproveitado)
  function concluir() {
    if (!statusSelecionado) {
      Alert.alert("Atenção", "Selecione o status do produto antes de concluir.");
      return;
    }
    setQuantidadeTexto("");
    setErroQuantidade("");
    setEtapa("quantidade");
  }

  function confirmarQuantidade() {
    const valor = Number(quantidadeTexto.replace(",", "."));

    if (!quantidadeTexto.trim() || !Number.isFinite(valor) || valor <= 0) {
      setErroQuantidade("Informe uma quantidade maior que zero.");
      return;
    }

    if (valor > quantidadeDisponivel) {
      setErroQuantidade(
        `A quantidade não pode ser maior que o estoque (${quantidadeDisponivel} ${unidade}).`
      );
      return;
    }

    setQuantidadeUtilizada(valor);
    setEtapa("lista");
  }

  // 2) Com a resposta sobre a lista de compras, envia tudo de uma vez ao backend
  async function registrar(adicionarListaCompra: boolean) {
    if (!statusSelecionado || !params.id) return;

    try {
      setEnviando(true);

      const resultado = await atualizarStatusProduto(
        params.id,
        statusSelecionado,
        quantidadeUtilizada,
        adicionarListaCompra
      );

      setEtapa(null);

      const textoStatus =
        statusSelecionado === "APROVEITADO"
          ? `${nomeProduto} foi marcado como aproveitado.`
          : `${nomeProduto} foi marcado como não aproveitado.`;

      let textoLista = "";
      if (adicionarListaCompra) {
        textoLista = resultado.listaCompra.jaExistia
          ? "\n\nEle já estava na lista de compras."
          : "\n\nAdicionado à lista de compras.";
      }

      Alert.alert(
        "Status atualizado",
        `${textoStatus}\nQuantidade registrada: ${quantidadeUtilizada} ${unidade}.${textoLista}`,
        [
          {
            text: "OK",
            // O produto saiu do estoque ativo, então volta para a lista do estoque
            onPress: () => router.replace("/(tabs)/estoque"),
          },
        ]
      );
    } catch (erro: any) {
      console.log("Erro ao atualizar status:", erro.response?.data || erro.message);
      setEtapa(null);
      Alert.alert(
        "Erro",
        erro.response?.data?.error ?? "Não foi possível atualizar o status. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  const textoDias = params.dias ? `Vence em ${params.dias}` : "Próximo do vencimento";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.cabecalho}>
        <View style={styles.linhaTitulo}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            accessibilityLabel="Voltar para detalhes"
          >
            <Ionicons name="arrow-back" size={23} color="#222222" />
          </TouchableOpacity>

          <Text style={styles.tituloCabecalho}>Status do Produto</Text>

          <View style={styles.espacoCabecalho} />
        </View>
      </View>

      <View style={styles.cartaoProduto}>
        <View style={styles.imagemTomate}>
          <Text style={styles.emojiTomate}>📦</Text>
        </View>

        <View style={styles.informacoesProduto}>
          <Text style={styles.nomeProduto}>{nomeProduto}</Text>

          <Text style={styles.avisoVencimento}>{textoDias}</Text>

          <Text style={styles.estoqueDisponivel}>
            Em estoque: {quantidadeDisponivel} {unidade}
          </Text>
        </View>
      </View>

      <View style={styles.cartaoStatus}>
        <Text style={styles.tituloStatus}>Status</Text>

        <TouchableOpacity
          style={[
            styles.opcaoStatus,
            statusSelecionado === "APROVEITADO" && styles.opcaoSelecionada,
          ]}
          onPress={() => setStatusSelecionado("APROVEITADO")}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.radio,
              statusSelecionado === "APROVEITADO" && styles.radioSelecionado,
            ]}
          >
            {statusSelecionado === "APROVEITADO" && (
              <View style={styles.radioInterno} />
            )}
          </View>

          <Text style={styles.textoAproveitado}>Aproveitado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcaoStatus,
            styles.segundaOpcao,
            statusSelecionado === "NAO_APROVEITADO" && styles.opcaoSelecionada,
          ]}
          onPress={() => setStatusSelecionado("NAO_APROVEITADO")}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.radio,
              statusSelecionado === "NAO_APROVEITADO" && styles.radioSelecionado,
            ]}
          >
            {statusSelecionado === "NAO_APROVEITADO" && (
              <View style={styles.radioInterno} />
            )}
          </View>

          <Text style={styles.textoNaoAproveitado}>Não Aproveitado</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoConcluir}
        onPress={concluir}
        activeOpacity={0.85}
      >
        <Text style={styles.textoBotaoConcluir}>Concluir</Text>
      </TouchableOpacity>

      {/* ETAPA 1: quantidade utilizada */}
      <Modal
        visible={etapa === "quantidade"}
        transparent
        animationType="fade"
        onRequestClose={() => setEtapa(null)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.conteudoModal}>
            <Text style={styles.tituloModal}>Quantidade utilizada</Text>

            <Text style={styles.textoModal}>
              Quanto de {nomeProduto} foi utilizado? Disponível: {quantidadeDisponivel} {unidade}.
            </Text>

            <View style={styles.campoLinha}>
              <TextInput
                value={quantidadeTexto}
                onChangeText={(texto) => {
                  setQuantidadeTexto(texto);
                  setErroQuantidade("");
                }}
                placeholder={`Ex.: 1,5 (${unidade})`}
                placeholderTextColor="#888888"
                keyboardType="decimal-pad"
                style={styles.campo}
                autoFocus
              />
              <Text style={styles.unidadeCampo}>{unidade}</Text>
            </View>

            {erroQuantidade !== "" && (
              <Text style={styles.textoErro}>{erroQuantidade}</Text>
            )}

            <View style={styles.linhaBotoes}>
              <TouchableOpacity
                style={[styles.botaoModal, styles.botaoSecundario]}
                onPress={() => setEtapa(null)}
              >
                <Text style={styles.textoBotaoSecundario}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botaoModal, styles.botaoPrimario]}
                onPress={confirmarQuantidade}
              >
                <Text style={styles.textoBotaoPrimario}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ETAPA 2: adicionar à lista de compras? (vale para aproveitado e não aproveitado) */}
      <Modal
        visible={etapa === "lista"}
        transparent
        animationType="fade"
        onRequestClose={() => !enviando && setEtapa(null)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.conteudoModal}>
            <Text style={styles.tituloModal}>Lista de compras</Text>

            <Text style={styles.textoModal}>
              Deseja adicionar {nomeProduto} à lista de compras?
            </Text>

            {enviando ? (
              <ActivityIndicator
                size="large"
                color="#1B5E3B"
                style={{ marginTop: 16 }}
              />
            ) : (
              <View style={styles.linhaBotoes}>
                <TouchableOpacity
                  style={[styles.botaoModal, styles.botaoSecundario]}
                  onPress={() => registrar(false)}
                >
                  <Text style={styles.textoBotaoSecundario}>Não</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botaoModal, styles.botaoPrimario]}
                  onPress={() => registrar(true)}
                >
                  <Text style={styles.textoBotaoPrimario}>Sim</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  estoqueDisponivel: {
    fontSize: 13,
    color: "#555555",
    marginTop: 4,
  },

  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 22,
  },

  conteudoModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
  },

  tituloModal: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 10,
  },

  textoModal: {
    fontSize: 14,
    color: "#444444",
    lineHeight: 20,
  },

  campoLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },

  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111111",
  },

  unidadeCampo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#173B2C",
  },

  textoErro: {
    color: "#D51E1E",
    fontSize: 13,
    marginTop: 8,
  },

  linhaBotoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  botaoModal: {
    flex: 1,
    height: 46,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoSecundario: {
    backgroundColor: "#EEEEEE",
  },

  botaoPrimario: {
    backgroundColor: "#1B5E3B",
  },

  textoBotaoSecundario: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
  },

  textoBotaoPrimario: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  cabecalho: {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#DDDDDD",
  paddingTop: 55,
},

linhaTitulo: {
  height: 55,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

  botaoVoltar: {
    width: 55,
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
  },

  tituloCabecalho: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
  },

  espacoCabecalho: {
    width: 55,
  },

  cartaoProduto: {
  marginHorizontal: 10,
  marginTop: 10,
  minHeight: 105,
  borderRadius: 12,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 15,
  paddingVertical: 12,

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

  imagemTomate: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },

  emojiTomate: {
    fontSize: 48,
  },

  informacoesProduto: {
    flex: 1,
    marginLeft: 12,
  },

  nomeProduto: {
    fontSize: 19,
    fontWeight: "600",
    color: "#171717",
  },

  avisoVencimento: {
    fontSize: 14,
    color: "#FF2929",
    fontWeight: "600",
    marginTop: 5,
  },

  cartaoStatus: {
    marginHorizontal: 18,
    marginTop: 28,
    backgroundColor: "#F4F0E6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.13,
    shadowRadius: 5,
    elevation: 4,
  },

  tituloStatus: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 18,
  },

  opcaoStatus: {
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  segundaOpcao: {
    marginTop: 16,
  },

  opcaoSelecionada: {
    borderWidth: 1.5,
    borderColor: "#B7C9B5",
  },

  radio: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#777777",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  radioSelecionado: {
    borderColor: "#173B2C",
  },

  radioInterno: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#173B2C",
  },

  textoAproveitado: {
    fontSize: 14,
    color: "#218C36",
    fontWeight: "500",
  },

  textoNaoAproveitado: {
    fontSize: 14,
    color: "#D51E1E",
    fontWeight: "500",
  },

  botaoConcluir: {
    alignSelf: "center",
    width: "72%",
    minHeight: 52,
    marginTop: 38,
    backgroundColor: "#1B5E3B",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  textoBotaoConcluir: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  menuInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
    backgroundColor: "#FFFDF8",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 2,
  },

  itemMenu: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  textoMenu: {
    fontSize: 11,
    color: "#173B2C",
    marginTop: 4,
    fontWeight: "600",
  },

  botaoAdicionar: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#C59B45",
    alignItems: "center",
    justifyContent: "center",
  },
});