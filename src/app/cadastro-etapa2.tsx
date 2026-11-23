
import { Ionicons } from "@expo/vector-icons";
import { Cadastro } from "@/api/post-cadastro";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CadastroEtapa2() {
  const { nome, endereco, telefone, cnpj } = useLocalSearchParams<{
    nome: string;
    endereco: string;
    telefone: string;
    cnpj: string;
  }>();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Validação do e-mail
  const emailValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Requisitos da senha
  const temOitoCaracteres = senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const temSimbolo = /[^A-Za-z0-9]/.test(senha);

  // Confirmação da senha
  const senhasConferem =
    confirmarSenha.length > 0 && senha === confirmarSenha;

  const senhaValida =
    temOitoCaracteres &&
    temMaiuscula &&
    temNumero &&
    temSimbolo;

  const handleCadastro = () => {
    if (!emailValido) {
      Alert.alert("E-mail inválido", "Digite um endereço de e-mail válido.");
      return;
    }

    if (!senhaValida) {
      Alert.alert(
        "Senha inválida",
        "A senha precisa cumprir todos os requisitos."
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Senhas diferentes", "As senhas não conferem.");
      return;
    }

    Cadastro({
      nome,
      endereco,
      telefone,
      cnpj,
      email: email.trim(),
      senha,
    })
      .then(() => {
        Alert.alert(
          "Sucesso!",
          "Cadastro realizado com sucesso!",
          [
            {
              text: "OK",
              onPress: () => router.replace("/"),
            },
          ]
        );
      })
      .catch((error) => {
        Alert.alert(
          "Erro",
          error.response?.data?.error ?? "Falha no cadastro."
        );
      });
  };

  // Componente dos requisitos da senha
  const Requisito = ({
    valido,
    texto,
  }: {
    valido: boolean;
    texto: string;
  }) => (
    <View style={styles.requisito}>
      <Ionicons
        name={valido ? "checkmark-circle" : "ellipse-outline"}
        size={17}
        color={valido ? "#2f7a42" : "#999"}
      />
      <Text
        style={[
          styles.textoRequisito,
          valido && styles.requisitoValido,
        ]}
      >
        {texto}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#F4F8F4",
        "#DCEBDD",
        "#A8C9AD",
        "#3f7045",
      ]}
      locations={[0, 0.35, 0.52, 0.63, 0.76, 0.9, 1]}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/images/logoecofood/logoecofood.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.etapa}>2 de 2</Text>
        <Text style={styles.subtitulo}>Dados de acesso</Text>

        <View style={styles.barra}>
          <View style={styles.progresso} />
        </View>

        <View style={styles.form}>
          {/* E-MAIL */}
          <Text style={styles.label}>E-mail</Text>

          <View
            style={[
              styles.inputContainer,
              email.length > 0 &&
              !emailValido &&
              styles.inputErro,
              emailValido && styles.inputSucesso,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={22}
              color="#234f32"
            />

            <TextInput
              placeholder="Digite seu e-mail"
              placeholderTextColor="#9a9a9a"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />

            {email.length > 0 && (
              <Ionicons
                name={
                  emailValido
                    ? "checkmark-circle"
                    : "alert-circle"
                }
                size={20}
                color={emailValido ? "#2f7a42" : "#d9534f"}
              />
            )}
          </View>

          {email.length > 0 && !emailValido && (
            <Text style={styles.erro}>
              Digite um e-mail válido.
            </Text>
          )}

          {/* SENHA */}
          <Text style={styles.label}>Senha</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#234f32"
            />

            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#9a9a9a"
              secureTextEntry
              autoCapitalize="none"
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
            />
          </View>

          {/* REQUISITOS */}
          <View style={styles.requisitosContainer}>
            <Text style={styles.tituloRequisitos}>
              Sua senha deve conter:
            </Text>

            <Requisito
              valido={temOitoCaracteres}
              texto="Pelo menos 8 caracteres"
            />

            <Requisito
              valido={temMaiuscula}
              texto="Uma letra maiúscula"
            />

            <Requisito
              valido={temNumero}
              texto="Pelo menos um número"
            />

            <Requisito
              valido={temSimbolo}
              texto="Pelo menos um símbolo especial (@, #, !...)"
            />
          </View>

          {/* CONFIRMAR SENHA */}
          <Text style={styles.label}>Confirme sua senha</Text>

          <View
            style={[
              styles.inputContainer,
              confirmarSenha.length > 0 &&
              (senhasConferem
                ? styles.inputSucesso
                : styles.inputErro),
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#234f32"
            />

            <TextInput
              placeholder="Confirme sua senha"
              placeholderTextColor="#9a9a9a"
              secureTextEntry
              autoCapitalize="none"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              style={styles.input}
            />

            {confirmarSenha.length > 0 && (
              <Ionicons
                name={
                  senhasConferem
                    ? "checkmark-circle"
                    : "close-circle"
                }
                size={20}
                color={
                  senhasConferem ? "#2f7a42" : "#d9534f"
                }
              />
            )}
          </View>

          {confirmarSenha.length > 0 && !senhasConferem && (
            <Text style={styles.erro}>
              As senhas não coincidem.
            </Text>
          )}
        </View>

        {/* BOTÃO CADASTRAR */}
        <TouchableOpacity
          style={[
            styles.botao,
            !emailValido ||
              !senhaValida ||
              !senhasConferem
              ? styles.botaoDesabilitado
              : null,
          ]}
          onPress={handleCadastro}
          disabled={
            !emailValido ||
            !senhaValida ||
            !senhasConferem
          }
        >
          <Text style={styles.textoBotao}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardLogin}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.textoConta}>
            Já possui uma conta?
          </Text>
          <Text style={styles.linkEntrar}>Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 30,
  },

  logo: {
    width: 145,
    height: 95,
  },

  etapa: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f5a34",
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 18,
    color: "#808080",
    fontWeight: "600",
    marginBottom: 10,
  },

  barra: {
    width: "85%",
    height: 6,
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    marginBottom: 30,
  },

  progresso: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1f5a34",
    borderRadius: 10,
  },

  form: {
    width: "100%",
  },

  label: {
    color: "#1f5a34",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 12,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 58,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "transparent",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  inputErro: {
    borderColor: "#d9534f",
  },

  inputSucesso: {
    borderColor: "#2f7a42",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#222",
  },

  requisitosContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
  },

  tituloRequisitos: {
    color: "#1f5a34",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },

  requisito: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },

  textoRequisito: {
    fontSize: 13,
    color: "#888",
  },

  requisitoValido: {
    color: "#2f7a42",
    fontWeight: "600",
  },

  erro: {
    color: "#d9534f",
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 5,
  },

  botao: {
    width: "85%",
    height: 58,
    backgroundColor: "#2f7a42",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },

  botaoDesabilitado: {
    backgroundColor: "#8da994",
    opacity: 0.8,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  cardLogin: {
    width: "90%",
    backgroundColor: "#fffdf8",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
    marginTop: 40,
  },

  textoConta: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  linkEntrar: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f5a34",
    marginTop: 4,
  },
});
