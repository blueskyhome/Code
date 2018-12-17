import React, {Component} from 'react';
import {createStackNavigator} from  'react-navigation';
import Login from './Login';
import DrawTest from "./DrawTest";
import Person from './Person';
import Port from "./Port";
import Order from "./SendTwo";
import Send from './Send';
import ScanTest from './ScanTest'
import SendThree from './SendThree';
import OrderOne from './Order';
const Stack = createStackNavigator(
    {
       Login:{screen:Login},
       DrawTest:{screen:DrawTest},
       Person:{screen:Person},
       Port:{screen:Port},
       Send:{screen:Send},
       Order:{screen:Order},
       ScanTest:{screen:ScanTest},
       SendTest:{screen:SendThree},
        OrderOne:{screen:OrderOne}
    },
    {
        navigationOptions:{
            header:null
        },
       initialRouteName:'Login',
       mode:'card' ,
    }
);
export default Stack;