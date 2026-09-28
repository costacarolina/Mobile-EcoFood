import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/../context/themeContext";

interface CategoriaItemProps {
  nome: string;
  porcentagem: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function CategoriaItem({
  nome,
  porcentagem,
  icon,
}: CategoriaItemProps) {

  const { darkMode } = useTheme();

  return (
    <View style={styles.container}>

      <View style={styles.esquerda}>

        <Ionicons
          name={icon}
          size={16}
          color={darkMode ? "#4FA36B" : "#4FA36B"}
        />

        <Text
          style={[
            styles.nome,
            {
              color: darkMode ? "#FFFFFF" : "#171717",
            },
          ]}
        >
          {nome}
        </Text>

      </View>

      <Text
        style={[
          styles.porcentagem,
          {
            color: darkMode ? "#FFFFFF" : "#171717",
          },
        ]}
      >
        {porcentagem}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  esquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  nome: {
    fontSize: 11,
  },

  porcentagem: {
    fontSize: 11,
  },
});