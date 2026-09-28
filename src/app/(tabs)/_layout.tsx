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
          height: 82,
          backgroundColor: "#FFFDF8",
          borderTopWidth: 1,
          borderTopColor: "#DDDDDD",
          paddingBottom: 8,
          paddingTop: 7,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginBottom: 1,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={26}
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
              size={26}
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
                size={38}
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
              size={26}
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
              size={26}
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
    width: 65,
    height: 65,
    borderRadius: 40,

    backgroundColor: "#C59B45",

    justifyContent: "center",
    alignItems: "center",

    marginTop: -50,
    marginBottom: 5,
  },
});