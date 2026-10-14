import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/../context/themeContext";

interface InfoCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  valor: string;
  texto: string;
  cor: string;
}

export default function InfoCard({
  icon,
  valor,
  texto,
  cor,
}: InfoCardProps) {

  const { darkMode } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: darkMode
            ? "#2B2B2B"
            : "#F5F5F5",
        },
      ]}
    >

      <Ionicons
        name={icon}
        size={22}
        color={cor}
      />

      <Text
        style={[
          styles.valor,
          {
            color: darkMode
              ? "#FFFFFF"
              : "#173B2C",
          },
        ]}
      >
        {valor}
      </Text>

      <Text
        style={[
          styles.texto,
          {
            color: darkMode
              ? "#FFFFFF"
              : "#555555",
          },
        ]}
      >
        {texto}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
    card: {
    width: 150,
    minHeight: 120,
    borderRadius: 12,
    padding: 14,
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 10,
},

    valor: {
        fontSize: 21,
        fontWeight: "bold",
        marginTop: 7,
    },

    texto: {
    fontSize: 11,
    marginTop: 4,
    flexShrink: 1,
    includeFontPadding: true,
},
});
