import React, { useState, useRef, useEffect } from 'react';
import { LogBox, View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import COLORS from '../../consts/Colors';
import { Controller, useForm } from "react-hook-form";
import { getCategories, handleCats, saveImage } from '../../consts/Selector';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryModel, CategoryState, getCategory, ImageId, insertProduct, ProductModel, ProductState, ShopModel, ShopState, State } from '../../redux';
import { useNavigation } from '../../utils/useNavigation';

interface CategoriesProps {
    label: string,
    value: string
}

export default function AddProduct(props: any) {
    const { navigate } = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { navigation } = props;
    const [avatar, setAvatar] = useState('https://103.207.38.200:333/api/image/photo/46/e4611a028c71342a5b083d2cbf59c494');
    const [images, setImages] = useState<any>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [catError, setCatError] = useState<boolean>(false);
    const [avatarError, setAvatarError] = useState<boolean>(false);
    const [isInsert, setIsInsert] = useState<boolean>(false);
    const [categoriesRender, setCategoriesRender] = useState<CategoriesProps[]>([] as CategoriesProps[]);
    const multiSelect = useRef<any>()
    const categoryState: CategoryState = useSelector((state: State) => state.categoryReducer);
    const shopState: ShopState = useSelector((state: State) => state.shopReducer);
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const dispatch = useDispatch();
    const { info }: { info: ShopModel } = shopState;
    const { productShop }: { productShop: ProductModel[] } = productState;
    const { categories }: { categories: CategoryModel[] } = categoryState;

    useEffect(() => {
        if (productShop && isInsert) {
            setIsInsert(false);
            navigate('ManagerProduct')
        }
    }, [productState])

    useEffect(() => {
        const catRenders = getCategories(categories);
        setCategoriesRender(catRenders)
    }, [categories])

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        dispatch(getCategory());
    }, [])


    const onSelectedItemsChange = (selectedItems: any) => {
        setCatError(false)
        setSelectedItems(selectedItems);
    };

    let getImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    };


    const deleteImages = (index: number) => {
        let data = [...images]
        data.splice(index, 1);
        setImages(data);
    }

    const getGallerys = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            let img = (
                <Avatar
                    size="xlarge"
                    title="CR"
                    activeOpacity={0.7}
                    source={{ uri: result.uri }}
                />
            )
            let data: any[] = [...images, img]
            setImages(data);
        }
    }

    const onSubmit = (data: any) => {
        setIsInsert(true);
        if (selectedItems.length >= 1 && images.length >= 1) {
            if (avatar !== 'https://103.207.38.200:333/api/image/photo/46/e4611a028c71342a5b083d2cbf59c494') {
                let cats = handleCats(selectedItems);
                let _avatar: ImageId = { id: 0 };
                const avatar_img = {
                    uri: avatar,
                    name: 'userProfile.jpg',
                    type: 'image/jpg'
                }
                const saveAvt: Promise<void> = saveImage(avatar_img, _avatar);

                let saveImg: Promise<void>[] = [];
                let __images: ImageId[] = [] as ImageId[];

                images.map((item: any, index: number) => {
                    __images.push({ id: 0 });
                    const _img = {
                        uri: item.props.source.uri,
                        name: 'userProfile.jpg',
                        type: 'image/jpg'
                    }
                    saveImg.push(saveImage(_img, __images[index]));
                })

                Promise.all([...saveImg, saveAvt]).then(() => {
                    let product_images = __images.map((item: any) => item.id);

                    data = {
                        ...data,
                        product_avatar: _avatar.id,
                        product_categories: cats,
                        product_image: product_images.join(",")
                    }
                    dispatch(insertProduct(data, info.shop_id));
                    setCatError(false)
                    setAvatarError(false)
                })


            } else {
                setIsInsert(false);
                setAvatarError(true)
            }

        }
        else {
            setIsInsert(false);
            Alert.alert('Sai cc gì rồi')
            setCatError(true)
        }
    }

    return (
        isInsert ?
            (<View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>) :
            <View style={styles.container}>
                <HeaderTitle title="Thêm sản phẩm" />
                <View style={styles.header}>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                    <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
                        <View style={styles.viewTotal}>
                            <Text style={styles.txtTitle}>Tên :</Text>
                            <View style={styles.textAreaContainer} >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        maxLength: 255
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.textArea}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            underlineColorAndroid="transparent"
                                            placeholder="Tên sản phẩm . . ."
                                            placeholderTextColor="#888"
                                            numberOfLines={10}
                                            multiline={true}
                                            value={value}
                                            maxLength={255}
                                        />
                                    )}
                                    name="product_title"
                                    defaultValue=""
                                />
                            </View>
                            {errors.product_title && <Text style={styles.txtError}>Tên sản phẩm phải có</Text>}
                        </View>
                        <View style={styles.viewTotal}>
                            <Text style={styles.txtTitle}>Danh mục :</Text>
                            <View style={{ marginBottom: 10 }}>
                                {multiSelect.current && multiSelect.current.getSelectedItemsExt(selectedItems)}
                            </View>
                            {
                                categoriesRender &&
                                <MultiSelect
                                    styleListContainer={{ height: 256 }}
                                    hideTags
                                    items={categoriesRender}
                                    ref={multiSelect}
                                    uniqueKey="value"
                                    onSelectedItemsChange={onSelectedItemsChange}
                                    selectedItems={selectedItems}
                                    selectText="Danh mục"
                                    searchInputPlaceholderText="Chọn danh mục..."
                                    tagRemoveIconColor="#fc6161"
                                    tagBorderColor={COLORS.primary}
                                    tagTextColor="#222"
                                    selectedItemTextColor="#666464"
                                    selectedItemIconColor={COLORS.primary}
                                    itemTextColor="#222"
                                    displayKey="label"
                                    fontSize={16}
                                    searchInputStyle={{ color: '#222', fontSize: 16, padding: 10 }}
                                    hideSubmitButton
                                />
                            }
                            {catError && <Text style={styles.txtError}>Phải chọn ít nhất 1 danh mục</Text>}
                        </View>

                        <View style={styles.viewTotal}>
                            <Text style={styles.txtTitle}>Hình ảnh chính :</Text>
                            <View style={styles.textAreaContainer} >
                                <Avatar
                                    size="xlarge"
                                    title="CR"
                                    onPress={getImg}
                                    activeOpacity={0.7}
                                    source={{ uri: avatar }}
                                    containerStyle={{ flex: 5, marginRight: 60 }}
                                />
                            </View>
                            {avatarError && <Text style={styles.txtError}>Bạn chưa chọn ảnh đại diện sản phẩm</Text>}

                        </View>

                        <View style={styles.viewTotal}>
                            <TouchableOpacity onPress={getGallerys} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.txtTitle}>Thêm hình ảnh phụ </Text>
                                <MaterialIcons name="add-chart" style={{ fontSize: 20, fontWeight: 'bold' }} />
                            </TouchableOpacity>
                            {
                                images.map((item: any, index: number) => {
                                    return (
                                        <View key={index}>
                                            {
                                                item
                                            }
                                            <Button title="Xóa hình" onPress={() => deleteImages(item)} />
                                        </View>
                                    )
                                })
                            }

                        </View>

                        <View style={styles.viewTotal}>
                            <Text style={styles.txtTitle}>Giá :</Text>
                            <View style={styles.viewPrice} >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        min: 1000,
                                        pattern: /[0-9]/g
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.textPrice}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            underlineColorAndroid="transparent"
                                            placeholder="Nhập giá tiền . . ."
                                            placeholderTextColor="#888"
                                            keyboardType="numeric"
                                            multiline={true}
                                            value={value}
                                        />
                                    )}
                                    name="product_price"
                                    defaultValue=""
                                />
                            </View>
                            {errors.product_price && <Text style={styles.txtError}>Giá là số và phải lớn hơn 1.000đ</Text>}
                        </View>
                        <View style={styles.viewTotal}>
                            <Text style={styles.txtTitle}>Phần trăm giảm giá :</Text>
                            <View style={styles.viewPrice} >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: false,
                                        min: 1,
                                        max: 99,
                                        pattern: /[0-9]/g
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.textPrice}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            underlineColorAndroid="transparent"
                                            placeholder="Nhập phần trăm giảm nếu có ( 1 - 99 )"
                                            placeholderTextColor="#888"
                                            keyboardType="numeric"
                                            multiline={true}
                                            value={value}
                                        />
                                    )}
                                    name="product_sale"
                                    defaultValue=""
                                />
                            </View>
                            {errors.product_sale && <Text style={styles.txtError}>Nhập phần trăm giảm nhập số (1 - 99) </Text>}
                        </View>
                        <View style={styles.viewTotal}>
                            <Text style={styles.txtTitle}>Mô tả :</Text>
                            <View style={styles.textAreaContainer} >
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        maxLength: 1000
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.textAreaDesc}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            underlineColorAndroid="transparent"
                                            placeholder="Mô tả sản phẩm . . ."
                                            placeholderTextColor="#888"
                                            numberOfLines={10}
                                            multiline={true}
                                            value={value}
                                        />
                                    )}
                                    name="product_description"
                                    defaultValue=""
                                />
                            </View>
                            {errors.product_description && <Text style={styles.txtError}>Mô tả phải có và ít hơn 1000 ký tự</Text>}
                        </View>
                        <View style={styles.viewTotal}>
                            <Button
                                onPress={handleSubmit(onSubmit)}
                                title="Thêm sản phẩm"
                                buttonStyle={styles.btnContinute}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 34,
        left: 5,
        right: 0,
        zIndex: 2
    },
    txtError: {
        color: '#f86161'
    },
    viewPrice: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    viewPicker: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    viewTotal: {
        marginHorizontal: 15,
        margin: 10,
    },
    btnContinute: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10
    },
    textPrice: {
        fontSize: 18,
        marginBottom: 5
    },
    txtTitle: {
        fontSize: 18,
        color: '#666464',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 60,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        lineHeight: 30,
        textAlignVertical: "top",
        padding: 8,
        fontSize: 18,
    },
    textAreaDesc: {
        height: 150,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        lineHeight: 30,
        textAlignVertical: "top",
        paddingHorizontal: 8,
        paddingVertical: 12,
        fontSize: 18,
    }
});
