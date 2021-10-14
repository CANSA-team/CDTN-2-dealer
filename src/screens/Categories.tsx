import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../components/Category';
import CategorySub from '../components/CategorySub';
import SearchBarTop from '../components/SearchBarTop';
import {getCategory, State } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from './../consts/Colors';

export default function Categories() {
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const categoryState = useSelector((state: State) => state.categoryReducer);
    const { categories } = categoryState;
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const searchProduct = (data: any) => {
        navigate('Search', { data:data,title:'Tìm kiếm' })
    }

    useEffect(() => {
        dispatch(getCategory());
    }, [])

    useEffect(() => {
        if(categories){
            setIsLoading(true);
        }
    },[categoryState])

    const onTap = (id:number,title:string) => {
        navigate('Search', { data:id,title:title })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchBarTop onSearch={searchProduct} />
            </View>
            {
                !isLoading ?
                    (<View style={styles.container}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (
                        <View style={styles.categories}>
                            <View style={styles.categoriesRight}>
                                {
                                    categories && categories!.map((category, index) => (
                                        <View key={index}>
                                            <Category style={{ marginBottom: 10, padding: 2, flex: 1 }} item={category} index={index} catergoryIndex={catergoryIndex} onTap={() => setCategoryIndex(index)} />
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.categoriesLeft}>
                                {
                                    categories && categories![catergoryIndex].categories!.map((category, index) => (
                                        <View key={index} style={{ flex: 1, minWidth: '30%',marginBottom:20  }}>
                                            <CategorySub style={{ marginBottom: 30, flex: 1, marginLeft: 5, padding: 2 }} item={category} onTap={onTap}/>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    searchContainer: {
        marginTop: 30
    },
    categories: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 20,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    categoriesRight: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        justifyContent: 'flex-start',
        backgroundColor: '#e7f0ee',
        borderRightColor: '#ccc',
        borderRightWidth: 1
    },
    categoriesLeft: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        flexWrap:'wrap' 
    }
});
