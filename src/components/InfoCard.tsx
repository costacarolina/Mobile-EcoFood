import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";


type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  valor: string;
  texto: string;
  cor: string;
};


export default function InfoCard({
  icon,
  valor,
  texto,
  cor
}:Props){

return(

<View style={styles.card}>


<View style={[
styles.iconBox,
{backgroundColor:cor}
]}>

<Ionicons
name={icon}
size={20}
color="#fff"
/>

</View>


<Text style={styles.valor}>
{valor}
</Text>


<Text style={styles.texto}>
{texto}
</Text>


</View>

)

}



const styles=StyleSheet.create({

card:{
width:110,
height:72,
backgroundColor:"#F1F1F1",
borderRadius:10,
padding:8,
margin:4
},


iconBox:{
width:30,
height:30,
borderRadius:7,
alignItems:"center",
justifyContent:"center",
marginBottom:2
},


valor:{
fontSize:14,
fontWeight:"bold",
color:"#145B36"
},


texto:{
fontSize:9,
color:"#333"
}

})