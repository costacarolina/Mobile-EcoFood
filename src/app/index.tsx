import { Ionicons } from "@expo/vector-icons";
import {
  Image, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>


        <Text style={styles.titulo}>Bem vindo de volta!</Text>
        <Text style={styles.subtitulo}>
          Entre na sua conta para continuar.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#1f5132"
              style={styles.icon}
            />
            <TextInput
              placeholder="Digite seu email"
              placeholderTextColor="#9e9e9e"
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Senha</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#1f5132"
              style={styles.icon}
            />
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#9e9e9e"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.esqueciSenha}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.cardCadastro}>
          <Text style={styles.textoCadastro}>
            Ainda não possui uma conta?
          </Text>

          <Text style={styles.linkCadastro}>
            Cadastre seu restaurante
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  topSection: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 30,
  },

  logo: {
    width: 240,
    height: 120,
    marginBottom: 20,
  },

  titulo: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1f5b2f",
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 50,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f5b2f",
    marginBottom: 8,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 58,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  esqueciSenha: {
    textAlign: "right",
    color: "#1f5b2f",
    fontWeight: "600",
    marginBottom: 35,
  },

  botao: {
    backgroundColor: "#2f7b42",
    height: 58,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  bottomSection: {
    height: 220,
    backgroundColor: "#c8d8ca",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  cardCadastro: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  textoCadastro: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },

  linkCadastro: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f5b2f",
    marginTop: 5,
  },
});
