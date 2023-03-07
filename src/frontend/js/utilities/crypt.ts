import {arrayBufferToBase64, base64ToArrayBuffer} from "./buffer";
import {EncryptionData} from "../types/encryptionData";

const {subtle} = globalThis.crypto

const importKey = async (rawKey: string): Promise<CryptoKey> => {
    return await crypto.subtle.importKey(
        'raw',
        base64ToArrayBuffer(rawKey),
        'AES-CBC',
        true,
        ['decrypt']
    )
}

const generateAesKey = async (length = 256): Promise<CryptoKey> => {
    return await subtle.generateKey({
        name: 'AES-CBC',
        length,
    }, true, ['encrypt', 'decrypt'])
}

export const decrypt = async ({key, iv, cipherText}: EncryptionData): Promise<string> => {
    const dec = new TextDecoder()
    const importedKey = await importKey(key)

    const plaintext = await crypto.subtle.decrypt({
        name: 'AES-CBC',
        iv: base64ToArrayBuffer(iv),
    }, importedKey, base64ToArrayBuffer(cipherText))

    return dec.decode(plaintext)
}

export const encrypt = async (plainText: string): Promise<EncryptionData> => {
    const ec = new TextEncoder()
    const key = await generateAesKey()
    const exportedKey = await crypto.subtle.exportKey('raw', key)
    const iv = crypto.getRandomValues(new Uint8Array(16))

    const ciphertext = await crypto.subtle.encrypt({
        name: 'AES-CBC',
        iv,
    }, key, ec.encode(plainText))

    return {
        key: arrayBufferToBase64(exportedKey),
        iv: arrayBufferToBase64(iv),
        cipherText: arrayBufferToBase64(ciphertext)
    }
}