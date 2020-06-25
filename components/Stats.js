import React, { Component, useState } from 'react';
import CustomButton from './CustomButton';
import { Text, TextInput, View , StyleSheet, Button, AsyncStorage} from 'react-native';

class Stats extends Component{
  state={
    courseList:null,
    page:'stats',
    selectedCourse:undefined,
    data:undefined
  }
    componentDidMount = async () =>{
        const token = await AsyncStorage.getItem('@token')
        this.setState({
          token
        })
        fetch('https://sen-backend.herokuapp.com/stu/getCourseList', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
        })
      })
      .then((response)=>response.json())
      .then(async (json)=>{
            if(json.courses != undefined){
              
              this.setState({
                courses:json.courses
              })
              
            }
            else{
              console.log(json)
              alert(`wrong resposne`);
            }
            
        
      })
      .catch((error)=>{
          console.log(error);
          alert(`Error:Cant communicate to server`);
      })
    }

    handlePress = (course) =>{
      this.setState({
        selectedCourse:course,
        page:'coursepage'

      })
      fetch('https://sen-backend.herokuapp.com/stu/getStats', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token:this.state.token,
          course:course
        })
      })
      .then((response)=>response.json())
      .then(async (json)=>{
            this.setState({
              data:json
            })
            
            
        
      })
      .catch((error)=>{
          console.log(error);
          alert(`Error:Cant communicate to server`);
      })
    }
  
    render(){
      if (this.state.page == "stats")
        {
          let courses = undefined;
          if (this.state.courses != undefined )
            courses = this.state.courses.map((course)=>{
            return(
              <CustomButton style={styles.button}
                                  text={course}
                                  textStyling={styles.buttonFont}
                                  key={course}
                                  onPress={()=>{this.handlePress(course)}}
                              />
            )
          })
          return(
            
              <View style ={styles.container}>
                  <Text>Stats</Text>
                  {courses}
              </View>
          )
        }
        else{
            let table = null
            if(this.state.data!= undefined){
              table  = this.state.data.Sheet.map((obj)=>{
                const text = obj.Attended?"Present":"Absent";
                return  ( 
                  <View>
                    <Text> {obj.Date} - {text} </Text>
                  </View>
                  
                )
              })
              return(
                <View style ={styles.container}>
                  <Text>{this.state.selectedCourse}</Text>
                  <Text>Total: {this.state.data.Total}</Text>
                  <Text>Attended: {this.state.data.Attended}</Text>
                  {table}
              </View>
              )

            }
            return(
              <View style ={styles.container}>
                  <Text>{this.state.selectedCourse}</Text>
                  <Text>Requesting Data</Text>
              </View>
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
    button:{
      marginTop:20,
  },
  buttonFont:{
      fontSize:20,
      fontWeight:'bold',
  }
    
  });

export default Stats

