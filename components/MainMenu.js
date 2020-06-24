import React, { Component, useState } from 'react';
import { Text, TextInput, View , StyleSheet, Button ,BackHandler} from 'react-native';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import Scan from './Scan'
import Stats from './Stats'

class MainMenu extends Component{
    state={
        page:'Main'
    }
    logoutRequest = async () =>{
        const token = await AsyncStorage.getItem('@token');
        
        
        fetch('https://sen-backend.herokuapp.com/stu/logout', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        })
        
        
        
      
      
        await AsyncStorage.removeItem('@token');

        
    }
    ShowScan = ()=>{
        this.setState({
            page:'scan'
        })
    }
    ShowStat = ()=>{
        this.setState({
            page:'stats'
        })
    }
    backAction =() =>{
        if(this.state.page != "Main"){
            this.setState({
                page:'Main'
            })
            return true;
        }
        else{
            BackHandler.exitApp()
        }
    }
    backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
        
    )
  
    render(){
        
        if (this.state.page == 'Main')
        {
            
            return (
                <View style={styles.container}>
                    <Text>Main menu</Text>
                    <CustomButton style={styles.button}
                                text="Scan QR"
                                textStyling={styles.buttonFont}
                                onPress={this.ShowScan}
                            />
                    <CustomButton style={styles.button}
                                text="Stats"
                                textStyling={styles.buttonFont}
                                onPress={this.ShowStat}
                            />
                    <CustomButton style={styles.button}
                                text="Logout"
                                textStyling={styles.buttonFont}
                                onPress={this.logoutRequest}
                            />
                </View>
                
            );
        }
        else if (this.state.page == 'scan'){
            return(
                <Scan/>
            )
        }
        else if (this.state.page == 'stats'){
            return(
                <Stats/>
            )
        }
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
    }
    
  });

export default MainMenu

