import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import TabTest from "./TabTest";
import Second from "./Second";
import GirlPhoto from './GirlPhoto';
import SendTest from './SendTest';
import WebTest from './GitTest/WebTest';
import One from './One/One';
import Author from "./One/Author";
import ReadList from "./One/ReadList";
import moviesTest from './movies/moviesTest';
import VideoTest from './movies/VideoTest';
import Menu from './Draw/HomeMenu';
import DetailZ from "./zhiHu/DetailZ";
import HomeZ from "./zhiHu/HomeZ";
const setup=StackNavigator({
    TabTest:{screen:TabTest,
        navigationOptions:{
        header:null,
     }
    },
    Second:{screen:Second},
    WebTest:{screen:WebTest},
    moviesTest:{screen:moviesTest,
        navigationOptions :() => ({
            header:null
        })
    },
    VideoTest:{screen:VideoTest,
        navigationOptions :() => ({
            header:null
        })
    },
        Menu:{screen:Menu,
            navigationOptions :() => ({
                header:null
            })
        },
        One:{screen:One},
        Author:{screen:Author},
        ReadList:{screen:ReadList},
        SendTest:{screen:SendTest,
            navigationOptions :() => ({
                header:null
            })
        },
        HomeZ:{screen:HomeZ,
            navigationOptions:{
                header:null
            }
        },
        DetailZ:{screen:DetailZ},
        GirlPhoto:{screen:GirlPhoto},

},{
    initialRouteName:'TabTest',
   }
);
export default setup;
