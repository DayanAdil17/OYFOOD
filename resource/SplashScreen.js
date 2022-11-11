import React from 'react'
import {Text, Dimensions, View} from 'react-native'
import {Image} from 'react-native-elements'

export default function SplashScreen() {
  const screenWidth                         = Dimensions.get("window").width;
  const screenHeight                        = Dimensions.get("window").height;
  return (
    <View style ={{flex:1}}>      
      <Image style = {{width : screenWidth, height : screenHeight}} source = { require('../assets/splashScreen.gif' ) } />
      
    </View>
  )
}
