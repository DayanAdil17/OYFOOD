import React from 'react'
import {Text, View, BackHandler, Dimensions, ScrollView, StyleSheet, TextInput} from 'react-native'
import { Card,Divider, ListItem, Image, Button } from 'react-native-elements'

const styles = StyleSheet.create({
  input: {
      width        : 300,
      height       : 40,
      margin       : 12,
      borderWidth  : 1,
      padding      : 10,
      borderRadius : 5
  },
});

export default function Login(props) {
  const { DashboardAdminPage }  = React.useContext(props.AuthContext); 
  const ip_address = props.connection
  const dispatch = props.dispatch
  const [username,set_username] = React.useState('');
  const [password,set_password] = React.useState('');
  const [not_login,set_not_login] = React.useState(false)
  React.useEffect(() => {            
    
    const handleBackButtonClick = () => {
        dispatch({ type: 'DASHBOARD_PAGE' })   
        return true;
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => backHandler.remove();
  }, []);

  const user_login = (event) => {
    event.preventDefault();
    fetch(ip_address+"OYFOOD/back-end/login.php", {
      method:'POST',
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body : JSON.stringify({
          username : username,
          password : password
      })
    }).then((response) => response.json()).then((responseJson) => {
      if(responseJson.status_login == "success"){
        dispatch({ type: 'DASHBOARD_ADMIN_PAGE' })
      }else{
        set_not_login(true)
      }
    });
  }
  return (
    <View style ={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
      <Image style = {{width : 300, height : 200}} source = { require('../assets/logo.png' ) } />  
      <TextInput   
        style        = { styles.input }  
        onChangeText = { set_username }     
        placeholder  = "Username"
      />
      <TextInput           
        secureTextEntry = { true }
        style           = { styles.input }     
        onChangeText    = { set_password }      
        placeholder     = "Password"
      />   
      {(()=>{
        if(not_login == true){
          return(
            <View style={{width:300,margin:12}}>
              <Text style={{backgroundColor:"#F9CB12",width:"100%",height:40,borderRadius:5,
              textAlignVertical:"center",textAlign:"center",fontWeight:"bold"}}>
                Wrong username or password...
              </Text>
            </View> 
          )
        }
      })()}     
      <View style={{width:300,margin:12}}>
        <Button title="LOGIN" onPress={ (event) => { user_login(event) }}/>
      </View>
    </View>
  )
}
