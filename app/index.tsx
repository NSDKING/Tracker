import { View, StyleSheet, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { Colors } from '@/constants/Colors';
import Card from '@/components/Card';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Tracker } from '@/assets/types';
import { useAppContext } from '@/context/AppContext';


export default function HomeScreen() {
  const { Trackers, setTrackers } = useAppContext();
  const [loading, setLoading]= useState<boolean>(false);


  const createDatabase = async ()=>{
      const dbPath = `${FileSystem.documentDirectory}sys.db`;
      const db = await SQLite.openDatabaseAsync(dbPath);
      try {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS Trackers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name VARCHAR(255),
                    type TEXT CHECK(type IN ('Habit', 'Metric'))
                );

                CREATE TABLE IF NOT EXISTS Achievements (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tracker_id INTEGER,
                    achieved BOOLEAN DEFAULT FALSE,
                    date DATE,
                    FOREIGN KEY (tracker_id) REFERENCES Tracker(id)
                );

                CREATE TABLE IF NOT EXISTS MetricDatas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tracker_id INTEGER,
                    value DECIMAL(10, 2),
                    date DATE,
                    FOREIGN KEY (tracker_id) REFERENCES Tracker(id)
                );

              
              `)
        
        console.log("Database and tables created successfully.");
        
      } catch (error) {
        console.error("Error creating database:", error);
      }
  }

  const AddTracker = async (name: string, type: 'Habit' | 'Metric') => {
    try {
      const dbPath = `${FileSystem.documentDirectory}sys.db`;
      const db = await SQLite.openDatabaseAsync(dbPath);
      
      await db.runAsync(`
        INSERT INTO Tracker (name, type)
        VALUES (?,  ?);
    `, [name, type]);

      console.log("Tracker added successfully:", { name, type });
    } catch (error) {
      console.error("Error adding tracker:", error);
    }
  };

  const checkIn = async (trackerId: number, achieved: boolean) => {
    const dbPath = `${FileSystem.documentDirectory}sys.db`;
    const db = await SQLite.openDatabaseAsync(dbPath);
    try {
        await db.runAsync(`
            INSERT INTO Achievements (tracker_id, achieved, date)
            VALUES (?, ?, ?);
        `, [trackerId, achieved, new Date().toISOString().split('T')[0]]); // Insert current date in YYYY-MM-DD format

        console.log("Achievement logged successfully:", { trackerId, achieved, date: new Date().toISOString().split('T')[0] });
    } catch (error) {
        console.error("Error logging achievement:", error);
    }
  };

  const LogMetric = async (trackerId: number, value: number, date: Date = new Date()) => {
    const dbPath = `${FileSystem.documentDirectory}sys.db`;
    const db = await SQLite.openDatabaseAsync(dbPath);
    try {
        await db.runAsync(`
            INSERT INTO MetricData (tracker_id, value, date)
            VALUES (?, ?, ?);
        `, [trackerId, value, date.toISOString().split('T')[0]]); // Insert date in YYYY-MM-DD format

        console.log("Metric logged successfully:", { trackerId, value, date: date.toISOString().split('T')[0] });
    } catch (error) {
        console.error("Error logging metric:", error);
    }
  };

  const getData = async ()=>{
    const dbPath = `${FileSystem.documentDirectory}sys.db`;
    const db = await SQLite.openDatabaseAsync(dbPath);

    const TrackersData: Tracker[] = await db.getAllAsync('SELECT * FROM Trackers');
    setTrackers(TrackersData);

  }

  useEffect(()=>{
    const initializeDatabase = async () => {
      setLoading(true)
      await createDatabase();
      await getData();
      setLoading(false)
    };

    initializeDatabase();
  },[])
  
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
