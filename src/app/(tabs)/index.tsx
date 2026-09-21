import InfoCard from "@/components/InfoCard";
import CategoriaItem from "@/components/categoriaItem";
import ImpactoItem from "@/components/impactoItem";

import {
ScrollView,
View,
Text,
TouchableOpacity,
StyleSheet,
Image
} from "react-native";

import {Ionicons} from "@expo/vector-icons";



export default function Home(){


return(

<ScrollView style={styles.container}>


{/* HEADER */}

<View style={styles.header}>


<Ionicons
name="menu"
size={28}
/>


<Image
source={require("../../../assets/images/logoecofood/logoecofood.png")}
style={styles.logo}
/>


<View style={styles.icons}>

<Ionicons
name="notifications-outline"
size={25}
/>


<Ionicons
name="scan-outline"
size={25}
/>

</View>


</View>



<Text style={styles.bem}>
Bem-vindo, Chef Rafael
</Text>


<Text style={styles.titulo}>
Visão geral do seu restaurante
</Text>


<Text style={styles.data}>
Atualizado hoje, 08:30
</Text>





{/* CARDS */}


<View style={styles.cards}>


<InfoCard
icon="cube-outline"
valor="124"
texto="Produtos cadastrados"
cor="#075B2A"
/>


<InfoCard
icon="alert-circle-outline"
valor="18"
texto="Próximos do vencimento"
cor="#D9534F"
/>


<InfoCard
icon="cart-outline"
valor="5"
texto="Produtos em falta"
cor="#C9A34B"
/>


<InfoCard
icon="leaf-outline"
valor="12,4 kg"
texto="Desperdício evitado este mês"
cor="#287552"
/>


<InfoCard
icon="cash-outline"
valor="R$ 680"
texto="Economia gerada este mês"
cor="#075B2A"
/>


</View>





{/* ALERTA */}


<View style={styles.alerta}>


<Ionicons
name="warning"
size={28}
color="#D9534F"
/>


<View style={{flex:1}}>

<Text style={styles.alertTitulo}>
Atenção
</Text>


<Text>
18 produtos próximos do vencimento.
</Text>

</View>


<TouchableOpacity style={styles.alertButton}>

<Text style={{color:"#fff"}}>
Ver estoque
</Text>


</TouchableOpacity>


</View>







{/* ESTOQUE */}


<View style={styles.card}>


<Text style={styles.cardTitulo}>
Estoque por categoria
</Text>


<CategoriaItem
nome="Geladeira"
porcentagem="45%"
/>


<CategoriaItem
nome="Freezer"
porcentagem="30%"
/>


<CategoriaItem
nome="Despensa"
porcentagem="25%"
/>



<View style={styles.verde}>

<Text>
Ver estoque completo
</Text>


<Ionicons
name="chevron-forward"
size={16}
/>


</View>


</View>







{/* COMPRAS */}


<View style={styles.card}>


<Text style={styles.cardTitulo}>
Lista de compras
</Text>



<Item 
icon="leaf-outline"
texto="5 itens para repor"
/>


<Item 
icon="time-outline"
texto="Priorize os próximos vencimentos"
/>


<Item 
icon="cube-outline"
texto="Gere pedidos para fornecedores"
/>



<View style={styles.amarelo}>

<Text>
Ver lista de compras
</Text>



</View>


</View>







{/* IMPACTO */}


<View style={styles.impacto}>


<Text style={styles.cardTitulo}>
Impacto do seu restaurante
</Text>



<View style={styles.row}>


<ImpactoItem
icon="leaf-outline"
valor="12,4 kg"
texto="Alimentos aproveitados"
/>


<ImpactoItem
icon="cash-outline"
valor="R$ 680"
texto="Economia gerada"
/>


<ImpactoItem
icon="trending-up-outline"
valor="14%"
texto="Redução no desperdício"
/>


</View>



<View style={styles.relatorio}>

<Text>
Ver relatórios completos
</Text>


</View>


</View>



</ScrollView>

)

}



function Item({texto, icon}:any){

return(

<View style={styles.itemLista}>


<Ionicons
name={icon}
size={16}
color="#287552"
/>


<Text style={styles.textoItem}>
{texto}
</Text>


<Ionicons
name="chevron-forward"
size={16}
/>


</View>

)

}





const styles=StyleSheet.create({

container:{
backgroundColor:"#fff",
padding:15
},


header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},


logo:{
width:70,
height:55,
resizeMode:"contain"
},


icons:{
flexDirection:"row",
gap:15
},


bem:{
fontSize:16,
marginTop:10
},


titulo:{
fontSize:18,
fontWeight:"bold",
color:"#155B3A"
},


data:{
fontSize:11,
color:"#999"
},


cards:{
flexDirection:"row",
flexWrap:"wrap",
marginTop:15
},


alerta:{
borderWidth:1,
borderColor:"#E85B5B",
borderRadius:10,
padding:12,
flexDirection:"row",
alignItems:"center",
gap:10,
marginTop:15
},


alertTitulo:{
color:"#D9534F",
fontWeight:"bold"
},


alertButton:{
backgroundColor:"#D9534F",
padding:10,
borderRadius:8
},


card:{
backgroundColor:"#FAFAFA",
borderRadius:12,
padding:15,
marginTop:15
},


cardTitulo:{
fontWeight:"bold",
textAlign:"center",
marginBottom:15
},


verde:{
backgroundColor:"#D6E7D0",
padding:8,
borderRadius:5,
flexDirection:"row",
justifyContent:"space-between"
},


amarelo:{
backgroundColor:"#DFC687",
padding:10,
borderRadius:5
},


impacto:{
backgroundColor:"#ddd",
padding:15,
borderRadius:12,
marginTop:15
},


row:{
flexDirection:"row"
},


relatorio:{
backgroundColor:"#BBB",
padding:8,
borderRadius:8,
marginTop:10,
alignItems:"center"
},


itemLista:{
flexDirection:"row",
justifyContent:"space-between",
marginVertical:6
},

textoItem:{
flex:1,
marginLeft:10,
fontSize:13
},

})