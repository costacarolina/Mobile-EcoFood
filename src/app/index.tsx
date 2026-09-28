import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
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
      style={styles.container}
    >
      <View style={styles.topSection}>

        {/* LOGO ECOFOOD */}
        <Image
          source={require("../../assets/images/logoecofood/logoecofood.png")}
          style={styles.logo}
        />

        {/* TÍTULO */}
        <Text style={styles.titulo}>
          Bem vindo de volta!
        </Text>

        <Text style={styles.subtitulo}>
          Entre na sua conta para continuar.
        </Text>

        {/* FORMULÁRIO */}
        <View style={styles.form}>

          <Text style={styles.label}>
            E-mail
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#1f5b2f"
              style={styles.icon}
            />

            <TextInput
              placeholder="Digite seu email"
              placeholderTextColor="#9e9e9e"
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>
            Senha
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#1f5b2f"
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

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.textoBotao}>
              ENTRAR
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* CADASTRO */}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 32,
  },

  logo: {
    width: 210,
    height: 105,
    resizeMode: "contain",
    marginBottom: 8,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f5b2f",
    marginBottom: 2,
  },

  subtitulo: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 50,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1f5b2f",
    marginBottom: 7,
    marginTop: 9,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,

    elevation: 2,
  },

  icon: {
    marginRight: 9,
  },

  input: {
    flex: 1,
    fontSize: 13,
  },

  esqueciSenha: {
    textAlign: "right",
    color: "#1f5b2f",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 1,
    marginBottom: 28,
  },

  botao: {
    backgroundColor: "#2f7b42",
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  bottomSection: {
    height: 190,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 35,
  },

  cardCadastro: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  textoCadastro: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111111",
  },

  linkCadastro: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f5b2f",
    marginTop: 5,
  },
});