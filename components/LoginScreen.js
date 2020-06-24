import React, { Component, useState } from 'react';
import { Text, TextInput, View , StyleSheet, Button} from 'react-native';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component{
    state = {
        username:'',
        password:'',
        msg:''
    }
  
  loginRequest  = () =>{
    fetch('https://sen-backend.herokuapp.com/stu/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:this.state.username,
          password:this.state.password
        })
      })
      .then((response)=>response.json())
      .then(async (json)=>{
            if(json.token != undefined){
                await AsyncStorage.setItem('@token',json.token);

                this.setState({
                    token:json.token
                });
            }
            else{
                this.setState({
                    msg:json.msg
                });
            }
        
      })
      .catch((error)=>{
          console.log(error)
      })
  }
  setUsername = (e) =>{
    this.setState({
        username:e
    })
  }
  setPassword = (e) =>{
    this.setState({
        password:e
    })
  }
  render(){
    return (
        <View style={styles.container}>
            
            <View style={styles.loginContainer}>
            <Text style ={styles.error}>{this.state.msg}</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={this.setUsername}
                placeholderTextColor = {'#888'}
                defaultValue={this.state.username}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={this.setPassword}
                placeholderTextColor = {'#888'}
                defaultValue={this.state.password}
            />

                <CustomButton style={styles.button}
                    text="Login"
                    textStyling={styles.buttonFont}
                    onPress={this.loginRequest}
                />
            </View>
        </View>
        
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f5dEB3',
        
    },
    loginContainer: {
      
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingLeft:40,
        paddingRight:40,
        padding:40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    
    },
    input:{
        width:'100%',
        backgroundColor:'#FFFCC8',
        marginTop:20,
        fontSize:18,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:40,
        paddingRight:40,
        color: '#000',
        borderWidth: 2,
        borderColor:'#000',
        borderRadius:5,
        alignContent:'center'
       

    },
    button:{
        marginTop:20,
    },
    buttonFont:{
        fontSize:20,
        fontWeight:'bold',
    },
    error:{
        fontSize:20,
        color:'red'
    }
    
  });

export default LoginScreen