import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/../context/themeContext";

interface ImpactoItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  valor: string;
  texto: string;
}

export default function ImpactoItem({
  icon,
  valor,
  texto,
}: ImpactoItemProps) {

  const { darkMode } = useTheme();

  return (
    <View style={styles.container}>

      <Ionicons
        name={icon}
        size={22}
        color="#4FA36B"
      />

      <Text
        style={[
          styles.valor,
          {
            color: darkMode ? "#4FA36B" : "#173B2C",
          },
        ]}
      >
        {valor}
      </Text>

      <Text
        style={[
          styles.texto,
          {
            color: darkMode ? "#FFFFFF" : "#171717",
          },
        ]}
      >
        {texto}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  valor: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },

  texto: {
    fontSize: 8,
    textAlign: "center",
    marginTop: 2,
  },
});