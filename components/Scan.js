import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned  = async({ type, data }) => {
    setScanned(true);
    const token = await AsyncStorage.getItem("@token")
    // post req to mark atten

    fetch('https://sen-fake-backend.herokuapp.com/markMe', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          qr:data
        })
      })
      .then((response)=>response.json())
      .then(async (json)=>{
            if(json.msg != undefined){
              alert(json.msg + " for " + data.substring(0,5) );
            }
            else{
              alert(`Cant communicate to server`);
            }
            
        
      })
      .catch((error)=>{
          console.log(error);
          alert(`no response`);
      })


  };

  if (hasPermission === null) {
    return (
        <View style={styles.container}>
            <Text>Wait bitch</Text>
        </View>
    )
  }
  if (hasPermission === false) {
    return (
        <View style={styles.container}>
            <Text>No access to camera</Text>
        </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f5dEB3',
        
    },
    
  });