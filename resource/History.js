import React from 'react'
import {Text, View, BackHandler, Dimensions, ScrollView} from 'react-native'
import { Card,Divider, ListItem } from 'react-native-elements'
export default function History(props) {
    const ip_address = props.connection
    const dispatch = props.dispatch
    const months      = ["January","February","March","April","May","Juni","July","August","September","October","November","December"]
    const [order_history, set_order_history] = React.useState([])
    const [menuList, setMenuList] = React.useState([])

    React.useEffect(() => {            
        
        fetch(ip_address+"OYFOOD/back-end/order_history.php", {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
         
        }).then((response) => response.json()).then((responseJson) => {
            set_order_history(responseJson.order_history)
            setMenuList(responseJson.menu)
        });
        
        const handleBackButtonClick = () => {
            dispatch({ type: 'DASHBOARD_ADMIN_PAGE' })   
            return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    
        return () => backHandler.remove();
    }, []);

    function OrderHistory(props){
        const data = props.data
        return(
            <View style = {{justifyContent:'center', alignItems:'center', flexDirection:'column',width:"100%", marginBottom:10}}>
                <Card containerStyle={{width:"90%"}}>
                    <View style = {{justifyContent:'space-evenly', alignItems:'center', flexDirection:'row',width:"100%"}}>
                        <View style = {{justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                            <Text style={{fontWeight:"bold",fontSize:14}}>Reservation Name</Text>
                            <Text style={{fontSize:14}}>{data.order_user}</Text>
                        </View>
                        <View style = {{justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                            <Text style={{fontWeight:"bold",fontSize:14}}>Reservation Table</Text>
                            <Text style={{fontSize:14}}>{data.order_table}</Text>
                        </View>                        
                    </View>
                    <Divider style={{marginTop:10,marginBottom:10}}/>
                    {
                        menuList.map((val,key)=>{
                            let id = data.order_menu_id.split(',')
                            let total = data.order_quantity.split(',')
                            let name = ""
                            let quantity = 0
                            for (let index = 0; index < id.length; index++) {
                                const element = id[index];
                                if(parseInt(element)==val.menu_id){
                                    name = val.menu_name
                                    quantity = total[index]
                                }
                            }
                            if(quantity>0){
                                return(
                                    <ListItem key={key} bottomDivider>
                                        <ListItem.Content>
                                            <Text>{name}</Text>
                                        </ListItem.Content>
                                        <Text>
                                            {quantity}
                                        </Text>
                                    </ListItem>
                                )
                            }
                        })
                    }  
                    <View style = {{justifyContent:'flex-end', alignItems:'center', flexDirection:'row',width:"100%"}}>
                        <Text style={{fontSize:12,marginTop:10}}>
                        { data.order_created.toString().slice(11,16) + " " + data.order_created.toString().slice(8,10) + " " + months[parseInt(data.order_created.toString().slice(5,7)) - 1] + " " + data.order_created.toString().slice(0,4)  }
                        </Text>
                    </View>
                </Card>
            </View>
        )
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <ScrollView>
                {
                    order_history.map((data, key) => (
                        <OrderHistory data = {data} key = {key}/>
                    ))
                }
            </ScrollView>
        </View>
    )
}
