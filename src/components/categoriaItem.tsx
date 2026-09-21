import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";


type Props = {
  nome:string;
  porcentagem:string;
}


export default function CategoriaItem({
  nome,
  porcentagem
}:Props){


let icon:"snow-outline" | "cube-outline" | "file-tray-outline";


if(nome === "Geladeira"){
  icon="snow-outline";
}
else if(nome === "Freezer"){
  icon="cube-outline";
}
else{
  icon="file-tray-outline";
}



return(

<View style={styles.container}>


<Ionicons
name={icon}
size={18}
color="#287552"
/>


<Text style={styles.nome}>
{nome}
</Text>


<Text style={styles.porcentagem}>
{porcentagem}
</Text>


</View>

)

}



const styles = StyleSheet.create({

container:{
flexDirection:"row",
alignItems:"center",
marginVertical:7
},


nome:{
fontSize:14,
marginLeft:10,
flex:1
},


porcentagem:{
fontSize:14
}


})