import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // O menu fica SEMPRE claro
        tabBarActiveTintColor: "#173B2C",
        tabBarInactiveTintColor: "#173B2C",

        tabBarStyle: {
          height: 68,
          backgroundColor: "#FFFDF8",
          borderTopWidth: 1,
          borderTopColor: "#DDDDDD",
          paddingBottom: 5,
          paddingTop: 4,
        },

        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="estoque"
        options={{
          title: "Estoque",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cube-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="adicionarProduto"
        options={{
          title: "Adicionar",

          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Ionicons
                name="add"
                size={34}
                color="#FFFFFF"
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="listaDeCompras"
        options={{
          title: "Compras",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: "#C59B45",

    justifyContent: "center",
    alignItems: "center",

    marginTop: -18,
  },
});