import React from 'react'
import { View, StyleSheet } from 'react-native';
import HeaderTitle from '../components/HeaderTitle';

export default function Chat() {
    return (
        <View style={styles.container}>
            <HeaderTitle title="Chat Screen"/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    } 
});