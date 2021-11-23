import {HS_API_END_POINT} from '../../Shared/env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';


export async function downloadPdfBook(id) {
    // 유저 정보 추가로 필요
    // key는 "pdf_" + id
    const storageKey = "pdf_" + id;

    axios.get(HS_API_END_POINT + "/download/pdf", {params: {id: 1}}).then(async (res) => {
        const pdfDirPath = RNFS.DocumentDirectoryPath + "/pdf/";
        console.log(pdfDirPath);
        const data = res.data.data;
        console.log(data);
        if (!await RNFS.exists(pdfDirPath)) {
           await RNFS.mkdir(pdfDirPath);
        }
        RNFS.writeFile(pdfDirPath + data.fileName, data.bytes, 'base64');
        const localData = {
            book_id: id,
            fileName: data.fileName,
            title: data.title,
        }
        await AsyncStorage.setItem(storageKey, JSON.stringify(localData));
        const tt = await AsyncStorage.getItem(storageKey);
        console.log(JSON.parse(tt));
    })
}

export async function downloadPdfKeys(book_id) {
    // 유저 정보 추가로 필요
    const storageKey = "pdf_" + book_id;

    const response = axios.get(HS_API_END_POINT + "/key" + "/pdf_test", {params: {book_id: book_id}});
    var keys = await response.then((res) => res.data.data);
    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        const keyWordArray = new TextDecoder().decode(new Uint8Array(element.aesKey));
        const ivWordArray = new TextDecoder().decode(new Uint8Array(element.iv));
        keys[i] = {
            ...keys[i],
            aesKey: keyWordArray,
            iv: ivWordArray
        }
    }
    const itemPromise = AsyncStorage.getItem(storageKey);
    itemPromise.then(item => {
        var itemData = JSON.parse(item);
        itemData = {
            ...itemData,
            keys: keys
        }
    })
    console.log(keys);
}