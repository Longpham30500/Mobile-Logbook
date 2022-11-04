import { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Image, Button, Alert, TextInput, TouchableOpacity} from 'react-native';
import {DatabaseConnected} from './database/database'

const db =  DatabaseConnected.getConnection()

export default function App() {
  const [linkImg, setLinkImg] = useState('https://itechnolabs.ca/wp-content/uploads/2022/01/complete-guide-to-react-native-for-cross-platform-apps-development-itechnolabs.jpg')
  
  const submitted = () => {
    if(!linkImg) {
        alert("Please enter your link image !")
        return
      } else {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO Detail (images_detail) VALUES (?)",
              [linkImg],
              (tx, results) => {
                console.log(results.rowsAffected);
              }
            );
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    const checkData = () => {
      try {
        db.transaction((tx) => {
          tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='Detail'", [], (tx, result) => {
            console.log('item:', result.rowsAffected.length);
            var len = result.rows.length;
            if (len > 0) {
              navigation.navigate("Home");
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Detail(Id INTEGER PRIMARY KEY AUTOINCREMENT, images_detail VARCHAR(255))",
      );
    });
  };

  useEffect(() => {
    createTable();
    checkData();
  }, []);

  
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={{uri: linkImg}}
      />
      <View style={styles.fixToText}>

        <TouchableOpacity onPress={() => Alert.alert('Backward button pressed')}
        style ={styles.buttonCustom}>
            <Text style={styles.text}>Backward</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Forward button pressed')}
        style ={styles.buttonCustom}>
            <Text style={styles.text}>Forward</Text>
        </TouchableOpacity>

      </View>

      <Text>URL*</Text>

      <TextInput
        style={styles.input}
        onChangeText={setLinkImg}
        value={linkImg}
      />

        <TouchableOpacity onPress={() => submitted()}
        style ={styles.buttonCustom}>
            <Text style={styles.text}>Add Link</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300
  },
  buttonCustom: {
    width: 130 ,height: 40,
    elevation: 8,
    backgroundColor: "blue",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 30
  },
  stretch: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
  text:{
    fontSize:17,
    color:"white",
    fontWeight:"bold",
    textTransform: "uppercase",
    }   
});
