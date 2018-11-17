import { Dimensions } from 'react-native';

// 设备宽度，单位 dp
const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
const uiWidthPx = 393;
const uiHeightPy = 658;
const one = deviceHeightDp/uiHeightPy;
const two = deviceWidthDp/uiWidthPx;
export const pSize=(size)=> {
    if(one>two){
        return size*two;
    }else{
        return size*one;
    }

};
export const pWidth = (uiElePx) => {
    console.log(deviceWidthDp);
    return uiElePx * deviceWidthDp / uiWidthPx;
};
export const pHeight = (uiElePy) => {
    console.log(deviceHeightDp);
    return uiElePy * deviceHeightDp / uiHeightPy;
};