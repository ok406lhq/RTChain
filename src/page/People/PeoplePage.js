'use strict';
/**
 * @author lam
 * @date 2018/9/3 11:14
 */

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import {Icon} from "native-base";

import ContactPickerBridge from "react-native-contacts-picker";

export default class PeoplePage extends Component {
    static navigationOptions = {
        tabBarLabel: '人脉',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/people_sel.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/people_nor.png')}/>
            );
        },
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: []
        };
    }


    componentDidMount() {
        ContactPickerBridge.getAllContact((result) => {
            this.setState({data: JSON.stringify(result.data)});
            // console.log(this.state.data);
            console.log(result);
            let contacts = [];
            for (let idx in result.data) {
                let phoneItem = result.data[idx];
                let phones = "";
                let phone1 = "";
                for (let index in phoneItem.phoneArray) {
                    let phone = phoneItem.phoneArray[index];
                    phone1 = phoneItem.phoneArray[0];

                    if (phones === "") {
                        phones = phone + phones;
                    } else {
                        phones = phones + " " + phone;
                    }
                }
                phoneItem["phoneArray"] = phones;
                phoneItem["phone1"] = phone1;


                let name = "";
                name = result.data[idx].name;
                phoneItem["name"] = name;

                contacts.push(phoneItem);

                this.setState({
                    data: contacts
                });
                console.log(this.state.data);
            }
        });
    }

    render() {
        return (
            <FlatList
                renderItem={this._renderItem}
                data={this.state.data}
            />
        );
    }

    _renderItem = (item) => {
        return (
            <View style={{
                paddingLeft: 20,
                paddingRight: 30,
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }}>
                <Image source={require("../../img/images.jpg")} style={{height: 60, width: 60}}/>
                <View style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexGrow: 1
                }}>
                    <View>
                        <Text style={styles.nameStyle}>{item.item.name}</Text>
                        <Text>{item.item.phone1 ? item.item.phone1 : "无号码"}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', width: 100}}>
                        <TouchableOpacity activeOpacity={.75} style={styles.btnStyle}
                                          onPress={() => {
                                          }}>
                            <Icon name='ios-call' style={styles.iconStyle}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.75} style={styles.btnStyle}
                                          onPress={() => {
                                          }}>
                            <Icon name='md-chatboxes' style={styles.iconStyle}/>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.75} style={styles.btnStyle}
                                          onPress={() => {
                                          }}>
                            <Icon name='ios-mail' style={styles.iconStyle}/>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabBarIcon: {
        width: 19,
        height: 19
    },
    nameStyle: {
        fontSize: 15,
        color: '#343434',
        fontWeight: 'bold',
    },
    btnStyle: {
        width: 30,
        height: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    iconStyle: {
        color: '#4597cd',
        fontSize: 24,
    },
});