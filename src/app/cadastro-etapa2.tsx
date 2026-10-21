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

const handleCadastro = () => {
  if (senha !== confirmarSenha) {
    alert("As senhas não conferem.");
    return;
  }

  Cadastro({ nome, endereco, telefone, cnpj, email, senha })
    .then(() => {
      alert("Cadastro realizado!");
      router.replace("/");
    })
    .catch((error) => {
      alert(error.response?.data?.error ?? "Falha no cadastro.");
    });
};
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
          <Text style={styles.label}>Nome do responsável</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={22} color="#234f32" />
            <TextInput
              placeholder="Ex.: Rafael Mendes"
              placeholderTextColor="#9a9a9a"
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color="#234f32" />
            <TextInput
              placeholder="Digite seu email"
              placeholderTextColor="#9a9a9a"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color="#234f32" />
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#9a9a9a"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Confirme sua senha</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color="#234f32" />
            <TextInput
              placeholder="Confirme sua senha"
              placeholderTextColor="#9a9a9a"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardLogin}>
          <Text style={styles.textoConta}>Já possui uma conta?</Text>
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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  botao: {
    width: "85%",
    height: 58,
    backgroundColor: "#2f7a42",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
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