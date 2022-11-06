import { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Image, Button, Alert, TextInput, TouchableOpacity} from 'react-native';
import {DatabaseConnected} from './database/database'

const db =  DatabaseConnected.getConnection()

export default function App() {
  const [linkImg, setLinkImg] = useState('')
  const [listImage, setListImage] = useState([])
  const [imgData, setImgData] = useState({})
  const [loading, setLoading] = useState(false)

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
      opacity: loading === true ? 0.5 : 1  
    }
        
  });
  


  const backWardHandle = () => {
    setLoading(true)
    let newItem = listImage.find(item => item.Id === (imgData.Id - 1))
    if(!newItem){
      let data = [...listImage]
      setImgData(data.pop())
    } else{
      setImgData(newItem)
    }
    setTimeout(() => {
      setLoading(false)
    },2000)
  }
  const forWardHandle = () => {
    setLoading(true)
    let newItem = listImage.find(item => item.Id === (imgData.Id + 1))
    if(!newItem) {
      let data = [...listImage]
      setImgData(data.shift())
    } else{
      setImgData(newItem)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }
  
  const submitted = () => {
    if(!linkImg) {
        alert("Please enter your link image !")
        return
      } else {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO Images (images_detail) VALUES (?)",
              [linkImg],
              (tx, results) => {
                console.log(results.rowsAffected);
              }
            );
          });
          loadData()
        } catch (error) {
          console.log(error);
        }
      }
    };

    const loadData = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Images',
          [],
          (tx, results) => {
            var detailItemp = [];
            for (let i = 0; i < results.rows.length; ++i)
            detailItemp.push(results.rows.item(i));
            setListImage(detailItemp);
          }
        );
      });
    }

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Images(Id INTEGER PRIMARY KEY AUTOINCREMENT, images_detail VARCHAR(255))",
      );
    });
  };

  useEffect(() => {
    createTable();
    loadData()
  }, []);

  useEffect(() => {
    let data = [...listImage]
    setImgData(data.pop())
  },[listImage])
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={{uri: imgData?.images_detail}}
      />
      <View style={styles.fixToText}>

        <TouchableOpacity disabled={ loading === true ? true : false } onPress={() => {backWardHandle()}}
        style ={styles.buttonCustom}>
            <Text style={styles.text}>Backward</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={ loading === true ? true : false } onPress={() => {forWardHandle()}}
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

