import React from "react";
import {View, Text, Styleshhet, TouchableOpacity, StyleSheet } from 'react-native'

const CustomButton = props =>{
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style ={{...styles.button, ...props.style}}>
                <Text style={{...styles.buttonText, ...props.textStyling}}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#5F9EA0" , 
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:3

    },
    buttonText:{
        color:"white",
    }
})

export default CustomButton;