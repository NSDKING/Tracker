import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useState, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import LogModal from '@/modal/LogModal';
 
const Card = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [logData, setLogData] = useState('');
    const [daysInMonth, setDaysInMonth] = useState(Array.from({ length: 31 }, (_, index) => index + 1));

  
    const handleLogData = () => {
        // Handle the log data submission here
        console.log(logData);
        setLogData(''); // Clear the input after submission
        setModalVisible(false); // Close the modal
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="book" size={22} color="gray" style={styles.icon} />
                <Text style={styles.headerText}>Revision</Text>
            </View>
            <View style={styles.body}>
                {
                    daysInMonth.map((day)=>(
                        <View key={day} style={styles.square}></View>
                    
                        ))
                }
             </View>

             <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.button} onPress={()=>{setModalVisible(true)}}>
                    <View style={styles.BoxIcon}>
                        <Ionicons name="add" size={30} color="white" style={styles.addIcon}/>
                    </View>
                    <Text style={styles.buttonText}>check</Text>
                </TouchableOpacity>
           
 
             </View>

            <LogModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                logData={logData}
                setLogData={setLogData}
                handleLogData={handleLogData}
            />
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container:{
        width:"49%",
        backgroundColor:'#FFFF',
        height:220,
        borderRadius:15,
        padding:15,
        marginTop:30
        
    },
    header:{
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    headerText:{
        fontSize:17,
        fontWeight:'700',
    },
    icon: {
        marginRight: 8, // Space between icon and text
    },
    body:{
        marginTop:15,
        flexWrap:"wrap",
        height:100,
        justifyContent: 'flex-start',

    },
    square:{
        backgroundColor:Colors.light.bgsquare,
        height:15,
        width:15,
        borderRadius:3,
        margin: '1.2%'
    },
    buttonBox:{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent:"flex-start",
        width:"100%",
        marginLeft:-5,
    },
    button: {
        backgroundColor:Colors.light.bgsquare,
        width:150,
        height:45,
        flexDirection:"row",
        alignItems:"center",
        borderRadius:6,
        justifyContent:"flex-start",
        padding:5,
        marginRight:6,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight:"700"
    },
    failButton:{
        backgroundColor:Colors.light.fail,
        height:45,
        width:45,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:6,

    },
    addIcon:{

    },
    BoxIcon:{
        height:35,
        width:35,
        backgroundColor:"black",
        borderRadius:7,
        marginRight:8,
        justifyContent:"center",
        alignItems:"center",
    }
})
    