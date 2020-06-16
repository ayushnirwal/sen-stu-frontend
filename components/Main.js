
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LoginScreen from './LoginScreen'
import MainMenu from './MainMenu'
import AsyncStorage from '@react-native-community/async-storage';

class Main extends Component {
    state={
        token:null
    }
    
    readItemFromStorage = async () => {
        const item = await AsyncStorage.getItem('@token');
        this.setState({
            token:item,
        });
    };
    
    render () {
        this.readItemFromStorage()
        
        
        
        if(this.state.token != null){
            return(
                <MainMenu/>
            )
        }
        else{
            return(
                <LoginScreen/>
            )
        }
        
    }
}



export default Main