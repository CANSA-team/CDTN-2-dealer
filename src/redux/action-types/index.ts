export enum ProductActionType{
    GET_PRODUCT_NEW = 'GET_PRODUCT_NEW',
    GET_PRODUCT_HOT = 'GET_PRODUCT_HOT',
    GET_PRODUCT_CATEGORY = 'GET_PRODUCT_CATEGORY',
    GET_PRODUCT = 'GET_PRODUCT',
    GET_PRODUCT_SEARCH = 'GET_PRODUCT_SEARCH',
    GET_PRODUCT_SHOP = 'GET_PRODUCT_SHOP',
    ON_PRODUCT_ERROR = 'ON_PRODUCT_ERROR'
}

export enum CartActionType{
    GET_ALL_CART = 'GET_ALL_CART',
    ADD_TO_CART = 'ADD_TO_CART',
    UPDATE_CART = 'UPDATE_CART',
    ON_CART_ERROR = 'ON_CART_ERROR'
}

export enum CategoryActionType{
    GET_ALL_CATEGORY = 'GET_ALL_CATEGORY',
    ON_CATEGORY_ERROR = 'ON_CATEGORY_ERROR'
}

export enum SliderActionType{
    GET_ALL_SLIDER = 'GET_ALL_SLIDER',
    ON_SLIDER_ERROR = 'ON_SLIDER_ERROR'
}

export enum CommentActionType{
    GET_ALL_COMMENT = 'GET_ALL_COMMENT',
    ADD_COMMENT ='ADD_COMMENT',
    ON_COMMENT_ERROR = 'ON_COMMENT_ERROR'
}

export enum ShopActionType{
    GET_SHOP_INFO = 'GET_SHOP_INFO',
    ON_SHOP_ERROR = 'ON_SHOP_ERROR',
    GET_SHOP_OWNER = 'GET_SHOP_OWNER',
}

export enum AccessActionType{
    UPDATE_ACCESS_INFO = 'UPDATE_ACCESS_INFO',
    ON_ACCESS_ERROR = 'ON_ACCESS_ERROR'
}

export enum UserActionType{
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    FORGOTT_PASSWORD = 'FORGOTT_PASSWORD',
    FORGOTT_PASSWORD_OTP = 'FORGOTT_PASSWORD_OTP',
    FORGOTT_PASSWORD_CENTER = 'FORGOTT_PASSWORD_CENTER',
    REGISTER = 'REGISTER',
    LOGIN_FACEBOOK = 'LOGIN_FACEBOOK',

    CHECK_LOGIN = 'CHECK_LOGIN',
    GET_UER_INFO = 'GET_UER_INFO',
    ON_LOGIN_ERROR = 'ON_LOGIN_ERROR'
}

export enum OderActionType{
    ADD_ORDER = 'ADD_ORDER',
    GET_ALL_ORDER = 'GET_ALL_ORDER',
    ON_ORDER_ERROR = 'ON_ORDER_ERROR'
}

export enum CommplaintActionType{
    ADD_COMPLAINT ='ADD_COMPLAINT',
    ON_COMPLAINT_ERROR = 'ON_COMPLAINT_ERROR'
}

export enum ImageActionType{
    GET_IMAGE ='GET_IMAGE',
    UPDATE_IMAGE ='UPDATE_IMAGE',
    ON_IMAGE_ERROR = 'ON_IMAGE_ERROR'
}