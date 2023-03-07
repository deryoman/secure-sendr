import {boot} from "./utilities/boot";
import {getUrlPayload} from "./utilities/url";
import {get} from "./utilities/persistence";
import {decrypt} from "./utilities/crypt";

boot(async function () {
    const content = document.getElementById('content') as HTMLElement
    const urlPayload = getUrlPayload();

    if (urlPayload) {
        const textArea = content.querySelector('[data-template-result-textarea]') as HTMLTextAreaElement

        const data = await get(urlPayload.id)
        if (data) {
            decrypt({
                key: urlPayload.key,
                iv: data.iv,
                cipherText: data.cipherText
            }).then(decryptedData => textArea.value = decryptedData)
        }
    }
})