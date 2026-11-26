
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function EsqueceuSenha() {
  return (
    <LinearGradient
      colors={[
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#F4F8F4",
        "#DCEBDD",
      ]}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("@/assets/images/logoecofood/logoecofood.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <Text style={styles.titulo}>
            Esqueceu a senha?
          </Text>

          <Text style={styles.descricao}>
            Insira o email de cadastro e enviaremos
            instruções para redefinir sua senha
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Endereço de email
            </Text>

            <TextInput
              placeholder=""
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>
              Continuar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Text style={styles.voltar}>
              Voltar para página de cadastro
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  logo: {
    width: 145,
    height: 95,
  },

  form: {
    width: "100%",
    minHeight: 485,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 40,
    paddingHorizontal: 28,
    paddingTop: 23,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 26,
    textAlign: "center",
  },

  descricao: {
    fontSize: 14,
    color: "#555555",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 82,
  },

  inputContainer: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 5,
    marginBottom: 55,
    justifyContent: "center",
  },

  label: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#888888",
  },

  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#333333",
  },

  botao: {
    width: "100%",
    height: 47,
    backgroundColor: "#306D52",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  voltar: {
    fontSize: 13,
    color: "#193F30",
    marginTop: 0,
    textAlign: "center",
  },
});
