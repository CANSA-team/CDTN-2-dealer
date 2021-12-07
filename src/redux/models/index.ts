
/**
 * Silder
 */
export interface SliderModel {
    slider_id: number;
    slider_image: string;
}

/**
 * Product
 */
export interface ProductModel {
    product_id: number;
    product_date: Date;
    shop_id: number;
    product_avatar: string;
    product_quantity: number;
    product_view: number;
    product_price: number;
    product_sale: number;
    product_title: string;
    product_image: string[];
    product_description: string;
    product_rating: number;
    last_update: number;
    product_image_id: number[];
    product_avatar_id: number;
    product_categories: ProductCat[];
    status: number;
}
export interface ProductCat {
    label: string;
    value: string;
}

//Product State
export interface ProductState {
    productShop: ProductModel[];
    error: string | undefined;
}

/**
 * User
 */
export interface UserModel {
    user_id: number;
    user_phone: string;
    user_email: string;
    user_key: null;
    user_name: string;
    user_avatar: string;
    user_status: number;
    user_last_update: number;
    user_real_name: string;
    user_birthday: Date;
    user_avatar_image: string;
}

/**
 * Comment
 */
export interface CommentModel {
    comment_id: number;
    comment_rating: number;
    comment_date: Date;
    comment_content: string;
    product_id: number;
    user: UserModel;
}

/**
 * Category
 */
export interface CategoryModel {
    category_id: number;
    category_image: string;
    category_view: number;
    category_name: string;
    last_update: number;
    status: number;
    categories: CategoryModel[];
}

/**
 * Shop
 */
export interface ShopModel {
    shop_id: number;
    shop_name: string;
    shop_description: string;
    shop_owner: number;
    shop_avatar: string;
    last_update: number;
    status: number;
    shop_avatar_id: number;
    info: ShopModel;
}

export interface ShopOrder {
    oder_id: string;
    oder_date: Date;
    oder_phone: string;
    status: number;
    product_oder: OderItemModel[];
}

export interface ShopRevenue {
    revenue_id: number,
    revenue_month: number,
    revenue_year: number,
    revenue_seasion: number,
    revenue_money: number,
    shop_id: number
}


/**
 * Cart Item
 */
export interface CartItemModel {
    qty: number;
    product: ProductModel;
}

/**
 * Cart
 */
export interface CartModel {
    cart: CartItemModel[];
    sub_price: number;
    ship: number;
    total_price: number;
}
export interface CartState {
    cart: CartModel;
    status: string;
    error: string | undefined;
}
/**
 * Oder Item
 */
export interface OderItemModel {
    oder_id: string,
    product_quantity: number,
    status: number,
    shop_id: number,
    product_avatar: string;
    product_price: number;
    product_sale: number;
    product_title: string;

}

/**
 * Oder
*/

export interface OderModel {
    oder_id: string;
    oder_address: string;
    oder_phone: string;
    oder_date: Date;
    oder_customer: number;
    product_oder: OderItemModel[];
    status: number;
}



export interface OderState {
    status?: string;
    oderList?: OderModel[];
    error: string | undefined;
}

export interface CategoryState {
    categories: CategoryModel[];
    error: string | undefined;
}

export interface SliderState {
    slider?: [SliderModel];
    error: string | undefined;
}

export interface CommentState {
    comment: CommentModel[];
    error: string | undefined;
}

export interface ShopState {
    info: ShopModel;
    order: ShopOrder[];
    revenue: ShopRevenue[];
    error: string | undefined;
    register_status: RegisterShopModel;
}

export interface AccessState {
    message: any;
    error: string | undefined;
}

export interface userModel {
    user_id: number,
    user_name: string,
    user_avatar: string,
    user_phone: string,
    user_profile_name: string,
    user_email: string,
}


export interface UserStage {
    check: boolean;
    checkFogotPassword: boolean;
    userInfor: UserModel;
    status: string;
    updateUser: number;
    error: string | undefined;
}

export interface ImageStage {
    status: string;
    image: string;
    error: string | undefined;
}

export interface ImageId {
    id: number;
}

export interface ChatStage {
    isChat: boolean | undefined;
}

//Dang ky shop
export interface RegisterShopModel {
    status: string;
    message: string;
}


