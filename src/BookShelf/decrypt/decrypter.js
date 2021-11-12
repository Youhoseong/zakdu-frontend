import CryptoJS from 'crypto-js';
import * as RNFS from 'react-native-fs';
import JSZip from 'jszip';
import {   
    PDFDocument,
    PDFRawStream,
    decodePDFRawStream,
    arrayAsString,
    PDFRef,
} from "pdf-lib";
import {decode} from 'base-64';
import {Buffer} from 'buffer';
const atob = decode;

FileReader.prototype.readAsArrayBuffer = function (blob) {
    if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
    this._setReadyState(this.LOADING);
    this._result = null;
    this._error = null;
    const fr = new FileReader();
    fr.onloadend = () => {
        const content = atob(fr.result.substring("data:application/octet-stream;base64,".length));
        console.log("여기" + fr.result.substring("data:application/octet-stream;base64,".length));
        const buffer = new ArrayBuffer(content.length);
        const view = new Uint8Array(buffer);
        view.set(Array.from(content).map(c => c.charCodeAt(0)));
        this._result = buffer;
        this._setReadyState(this.DONE);
    };
    fr.readAsDataURL(blob);
}


async function decrypt(encrypted, aesKey, iv) {
    aesKey = CryptoJS.enc.Utf8.parse(aesKey ? aesKey : "abcdefghijklmnopqrstuvwxyzabcdef");
    iv = CryptoJS.enc.Utf8.parse(iv ? iv : "0123456789abcdef");
 
    console.log(typeof(aesKey));
    console.log("key: " + aesKey + "\niv: " + iv);
    //console.log(aesKey)

    console.log("encrypted string ", typeof(encrypted));
    console.log(encrypted);

    // bytes is wordArray class 일반적 바이트 배열 아님!
    // CryptoJS.lib.WordArray.create()

    var bytes = typeof(encrypted) === "string" ? 
        CryptoJS.AES.decrypt(encrypted, aesKey, { iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC }) : 
        CryptoJS.AES.decrypt({ciphertext: encrypted}, aesKey, { iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC });
    console.log(bytes);

    var unit8ByteArray = convert_word_array_to_uint8Array(bytes);
    // console.log("decrypted byte array");
    // console.log(unit8ByteArray);
    // console.log("decrypted Text\n" + String.fromCharCode(...unit8ByteArray));
    return unit8ByteArray;
}

function convert_word_array_to_uint8Array(wordArray) {
    var len = wordArray.words.length,
        u8_array = new Uint8Array(len << 2),
        offset = 0, word, i
    ;
    for (i=0; i<len; i++) {
        word = wordArray.words[i];
        u8_array[offset++] = word >> 24;
        u8_array[offset++] = (word >> 16) & 0xff;
        u8_array[offset++] = (word >> 8) & 0xff;
        u8_array[offset++] = word & 0xff;
    }
    return u8_array;
}


/* Converts a cryptjs WordArray to native Uint8Array */                                                                                  
function CryptJsWordArrayToUint8Array(wordArray) {                                                                                       
    const l = wordArray.sigBytes;                                                                                                        
    const words = wordArray.words;                                                                                                       
    const result = new Uint8Array(l);                                                                                                    
    var i=0 /*dst*/, j=0 /*src*/;
    while(true) {
        // here i is a multiple of 4
        if (i==l)
            break;
        var w = words[j++];
        result[i++] = (w & 0xff000000) >>> 24;
        if (i==l)
            break;
        result[i++] = (w & 0x00ff0000) >>> 16;                                                                                            
        if (i==l)                                                                                                                        
            break;                                                                                                                       
        result[i++] = (w & 0x0000ff00) >>> 8;
        if (i==l)
            break;
        result[i++] = (w & 0x000000ff);                                                                                                  
    }
    return result;
}

export const tryToDecodeStream = (maybeStream) => {
    if (maybeStream instanceof PDFRawStream) {
        console.log(decodePDFRawStream(maybeStream).decode());
        return arrayAsString(decodePDFRawStream(maybeStream).decode());
    }
    return undefined;
  };

/**
 * @param pdfPath - pdf 파일 경로
 * @param pageInfos - {pageNum, aesKey, iv} 
 * aesKey : 32byte, iv: 16byte
 */
export async function decryptPages(pdfPath, pageInfos) {
    var pdfBase64 = await RNFS.readFile(pdfPath, 'base64');
    const existingPdfBytes = Buffer.from(pdfBase64, 'base64');
    console.log(existingPdfBytes);
    
    var pdfDoc = await PDFDocument.load(existingPdfBytes);

   // console.log(pageInfos);
   // console.log(pdfDoc);

    for(var i in pageInfos) {
        const pageInfo = pageInfos[i];
        console.log(pageInfo.pageNum);
        const page = pdfDoc.getPage(pageInfo.pageNum);

        
        const { Contents } = page.node.normalizedEntries();
    
        if (!Contents) return;
        Contents.asArray().forEach((streamRef) => {
        if (streamRef instanceof PDFRef) {
            console.log(streamRef);
            const stream = page.doc.context.lookup(streamRef);
            const contents = tryToDecodeStream(stream);
            if (contents) {
                decrypt(contents, pageInfo.aesKey, pageInfo.iv).then(newContents => {
                    const newStream = page.doc.context.flateStream(newContents);
                    page.doc.context.assign(streamRef, newStream);
                    console.log(contents);
                    console.log(newContents);
                });
            }
        }
      });
    }
    
    const decPdfBytes = await pdfDoc.save();
    const fileName = getFileName(pdfPath);
    const tempDecryptedFilePath = RNFS.TemporaryDirectoryPath + "pdf/" + fileName + "_dec";
    RNFS.exists(RNFS.TemporaryDirectoryPath + "pdf").then(res =>{
        if(!res) {
            console.log("tmp/pdf 생성");
            RNFS.mkdir(RNFS.TemporaryDirectoryPath + "pdf");
        }
        RNFS.writeFile(tempDecryptedFilePath, arrayAsString(decPdfBytes), 'ascii');
    })
}

/**
 * @param epubPath - epub 파일 경로
 * @param pageInfos - {filePath, aesKey, iv} 
 * filePath : .epub 내부의 파일(html) 위치
 * aesKey : 32byte, iv: 16byte
 */
export async function decryptEpub(epubPath, epubInfos) {
    // 파일 전체 
    const epubBytes = await fetch(epubPath).then((res) => res.arrayBuffer());
    console.log(epubBytes);

    await JSZip.loadAsync(epubBytes).then(async (zip) => {
        // zip - 압축파일 전체 files로 모든 내부 파일 확인 가능
        for(var i in epubInfos) {
            const epubInfo = epubInfos[i];
            await zip.file(epubInfo.filePath).async("uint8array").then(res => {
                // res - 압축해제 된 uint8array
                console.log("Encrypted\n", arrayAsString(res));
                var wordArray = CryptoJS.lib.WordArray.create(res);
                console.log(wordArray);
                var decryptedBytes = decrypt(wordArray, epubInfo.aesKey, epubInfo.iv);
                zip.file(epubInfo.filePath, decryptedBytes, {compression: "DEFLATE"});
                console.log(decryptedBytes);
                console.log(arrayAsString(decryptedBytes));
            });
        }

        await zip.generateAsync({type: "base64", compression: "DEFLATE"}).then(decBytes => {
            console.log(decBytes);
            RNFS.exists(RNFS.TemporaryDirectoryPath + "epub").then(res => {
                // tmp/epub 디렉토리가 없는 경우
                if(!res) {
                    console.log("tmp/epub 생성");
                    RNFS.mkdir(RNFS.TemporaryDirectoryPath + "epub");
                }
                const fileName = getFileName(epubPath);
                const tempDecryptedFilePath = RNFS.TemporaryDirectoryPath + "epub/" + fileName + "_dec";
                RNFS.writeFile(tempDecryptedFilePath, decBytes, 'base64');
            })
        }).catch(e => {
            console.error(e);
        })
    }).catch(e => console.error(e))
}

// filePath에서 fileName 추출
function getFileName(path) {
    var splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
}