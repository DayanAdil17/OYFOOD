import React, {useState} from 'react';
import { View, StyleSheet, Button, Text, Modal } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ReactNativeElements from 'react-native-elements';

import SplashScreen from './resource/SplashScreen';
import Login from './resource/Login'
import Dashboard from './resource/Dashboard';
import AvailableMenu from './resource/AvailableMenu';
import OrderPage from './resource/OrderPage';
import DashboardAdmin from './resource/DashboardAdmin';
import History from './resource/History';
import ActiveOrder from './resource/ActiveOrder';
import MenuManagement from './resource/MenuManagement';
// function SplashScreen() {
//     return (
//         <View>
//             <Text>Loading...</Text>
//         </View>
//     );
// }

export default function App() {

    const AuthContext                 = React.createContext();
    const Stack                       = createNativeStackNavigator();
    const [modal,set_modal]           = useState(false);
    const [modal_text,set_modal_text] = useState('');
    const [user,set_user]             = useState({});
    const [scan_type,set_scan_type]   = useState("");
    const [open_chat,set_open_chat]   = useState({});
    const [test, setTest] = React.useState(8008)
   
    const [pageBefore, setPageBefore] = React.useState("")
    
    const [progress, setProgress]     = React.useState(false)
    const [intervals, setIntervals]     = React.useState()

    const ip_address = 'http://192.168.1.6/';

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken : action.token,
                        isLoading : false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout : false,
                        userToken : action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout : true,
                        userToken : null,
                        qrcodeLogin : false,
                    };
                case 'DASHBOARD_PAGE':
                    return {
                        ...prevState,
                        page: "dashboard_page"
                    };
                case 'AVAILABLE_MENU':
                    return {
                        ...prevState,
                        page: "available_menu"
                    };
                case 'ORDER_PAGE':
                    return {
                        ...prevState,
                        page: "order_page"
                    };
                case 'LOGIN_PAGE':
                    return {
                        ...prevState,
                        page: "login_page"
                    };
                case 'DASHBOARD_ADMIN_PAGE':
                    return {
                        ...prevState,
                        page: "dashboard_admin_page"
                    };
                case 'HISTORY_PAGE':
                    return {
                        ...prevState,
                        page: "history_page"
                    };
                case 'ACTIVE_ORDER_PAGE':
                    return {
                        ...prevState,
                        page: "active_order_page"
                    };
                case 'MENU_MANAGEMENT_PAGE':
                    return {
                        ...prevState,
                        page: "menu_management_page"
                    };
            }
        },
        {
            isLoading   : true,
            isSignout   : false,
            userToken   : null,
            page        : "dashboard_page"
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        // setTimeout(setProgress(true),5000)
        // setIntervals(
        //   setInterval(()=>{
        //     setProgress((prevProgress)=> prevProgress >= 100 ? 101 : prevProgress + 5)
        //   }, 100)

        // )
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ( {
            signIn        : async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token
                fetch(ip_address+'DeviceAPI/login.php',{
                    method:'POST',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username : data.username,
                        password : data.password,
                        token    : data.user_token,            
                        type     : data.sign_in_type
                    })
                }).then((response) => response.json()).then((responseJson) => {          
                    
                });        
            },
            signOut          : () => dispatch({ type: 'SIGN_OUT' }),
            signUp           : async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            dashboardPage    : () => dispatch({ type: 'DASHBOARD_PAGE' }),
            AvailableMenu    : () => dispatch({ type: 'AVAILABLE_MENU' }),
            OrderPage    : () => dispatch({ type: 'ORDER_PAGE' }),           
            LoginPage    : () => dispatch({ type: 'LOGIN_PAGE' }),
            DashboardAdminPage    : () => dispatch({ type: 'DASHBOARD_ADMIN_PAGE' }),
            HistoryPage    : () => dispatch({ type: 'HISTORY_PAGE' }),
            ActiveOrderPage    : () => dispatch({ type: 'ACTIVE_ORDER_PAGE' }),
            MenuManagementPage    : () => dispatch({ type: 'MENU_MANAGEMENT_PAGE' }),
        }),
    []);

    return(
        <AuthContext.Provider value = { authContext }>

            <NavigationContainer>
                <Stack.Navigator>
                    {(()=>{
                        if(state.page == "dashboard_page"){
                            return(
                                <Stack.Screen 
                                    name = "Dashboard"
                                    options   = { {
                                        title:'',
                                        headerTitleStyle:{
                                            fontSize:16,
                                            marginLeft:15
                                        },
                                        headerLeft: () => (                                   
                                            <Text style={{fontSize:16,}}>OYFOOD - Hello, welcome!</Text>
                                        ),
                                    }}
                                >
                                {()=>
                                <Dashboard 
                                AuthContext = { AuthContext } 
                                test = {test}
                                setTest = {setTest}
                                setPageBefore = {setPageBefore}
                                />
                                }
                                </Stack.Screen>
                            )
                        }else if(state.page == "available_menu"){
                        return(
                            <Stack.Screen
                            name = "Available Menu"
                            options   = { {
                            title:'',
                            headerTitleStyle:{
                                fontSize:16,
                                marginLeft:15
                            },
                            headerLeft: () => (
                                <>
                                    <ReactNativeElements.Icon
                                        name    = 'arrowleft'
                                        type    = 'antdesign'
                                        color   = 'black'
                                        size    = {30}
                                        onPress = { authContext.dashboardPage } 

                                    />
                                    <Text style={{marginStart:10,fontSize:16,}}>AVAILABLE MENU</Text>
                                </>
                            ),
                        }} 
                            >
                            {()=><AvailableMenu
                            AuthContext = { AuthContext } 
                            dispatch    = { dispatch }
                            connection  = { ip_address }                            
                            setPageBefore = {setPageBefore}
                            />}
                            </Stack.Screen>
                        )
                        }else if(state.page == "order_page"){
                            return(
                                <Stack.Screen
                                name = "Order List"
                                options   = { {
                                title:'',
                                headerTitleStyle:{
                                    fontSize:16,
                                    marginLeft:15
                                },
                                headerLeft: () => (
                                    <>
                                        <ReactNativeElements.Icon
                                            name    = 'arrowleft'
                                            type    = 'antdesign'
                                            color   = 'black'
                                            size    = {30}
                                            onPress = { (()=>{
                                                if(pageBefore == "DashboardPage"){
                                                return authContext.dashboardPage
                                                }else if(pageBefore == "AvailableMenu"){
                                                return authContext.AvailableMenu
                                                }
                                            })() } 

                                        />
                                        <Text style={{marginStart:10,fontSize:16,}}>Waiting List</Text>
                                    </>
                                ),
                            }} 
                                >
                                {()=><OrderPage
                                AuthContext = { AuthContext } 
                                dispatch    = { dispatch }
                                connection  = { ip_address }  
                                pageBefore = {pageBefore}
                                />}
                                </Stack.Screen>
                            )
                        }else if(state.page == "login_page"){
                            return(
                                <Stack.Screen 
                                    name = "Login"
                                    options   = { {
                                        title:'',
                                        headerTitleStyle:{
                                            fontSize:16,
                                            marginLeft:15
                                        },
                                        headerLeft: () => (  
                                            <>
                                                <ReactNativeElements.Icon
                                                    name    = 'arrowleft'
                                                    type    = 'antdesign'
                                                    color   = 'black'
                                                    size    = {30}
                                                    onPress = { authContext.dashboardPage } 
            
                                                />                                 
                                                <Text style={{fontSize:16,marginStart:10}}>OYFOOD - Admin Login</Text>
                                            </>
                                        ),
                                    }}
                                >
                                {()=>
                                    <Login
                                        AuthContext = { AuthContext } 
                                        connection = {ip_address}
                                        dispatch    = { dispatch }
                                    />
                                }
                                </Stack.Screen>
                            )
                        }else if(state.page == "dashboard_admin_page"){
                            return(
                                <Stack.Screen 
                                    name = "Dashboard Admin"
                                    options   = { {
                                        title:'',
                                        headerTitleStyle:{
                                            fontSize:16,
                                            marginLeft:15
                                        },
                                        headerLeft: () => (                                   
                                            <Text style={{fontSize:16,}}>OYFOOD - Dashboard Admin</Text>
                                        ),
                                    }}
                                >
                                {()=>
                                    <DashboardAdmin
                                        AuthContext = { AuthContext } 
                                        connection = {ip_address}
                                    />
                                }
                                </Stack.Screen>
                            )
                        }else if(state.page == "history_page"){
                            return(
                            <Stack.Screen
                                name = "History"
                                options   = { {
                                    title:'',
                                    headerTitleStyle:{
                                        fontSize:16,
                                        marginLeft:15
                                    },
                                    headerLeft: () => (
                                        <>
                                            <ReactNativeElements.Icon
                                                name    = 'arrowleft'
                                                type    = 'antdesign'
                                                color   = 'black'
                                                size    = {30}
                                                onPress = { authContext.DashboardAdminPage } 
        
                                            />
                                            <Text style={{marginStart:10,fontSize:16,}}>Customer Order History</Text>
                                        </>
                                    ),
                                }} 
                            >
                                {()=>
                                    <History
                                        AuthContext = { AuthContext } 
                                        dispatch    = { dispatch }
                                        connection  = { ip_address }  
                                    />
                                }
                            </Stack.Screen>
                            )
                        }else if(state.page == "active_order_page"){
                            return(
                                <Stack.Screen
                                name = "Active Order List"
                                options   = { {
                                title:'',
                                headerTitleStyle:{
                                    fontSize:16,
                                    marginLeft:15
                                },
                                headerLeft: () => (
                                    <>
                                        <ReactNativeElements.Icon
                                            name    = 'arrowleft'
                                            type    = 'antdesign'
                                            color   = 'black'
                                            size    = {30}
                                            onPress = { authContext.DashboardAdminPage } 

                                        />
                                        <Text style={{marginStart:10,fontSize:16,}}>Customer Order List</Text>
                                    </>
                                ),
                            }} 
                                >
                                {()=><ActiveOrder
                                    AuthContext = { AuthContext } 
                                    dispatch    = { dispatch }
                                    connection  = { ip_address }  
                                />}
                                </Stack.Screen>
                            )
                        }else if(state.page == "menu_management_page"){
                            return(
                                <Stack.Screen
                                name = "Menu Management"
                                options   = { {
                                title:'',
                                headerTitleStyle:{
                                    fontSize:16,
                                    marginLeft:15
                                },
                                headerLeft: () => (
                                    <>
                                        <ReactNativeElements.Icon
                                            name    = 'arrowleft'
                                            type    = 'antdesign'
                                            color   = 'black'
                                            size    = {30}
                                            onPress = { authContext.DashboardAdminPage } 

                                        />
                                        <Text style={{marginStart:10,fontSize:16,}}>Menu Management</Text>
                                    </>
                                ),
                            }} 
                                >
                                {()=><ActiveOrder
                                    AuthContext = { AuthContext } 
                                    dispatch    = { dispatch }
                                    connection  = { ip_address }  
                                />}
                                </Stack.Screen>
                            )
                        }
                    })()}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )  
}

