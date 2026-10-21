import { Login } from "@/api/post-login";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => { 
      Login(email, senha)
        .then((response) => {
          console.log("Login bem-sucedido:", response);
          router.replace("/(tabs)");
        })
        .catch((error) => {
          alert("Falha no login. Verifique suas credenciais.");
        });
    }

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

        
        <Image
          source={require("../../assets/images/logoecofood/logoecofood.png")}
          style={styles.logo}
        />

      
        <Text style={styles.titulo}>
          Bem vindo de volta!
        </Text>

        <Text style={styles.subtitulo}>
          Entre na sua conta para continuar.
        </Text>

        
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
              value={email}
              onChangeText={setEmail}
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
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.esqueciSenha}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={handleLogin}
          >
            <Text style={styles.textoBotao}>
              ENTRAR
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      
      <View style={styles.bottomSection}>

        <TouchableOpacity style={styles.cardCadastro}>

          <Text style={styles.textoCadastro}>
            Ainda não possui uma conta?
          </Text>
          
          <TouchableOpacity onPress={() => router.push("/cadastro-etapa1")}>
          <Text style={styles.linkCadastro}>
              Cadastre seu restaurante
          </Text>
</TouchableOpacity>

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
    paddingTop: 35,
    paddingHorizontal: 28,
  },

  logo: {
    width: 240,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },

  titulo: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1f5b2f",
    marginBottom: 5,
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 35,
    textAlign: "center",
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f5b2f",
    marginBottom: 8,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 54,
    marginBottom: 10,

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
    marginRight: 11,
  },

  input: {
    flex: 1,
    fontSize: 15,
  },

  esqueciSenha: {
    textAlign: "right",
    color: "#1f5b2f",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3,
    marginBottom: 22,
  },

  botao: {
    backgroundColor: "#2f7b42",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  bottomSection: {
    minHeight: 145,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 15,
    paddingBottom: 20,
  },

  cardCadastro: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textoCadastro: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
    textAlign: "center",
  },

  linkCadastro: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f5b2f",
    marginTop: 7,
    textAlign: "center",
  },
});