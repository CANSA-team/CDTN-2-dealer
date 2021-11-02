import React from 'react'
import { Text, ScrollView, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { flexDirection, marginRight } from 'styled-system'
import HeaderTitle from '../components/HeaderTitle'
import { SlugStr, SlugStrTitle } from '../consts/Selector'

export default function Notification(props: any) {
    const { navigation } = props;

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <HeaderTitle title="Thông báo của bạn" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>

            <ScrollView>

                {/* hiển thị thông báo */}
                <TouchableOpacity>
                    <View style={styles.container}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam maiores, veniam exercitationem rem, at esse, nostrum consequatur facere dolorum non. Incidunt quaerat cum molestias odio perferendis odit ea ducimus!", 40)} </Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{SlugStr("adsad as dasd asdasdasd asdasdasdasd asdasdasdsa dsadsadsadasdasdasdsa dasd asd saas dsadsadas dsa dsa dasdasd asdsadsadasdsaa", 70)}</Text>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 10 }}>20/10/2021 </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {/*  */}

                <TouchableOpacity>
                    <View style={styles.container}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam maiores, veniam exercitationem rem, at esse, nostrum consequatur facere dolorum non. Incidunt quaerat cum molestias odio perferendis odit ea ducimus!", 40)} </Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{SlugStr("adsad as dasd asdasdasd asdasdasdasd asdasdasdsa dsadsadsadasdasdasdsa dasd asd saas dsadsadas dsa dsa dasdasd asdsadsadasdsaa", 70)}</Text>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 10 }}>20/10/2021</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.container}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam maiores, veniam exercitationem rem, at esse, nostrum consequatur facere dolorum non. Incidunt quaerat cum molestias odio perferendis odit ea ducimus!", 40)} </Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{SlugStr("adsad as dasd asdasdasd asdasdasdasd asdasdasdsa dsadsadsadasdasdasdsa dasd asd saas dsadsadas dsa dsa dasdasd asdsadsadasdsaa", 70)}</Text>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 10 }}>20/10/2021</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.container}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam maiores, veniam exercitationem rem, at esse, nostrum consequatur facere dolorum non. Incidunt quaerat cum molestias odio perferendis odit ea ducimus!", 40)} </Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{SlugStr("adsad as dasd asdasdasd asdasdasdasd asdasdasdsa dsadsadsadasdasdasdsa dasd asd saas dsadsadas dsa dsa dasdasd asdsadsadasdsaa", 70)}</Text>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 10 }}>20/10/2021</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.container}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam maiores, veniam exercitationem rem, at esse, nostrum consequatur facere dolorum non. Incidunt quaerat cum molestias odio perferendis odit ea ducimus!", 40)} </Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{SlugStr("adsad as dasd asdasdasd asdasdasdasd asdasdasdsa dsadsadsadasdasdasdsa dasd asd saas dsadsadas dsa dsa dasdasd asdsadsadasdsaa", 70)}</Text>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 10 }}>20/10/2021</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.container}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam maiores, veniam exercitationem rem, at esse, nostrum consequatur facere dolorum non. Incidunt quaerat cum molestias odio perferendis odit ea ducimus!", 40)} </Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{SlugStr("adsad as dasd asdasdasd asdasdasdasd asdasdasdsa dsadsadsadasdasdasdsa dasd asd saas dsadsadas dsa dsa dasdasd asdsadsadasdsaa", 70)}</Text>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 10 }}>20/10/2021</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.container}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quam maiores, veniam exercitationem rem, at esse, nostrum consequatur facere dolorum non. Incidunt quaerat cum molestias odio perferendis odit ea ducimus!", 40)} </Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{SlugStr("adsad as dasd asdasdasd asdasdasdasd asdasdasdsa dsadsadsadasdasdasdsa dasd asd saas dsadsadas dsa dsa dasdasd asdsadsadasdsaa", 70)}</Text>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 10 }}>20/10/2021</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView >
        </View >


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },

    textView: {
        marginHorizontal: 10,
    },
    header: {
        padding: 5,
        position: 'absolute',
        top: 34,
        left: 5,
        zIndex: 2
    },
})
