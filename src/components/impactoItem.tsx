import { Ionicons } from "@expo/vector-icons";
import {View,Text,StyleSheet} from "react-native";


export default function ImpactoItem({
icon,
valor,
texto
}:any){


return(

<View style={styles.item}>


<Ionicons
name={icon}
size={25}
color="#17633D"
/>


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

item:{
flex:1,
alignItems:"center"
},


valor:{
fontWeight:"bold",
fontSize:12
},


texto:{
fontSize:9,
textAlign:"center"
}

})