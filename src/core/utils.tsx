export const emailValidator = (email: string) => {
    // const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Email cannot be empty.';
    // if (!re.test(email)) return 'Ooops! We need a valid email address.';

    return '';
};


export const shopNameValidator = (name: string) => {
    if (!name) {
        return 'Không được để trống Tên Shop.';
    }
    else if (name.length <= 3) {
        return 'Tên shop phải nhiều hơn 3 ký tự';
    }
    return '';
};
export const shopDescriptionValidator = (name: string) => {
    if (!name) {
        return 'Không được để trống Mô tả Shop';
    }
    else if (name.length <= 20) {
        return 'Mô tả Shop phải nhiều hơn 20 ký tự';
    }
    return '';
};
export const imgValidator = (name: string) => {
    if (name != '../../../assets/arrow_back.png') {
        return 'Không được để trống Ảnh';
    }
    return '';
};