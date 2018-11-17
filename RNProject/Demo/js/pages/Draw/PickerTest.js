import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';

import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import area from './City.json';

export default class PickerTest extends Component {

    constructor(props, context) {
        super(props, context);
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _showAreaPicker() {

        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: ['重庆市', '重庆市', '万州区'],
            pickerCancelBtnText:"取消",
            pickerConfirmBtnText:"确认",
            pickerTitleText:"选择城市",
            onPickerConfirm: pickedValue => {
                let data = [];
                let i;
                for(i=0;i<pickedValue.length;i++){
                    data[i] = pickedValue[i];
                }
                console.log('area1', data[2]);
                let Data = {
                    name:data[2],
                };
                storage.save({
                    key:'city',
                    id:data[2],
                    data:Data,
                    expires:null,
                });
                this.props.Change(data[2]);
            },
            onPickerCancel: pickedValue => {
                console.log('area2', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                console.log('area3', pickedValue);
            }
        });
        Picker.show();
    }

    _toggle() {
        Picker.toggle();
    }

    render() {
        return (
                <TouchableOpacity style={{marginTop: 10, marginLeft: 20}} onPress={this._showAreaPicker.bind(this)}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Icon name={'add'} size={30}/>
                            <Text>添加城市</Text>
                        </View>
                </TouchableOpacity>
        );
    }
};