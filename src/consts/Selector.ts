import axios from "axios";
import { ImageId } from "../redux";

/*
 * str: chuoi cat
 * maxlimit: do dai toi da, cat - 3 ki tu
 */
export function SlugStr(str: string, maxlimit: number): string {
    if (str.length >= maxlimit) {
        return str.substring(0, maxlimit - 3) + " ...";
    }
    return str
}
export function SlugStrTitle(str: string, maxlimit: number): string {
    if (str.length >= maxlimit) {
        return str.substring(0, maxlimit - 3);
    }
    return str
}

export function handleCats(arr: string[]): string {
    let data: string[] = [];
    arr.forEach((item: string) => {
        let str = item.split(',')
        if (!data.includes(str[0])) {
            data.push(str[0])
        }
        data.push(str[1])
    });
    const result: string = data.join(',')
    return result;
}

export function getCategories(categories: any): any[] {
    let results = []
    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].categories.length; j++) {
            results.push({
                value: `${categories[i].category_id},${categories[i].categories[j].category_id}`,
                label: categories[i].categories[j].category_name
            })
        }
    }
    return results;
}

export function saveImage(img: any, obj: ImageId) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data;'
        }
    };
    var data = new FormData();
    data.append('file', img);
    return axios.post(`${cansa[0]}/api/image/save/e4611a028c71342a5b083d2cbf59c494`, data, config).then(
        (resp: any) => {
            const avatar_user = resp.data.data.image_id;
            obj.id = avatar_user;
        });
}

export function updateImage(img: any, id_avatar: number, obj: ImageId) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data;'
        }
    };
    var data = new FormData();
    data.append('file', img);
    return axios.post(`${cansa[0]}/api/image/update/${id_avatar}/e4611a028c71342a5b083d2cbf59c494`, data, config).then(
        (resp: any) => {
            const avatar_user = resp.data.data.image_id;
            obj.id = avatar_user;
        });
}


export const cansa =
    ["http://20.92.229.217:333",
        "https://20.92.229.217/:443"];
        
export const chatSever = 'https://20.92.229.217:4320';



export function vnd(n: number | string) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
