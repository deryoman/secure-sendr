import {createShareUrl} from "./utilities/url"
import {insert} from "./utilities/persistence"
import {encrypt} from "./utilities/crypt"
import {boot} from "./utilities/boot"

boot(async function () {
    const content = document.getElementById('content') as HTMLElement
    const form = content.querySelector('[data-template-data-form]') as HTMLFormElement
    const payloadTextArea = form.querySelector('textarea[name="payload"]') as HTMLTextAreaElement

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        encrypt(payloadTextArea.value || '').then(encryptedData => {
            insert(encryptedData.iv, encryptedData.cipherText)
                .then(id => {
                    window.location.href = createShareUrl({id, key: encryptedData.key}).toString()
                })
        })
    })
})