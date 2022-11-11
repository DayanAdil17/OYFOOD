import React from 'react'
import {Text, View, BackHandler, Dimensions, ScrollView, RefreshControl} from 'react-native'
import { Card,Divider, ListItem } from 'react-native-elements'
import CountDown from 'react-native-countdown-component';

export default function OrderPage(props) {
    const pageBefore = props.pageBefore
    const ip_address = props.connection
    const dispatch = props.dispatch
    const [active_order, set_active_order] = React.useState([])
    const [menuList, setMenuList] = React.useState([])
    const [timer,setTimer] = React.useState([])
    const [refresh, set_refresh] = React.useState(false);

    React.useEffect(() => {            
        
        fetch(ip_address+"OYFOOD/back-end/pull_order.php", {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
         
        }).then((response) => response.json()).then((responseJson) => {
            sortingOrder(responseJson.active_order,responseJson.menu)
            set_active_order(responseJson.active_order)
            setMenuList(responseJson.menu)
        });
        
        const handleBackButtonClick = () => {
            if(pageBefore == "DashboardPage"){
                dispatch({ type: 'DASHBOARD_PAGE' })
            }else if(pageBefore == "AvailableMenu"){
                dispatch({ type: 'AVAILABLE_MENU' })
            }            
            return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    
        return () => backHandler.remove();
    }, []);

    const refresh_data = React.useCallback(() => {
        set_refresh(true);        
        fetch(ip_address+"OYFOOD/back-end/pull_order.php", {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
         
        }).then((response) => response.json()).then((responseJson) => {
            sortingOrder(responseJson.active_order,responseJson.menu)
            set_active_order(responseJson.active_order)
            setMenuList(responseJson.menu)
        });
        set_refresh(false);    
    }, []);

    const sortingOrder = (order_list,menu_list) => {
        let time_array = []
        let countBefore = 0;
        order_list.map((data) => {
            let time_order = 0
            let count = 0;
            let id = data.order_menu_id.split(',')
            let total = data.order_quantity.split(',')            
            menu_list.map((val)=>{     
                let quantity = 0           
                for (let index = 0; index < id.length; index++) {
                    const element = id[index];
                    if(parseInt(element)==val.menu_id){
                        quantity = total[index]
                    }
                }
                if(quantity>0){
                    time_order += Math.ceil(quantity / 2)*val.menu_duration
                }

            })

            var count_down = new Date(Date.parse(data.order_created.replace(/[-]/g,'/')));
            count_down.setSeconds(count_down.getSeconds()+time_order)
            let duration = count_down.getTime()
            let now = new Date().getTime();
            let distance = duration - now;
                    
            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);  

            count = (hours * 3600) + (minutes * 60) + seconds + countBefore

            if(count < 0){
                count = 0
            }
            
            countBefore += count
            
            time_array.push(count)
        })
        setTimer(time_array)
    }

    function ListOrder(props){
        const data = props.data
        const timer = props.timer
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
                    <Text style={{textAlign:"center",marginBottom:10}}>
                        Your order will be ready in: 
                    </Text>
                    <CountDown
                        until={timer}
                        size={20}
                        timeToShow={['H','M', 'S']}
                        timeLabels={{h: 'Hour',m: 'Minute', s: 'Second'}}
                        //onChange = { ()=>{ sortingOrder(active_order,menuList) } }
                    />
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
                </Card>
            </View>
        )
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing = { refresh }
                        onRefresh  = { refresh_data }
                    />
                }
            >
                {
                    active_order.map((data, key) => {
                        if(timer[key] > 0){      
                            return <ListOrder data = {data} key = {key} timer = {timer[key]}/>  
                        }
                    })
                }
            </ScrollView>
        </View>
    )
}
