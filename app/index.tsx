import { View, StyleSheet, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { Colors } from '@/constants/Colors';
import Card from '@/components/Card';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={25} color="#000" style={styles.plusIcon} />
        <Text style={styles.headerText}>Boards</Text>
        <Ionicons name="add-circle-outline" size={25} color="#000" style={styles.plusIcon} />
      </View>
      <View style={{ width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
        <Card/>
        <Card/>

      </View>
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column', 
    alignItems: 'center', 
    padding:20,
    backgroundColor:Colors.light.background,
  },
  header:{
    width:"100%",
    alignItems:'center',
    marginTop:40,
    flexDirection:"row",
    justifyContent:'space-between'
  },
  headerText:{
    fontSize:22,
    fontWeight:'600',
 
},
  plusIcon: {
    alignSelf: 'center',
  },
});
