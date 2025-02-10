import { View, StyleSheet, Platform, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import FailModal from '@/modal/failModal';

const Card = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [logData, setLogData] = useState('');

    const handleLogData = () => {
        // Handle the log data submission here
        console.log(logData);
        setLogData(''); // Clear the input after submission
        setModalVisible(false); // Close the modal
    };

    const daysInMonth = Array.from({ length: 31 }, (_, index) => index + 1); 
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
                <TouchableOpacity style={styles.button}>
                    <View style={styles.BoxIcon}>
                        <Ionicons name="add-outline" size={24} color="white" style={styles.addIcon}/>
                    </View>
                    <Text style={styles.buttonText}>check</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.failButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="close-outline" size={28} color="white" style={styles.addIcon}/>
                </TouchableOpacity>
 
             </View>

            <FailModal 
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
        height:210,
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
        width:"100%"
    },
    button: {
        backgroundColor:Colors.light.bgsquare,
        width:100,
        height:35,
        flexDirection:"row",
        alignItems:"center",
        borderRadius:6,
        justifyContent:"flex-start",
        padding:5,
        marginRight:6,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight:"600"
    },
    failButton:{
        backgroundColor:Colors.light.fail,
        height:35,
        width:35,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:6,

    },
    addIcon:{

    },
    BoxIcon:{
        height:25,
        width:25,
        backgroundColor:"black",
        borderRadius:6,
        marginRight:8,

    }
})
    