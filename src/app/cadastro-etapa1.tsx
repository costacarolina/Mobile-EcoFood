import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {router} from "expo-router"; 

export default function CadastroRestaurante() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logoecofood/logoecofood.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.etapa}>1 de 2</Text>
      <Text style={styles.subEtapa}>Dados do restaurante</Text>

      <View style={styles.barraFundo}>
        <View style={styles.barraProgresso} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome do restaurante</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="storefront-outline"
            size={22}
            color="#284f37"
          />
          <TextInput
            placeholder="Ex.: Sabor & Mesa"
            placeholderTextColor="#9A9A9A"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Tipo de Cozinha</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="chef-hat"
            size={22}
            color="#284f37"
          />
          <TextInput
            placeholder="Ex.: Contemporânea"
            placeholderTextColor="#9A9A9A"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Endereço</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={22}
            color="#284f37"
          />
          <TextInput
            placeholder="Rua, número, bairro"
            placeholderTextColor="#9A9A9A"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Telefone</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="call-outline"
            size={22}
            color="#284f37"
          />
          <TextInput
            placeholder="(00) 00000-0000"
            placeholderTextColor="#9A9A9A"
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.label}>CNPJ</Text>
        <View style={[styles.inputContainer, styles.inputAtivo]}>
          <Ionicons
            name="document-text-outline"
            size={22}
            color="#284f37"
          />
          <TextInput
            placeholder="00.000.000/0000-00"
            placeholderTextColor="#9A9A9A"
            style={styles.input}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.botao} onPress={() => router.push("/cadastro-etapa2")}>
        <Text style={styles.textoBotao}>CONTINUAR</Text>

        <Ionicons
          name="arrow-forward"
          size={24}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6e6d7",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 25,
  },

  logo: {
    width: 180,
    height: 120,
  },

  etapa: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1d5c35",
    marginTop: 5,
  },

  subEtapa: {
    fontSize: 22,
    fontWeight: "600",
    color: "#8d8d8d",
    marginBottom: 15,
  },

  barraFundo: {
    width: "85%",
    height: 6,
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
    marginBottom: 25,
  },

  barraProgresso: {
    width: "52%",
    height: "100%",
    backgroundColor: "#2d6d43",
    borderRadius: 10,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1d5c35",
    marginBottom: 8,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 58,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  inputAtivo: {
    borderWidth: 2,
    borderColor: "#2D8CFF",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  botao: {
    marginTop: 35,
    backgroundColor: "#2e7a43",
    width: "85%",
    height: 58,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },
});