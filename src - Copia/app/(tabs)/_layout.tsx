import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import {
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

export default function Home() {
  const { fontScale } = useWindowDimensions();

  const alturaMenu = Math.max(82, 70 + fontScale * 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#173B2C",
        tabBarInactiveTintColor: "#173B2C",
        tabBarStyle: {
          height: alturaMenu,
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
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="estoque"
        options={{
          title: "Estoque",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="adicionarProduto"
        options={{
          title: "Adicionar",
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Ionicons name="add" size={38} color="#FFFFFF" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="listaDeCompras"
        options={{
          title: "Compras",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="detalhesProduto"
        options={{
          title: "Detalhes",
          href: null,
        }}
      />

      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          href: null,
        }}
      />

      <Tabs.Screen
        name="meusImpactos"
        options={{
          title: "Meu impacto",
          href: null,
        }}
      />

      <Tabs.Screen
        name="notificacoes"
        options={{
          title: "Notificações",
          href: null,
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
