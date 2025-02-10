import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface LogModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    logData: string;
    setLogData: (data: string) => void;
    handleLogData: () => void;
}

const LogModal: React.FC<LogModalProps> = ({ modalVisible, setModalVisible, logData, setLogData, handleLogData }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Log Data</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your log data"
                            value={logData}
                            onChangeText={setLogData}
                            autoFocus
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Submit" onPress={handleLogData} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default LogModal;

