import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
    return (
        <View>
            <Text>Home</Text>
            <Link href="/(tabs)/adicionarProduto">
                <Text>Adicionar Produto</Text>
            </Link>
        </View>
    )
}