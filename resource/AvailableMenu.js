import React from 'react'
import {Text, View, BackHandler, Dimensions, ScrollView} from 'react-native'
import { Card, Button, Icon, Header as HeaderRNE, HeaderProps, Image, Dialog, DialogTitle,Avatar, 
    ListItem, Input, Divider} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

let menu_order = [
    {menu_name:"French Fries", menu_price:"16000", menu_ordered : 0, discount:0, menu_duration:3000},
    {menu_name:"Fried Rice", menu_price:20000, menu_order:0, discount:0, menu_duration:2400},
    
]
export default function AvailableMenu(props) {
    const {OrderPage} = React.useContext(props.AuthContext);
    const dispatch = props.dispatch
    const ip_address = props.connection
    const setPageBefore = props.setPageBefore
    const [menuList, setMenuList] = React.useState([])
    const [openDialog, setOpenDialog] = React.useState(false)   
    const [total,setTotal] = React.useState([])
    const [ordered, setOrdered] = React.useState(false)
    const [orderedItem, setOrderedItem] = React.useState(0)
    const [orderedPrice, setOrderedPrice] = React.useState(0)
    const [name, setName] = React.useState("")
    const [table, setTable] = React.useState("")
    const [sort_value, set_sort_value]      = React.useState("Name");
    const [order_history, set_order_history] = React.useState([])

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    React.useEffect(() => {       
        fetch(ip_address+"OYFOOD/back-end/get_menu.php", {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
         
        }).then((response) => response.json()).then((responseJson) => {
            let x = []
            responseJson.menu.map(data=>{
                x.push({menu_id:data.menu_id, menu_total : 0})    
            })
            setTotal(x)
            set_order_history(responseJson.order_history)
            // setMenuList(
            //     responseJson.menu.sort(function(a, b){
            //         if(a.menu_name < b.menu_name) { return -1; }
            //         if(a.menu_name > b.menu_name) { return 1; }
            //         return 0;
            //     })
            // )
            let most_favorite = [];
            let sort_quantity = [];
            responseJson.menu.sort(function(a, b){
                if(a.menu_name < b.menu_name) { return -1; }
                if(a.menu_name > b.menu_name) { return 1; }
                return 0;
            })
            responseJson.menu.map((val)=>{
                let quantity = 0;
                responseJson.order_history.map((data) => {
                    let id = data.order_menu_id.split(',')
                    let total = data.order_quantity.split(',')
                    for (let index = 0; index < id.length; index++) {
                        const element = id[index];
                        if(parseInt(element)==val.menu_id){
                            quantity += parseInt(total[index])
                        }
                    }
                })
                sort_quantity.push({id:val.menu_id,quantity:quantity})
            })
            sort_quantity.sort(function(a, b){
                if(a.quantity < b.quantity) { return 1; }
                if(a.quantity > b.quantity) { return -1; }
                return 0;
            });
            sort_quantity.map(data=>{
                responseJson.menu.map(menu=>{
                    
                    if(menu.menu_id == data.id){
                        menu.total_order = data.quantity
                        most_favorite.push(menu)
                        
                    }
                })
            })
            setMenuList(most_favorite)
            
        });

        const handleBackButtonClick = () => {
            dispatch({ type: 'DASHBOARD_PAGE' })
            
            return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    
        return () => backHandler.remove();
    }, []);

    const addTotal = (data) => {
        let incriment = []
        total.map(thisData =>{
            //let totals = thisData.menu_total

            if(thisData.menu_id == data.menu_id){
                thisData.menu_total += 1
                setOrderedItem(prevTotal => prevTotal + 1)
                setOrderedPrice(prevTotal => prevTotal + parseInt(data.menu_price))
            }
            incriment.push(thisData)
            setOrdered(true)
        })
        
        setTotal(incriment)
    }
    
    const minusTotal = (data) => {
        let incriment = []
        let amount_order = 0;
        total.map(thisData =>{
            //let totals = thisData.menu_total            
            if(thisData.menu_id == data.menu_id){
                thisData.menu_total -= 1
                setOrderedItem(prevTotal => prevTotal - 1)
                setOrderedPrice(prevTotal => prevTotal - parseInt(data.menu_price))
            }
            amount_order += thisData.menu_total
            
            incriment.push(thisData)
        })

        if(amount_order > 0){
            setOrdered(true)
        }else{
            setOrdered(false)
        }

        setTotal(incriment)
    }
    const Order = (e) => {
        e.preventDefault()

        let menu = "";
        let quantity = "";

        total.map(data=>{
            if(data.menu_total > 0){
                menu = menu + "," + data.menu_id
                quantity = quantity + "," + data.menu_total
            }
        })
        
        fetch(ip_address+"OYFOOD/back-end/push_order.php", {
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                name : name,
                table : table,
                menu : menu,
                quantity : quantity
            })
        }).then(() => {
            OrderPage()
            setPageBefore("AvailableMenu");
        });
        
    }

    const sort_menu = (value) => {
        if(value == "Name"){
            menuList.sort(function(a, b){
                if(a.menu_name < b.menu_name) { return -1; }
                if(a.menu_name > b.menu_name) { return 1; }
                return 0;
            })
        }else if(value == "Price"){
            menuList.sort(function(a, b){
                if(a.menu_price < b.menu_price) { return -1; }
                if(a.menu_price > b.menu_price) { return 1; }
                return 0;
            })
        }else if(value == "Most Favorite"){
            let most_favorite = [];
            let sort_quantity = [];
            menuList.sort(function(a, b){
                if(a.menu_name < b.menu_name) { return -1; }
                if(a.menu_name > b.menu_name) { return 1; }
                return 0;
            })
            menuList.map((val)=>{
                let quantity = 0;
                order_history.map((data) => {
                    let id = data.order_menu_id.split(',')
                    let total = data.order_quantity.split(',')
                    for (let index = 0; index < id.length; index++) {
                        const element = id[index];
                        if(parseInt(element)==val.menu_id){
                            quantity += parseInt(total[index])
                        }
                    }
                })
                sort_quantity.push({id:val.menu_id,quantity:quantity})
            })
            sort_quantity.sort(function(a, b){
                if(a.quantity < b.quantity) { return 1; }
                if(a.quantity > b.quantity) { return -1; }
                return 0;
            });
            sort_quantity.map(data=>{
                menuList.map(menu=>{
                    if(menu.menu_id == data.id){
                        most_favorite.push(menu)
                    }
                })
            })
            setMenuList(most_favorite)
        }
        set_sort_value(value)
    }
    
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <View style={{justifyContent:"flex-start",flexDirection:"row",alignItems:"center",
        marginStart:5,borderBottomColor:"#DDDEDD",borderBottomWidth:2}}>
            <Icon
                name = "sort"
                type = "materialicon"
                size = {30}
            />
            <Picker
                selectedValue = { sort_value }
                style         = { { height: 50, width: 170,}}
                onValueChange = { (itemValue) => { sort_menu(itemValue) } }
            >
                <Picker.Item label = "Name" value = "Name" />
                <Picker.Item label = "Price" value = "Price" />
                <Picker.Item label = "Most Favorite" value = "Most Favorite" />
            </Picker>
        </View>
        <ScrollView>
            {
                menuList.map((data, key)=>(                
                    <ListItem key = {key} bottomDivider>
                        <Avatar style = {{width:80, height:80, resizeMode:'contain'}} source = { require('../assets/menu.png' ) } />
                        <View style = {{justifyContent:'center', alignItems:'flex-start', flexDirection:'column'}}>
                            <Text>
                                {data.menu_name}
                            </Text>
                            <Text>
                                {"Rp. "+ (data.menu_price-(data.menu_price*(data.menu_discount/100))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Text>
                            <Text>
                                {"Total Ordered: "+data.total_order}
                            </Text>
                            {(()=>{
                                if(data.menu_status == "Available"){
                                    return(
                                        <Text>
                                            {data.menu_status}
                                        </Text>
                                    )
                                }else{
                                    return(
                                        <Text style={{color:'#b30000'}} >
                                            {data.menu_status}
                                        </Text>
                                    )
                                }
                            })()}
                            {(()=>{
                                if(data.menu_discount > 0){
                                    return(
                                        <Text>
                                            {"Discount: "+data.menu_discount+"%"}
                                        </Text>
                                    )
                                }
                            })()}
                        </View>
                        <View style = {{flex:1, justifyContent:'flex-end', flexDirection:'row', alignItems:'center'}} >
                            {
                                total.map(thisData=>{
                                    if(thisData.menu_id == data.menu_id){
                                        if(thisData.menu_total > 0){                                        
                                            return(
                                                <>
                                                    <Button 
                                                        containerStyle={{ float:'right'}} 
                                                        onPress={()=>{ minusTotal(data)}} 
                                                        titleStyle={{fontSize:30}} 
                                                        type='contained' 
                                                        title="-" 
                                                    />  
                                                    <Text>
                                                        {thisData.menu_total}
                                                    </Text>
                                                </>
                                            )                                             
                                        }
                                        else{
                                            return(
                                            <Text>
                                                {thisData.menu_total}
                                            </Text>
                                        )
                                    }
                                    }
                                })
                            }
                            {
                                total.map(thisData=>{
                                    if(thisData.menu_id == data.menu_id){
                                        if(data.menu_status == "Available"){
                                            if(thisData.menu_total < 10){ 
                                                return(
                                                    <Button 
                                                        containerStyle={{ float:'right'}} 
                                                        titleStyle={{fontSize:30}}
                                                        onPress={()=>{addTotal(data)}}
                                                        type='contained' 
                                                        title="+"
                                                    />
                                                )
                                            }
                                        }
                                        }
                                    })
                            }                            
                        </View>                    
                    </ListItem>                                                  
                ))
            }
        </ScrollView>
        {(()=>{
            if(ordered == true){
                return(
                    <View 
                        style = {{
                            justifyContent:'center',
                            alignItems:'center',
                            flexDirection:'row',
                            width:"100%",      
                            margin:0,
                            padding:0,                  
                            position:'absolute',
                            bottom:30,
                        }}
                    >
                        <View style={{width:'90%'}}>
                            <ListItem 
                                containerStyle={{width:'100%',backgroundColor:"#009826",borderRadius:5}} 
                                onPress={ ()=>{setOpenDialog(true)} }
                            >
                                <ListItem.Content>
                                    <Text style={{color:"white"}}>{orderedItem + " item(s)"}</Text>                                    
                                </ListItem.Content>  
                                <ListItem.Content>            
                                    <Text style={{color:"white"}}>{"Rp. "+ orderedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Text>               
                                </ListItem.Content>   
                                <ListItem.Chevron color="white" size = {20} onPress = { ()=>{setOpenDialog(true)} }/>
                            </ListItem>
                        </View>
                    </View>
                )
            }
        })()}
    
        <Dialog isVisible = {openDialog} onBackdropPress = {()=>{setOpenDialog(false)}}  >
            <Dialog.Title title='Your Order'/>
            <Divider/>
            <View style = {{justifyContent : 'center', alignItems: 'center', flexDirection:'column'}}>
                <Input style={{marginTop:20}} placeholder='Name' value={name} onChangeText={setName} />                
                <Input placeholder='Table Number' value={table} onChangeText={setTable} />      
                {
                    total.map((data, key)=>(
                        menuList.map((val)=>{
                            if(val.menu_id == data.menu_id){
                                if(data.menu_total > 0){
                                    return(
                                        <ListItem key={key} style={{width:"100%"}} containerStyle={{justifyContent:'flex-end'}}>
                                            <ListItem.Content>
                                                <Text>{val.menu_name}</Text>                                    
                                            </ListItem.Content>  
                                            <Text>
                                                {"x " + data.menu_total}
                                            </Text>
                                            <View style = {{flex:1}}>
                                            <Text style={{textAlign:'right'}}>
                                                {val.menu_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </Text>
                                            </View>                                            
                                        </ListItem>
                                    )
                                }
                            }
                        })
                    ))
                }   
                <ListItem key="Total Order" style={{width:"100%"}} containerStyle={{justifyContent:'flex-end'}}>
                    <ListItem.Content>
                        <Text>TOTAL</Text>                                    
                    </ListItem.Content>  
                    <Text></Text>
                    <View style = {{flex:1}}>
                    <Text style={{textAlign:'right'}}>
                        {orderedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                    </View>                                            
                </ListItem>       
                <View 
                    style = {{
                        justifyContent:'center',
                        alignItems:'center',
                        width:"100%",      
                        marginTop:30,
                        padding:0,                  
                        position:'relative',
                        bottom:10,
                    }}
                >
                    <View style={{width:"100%"}} >                    
                        <Button                             
                            title="ORDER" 
                            type='solid' 
                            onPress={(e)=>{Order(e)}} 
                            color='primary' 
                            disabled={(()=>{
                                if(name == "" || table == ""){
                                    return true
                                }else{
                                    return false
                                }
                            })()} 
                        />
                    </View>
                    <View style={{width:"100%",marginTop:20}} >                    
                        <Button                             
                            title="CLOSE" 
                            type='solid'
                            buttonStyle={{backgroundColor:"#6B6E6C"}}
                            onPress={()=>{setOpenDialog(false)}}   
                        />
                    </View>
                </View>
            </View>
            
        </Dialog>
    </View>
    
  )
}
