import {Base64} from "js-base64";

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    return Base64.fromUint8Array(new Uint8Array(buffer), true)
}

export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    return Base64.toUint8Array(base64).buffer;
}