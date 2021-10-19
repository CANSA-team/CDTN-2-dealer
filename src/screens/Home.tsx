import React from 'react'
import { View ,StyleSheet,Text } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Menu from '../components/Menu';

export default function Home() {
    return (
        <View style={styles.container}>
            <HeaderBar />
            <View style={styles.menuList}>
                <Menu />
                <Menu />
                <Menu />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    menuList: {
        flex: 1,
        marginTop:30,
        marginHorizontal:15
    }
});