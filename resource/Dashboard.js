import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet} from 'react-native';
import { Text, Card, Button, Icon, Header as HeaderRNE, HeaderProps, Image, Divider,ListItem,Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { LinearGradient } from 'expo-linear-gradient';


export default function Dashboard(props) {
    const { AvailableMenu, OrderPage, HistoryPage, LoginPage }  = React.useContext(props.AuthContext);
    const setPageBefore = props.setPageBefore
  return (
    <View style={styles.container}>         
      <Image style = {{width : 300, height : 200}} source = { require('../assets/logo.png' ) } />  
      <Text style={{color:"#D1D1D1"}}>-------------------------------------------------------------------------</Text>
      <View style = {{justifyContent:"center", alignItems:'center',width:"100%",marginTop:"10%"}}>
        <ListItem
            key                 = "Availble Menu"
            Component           = { TouchableScale }
            ViewComponent       = { LinearGradient }
            friction            = { 90 }
            tension             = { 100 }
            activeScale         = { 0.95 }
            style               = { { margin:16,marginTop:0,width:"90%" } }
            containerStyle      = {{borderRadius:5}}
            onPress             = { AvailableMenu }
            linearGradientProps = {{
                colors : ['#10A703', '#0D8203'],
                start  : { x: 1, y: 0 },
                end    : { x: 0.2, y: 0 },
            }}                        
        >
            <Avatar source = { require('../assets/menu.png' ) } />
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                  Available Menu
                </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="white" size = {40} onPress = { AvailableMenu }/>
        </ListItem>
        <ListItem
            key                 = "Waiting List"
            Component           = { TouchableScale }
            ViewComponent       = { LinearGradient }
            friction            = { 90 }
            tension             = { 100 }
            activeScale         = { 0.95 }
            style               = { { margin:16,marginTop:0,width:"90%" } }
            containerStyle      = {{borderRadius:5}}
            onPress             = { ()=>{OrderPage();setPageBefore("DashboardPage")} }
            linearGradientProps = {{
                colors : ['#F2B545', '#EB9A03'],
                start  : { x: 1, y: 0 },
                end    : { x: 0.2, y: 0 },
            }}                        
        >
            <Avatar source = { require('../assets/list.png' ) } />
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                  Waiting List
                </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="white" size = {40} onPress = { ()=>{OrderPage();setPageBefore("DashboardPage")} }/>
        </ListItem>
        <ListItem
            key                 = "Admin Login"
            Component           = { TouchableScale }
            ViewComponent       = { LinearGradient }
            friction            = { 90 }
            tension             = { 100 }
            activeScale         = { 0.95 }
            style               = { { margin:16,marginTop:0,width:"90%" } }
            containerStyle      = {{borderRadius:5}}
            onPress             = { LoginPage }
            linearGradientProps = {{
                colors : ['#B311E6', '#850AAC'],
                start  : { x: 1, y: 0 },
                end    : { x: 0.2, y: 0 },
            }}                        
        >
            <Avatar source = { require('../assets/admin.png' ) } />
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                  Login as Admin
                </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="white" size = {40} onPress = { LoginPage }/>
        </ListItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
