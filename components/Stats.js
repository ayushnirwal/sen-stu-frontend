import React, { Component, useState } from 'react';
import { Text, TextInput, View , StyleSheet, Button} from 'react-native';

class Stats extends Component{
    componentWillMount = () =>{
        fetch('https://192.168.122.1/stuStats', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          qr:data
        })
      })
      .then((response)=>response.json())
      .then(async (json)=>{
            if(json.msg != undefined){
              alert(`Wait bitch`);
            }
            else{
              alert(`Cant communicate to server`);
            }
            
        
      })
      .catch((error)=>{
          console.log(error);
          alert(`Cant communicate to server`);
      })
    }
  
    render(){
        return(
            <View style ={styles.container}>
                <Text>Stats</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f5dEB3',
        
    }
    
  });

export default Stats

