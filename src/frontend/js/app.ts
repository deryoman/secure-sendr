import {Form} from "./components/form";
import {createUrl, getDataFromUrl} from "./utilities/url";
import {Link} from "./components/link";
import {get, insert} from "./utilities/persistence";
import {Result} from "./components/result";
import {decrypt, encrypt} from "./utilities/crypt";

const boot = function (callback: () => void) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            callback()
        })
    } else {
        callback()
    }
}

boot(async function () {
    const content = document.getElementById('content') as HTMLElement

    // Too lazy to introduce 11ty etc. We will use server side rendering later on.
    const dataFromUrl = getDataFromUrl();
    if (dataFromUrl) {
        const result = new Result(content)

        const data = await get(dataFromUrl.id);
        if (data) {
            decrypt({
                    key: dataFromUrl.key,
                    iv: data.iv,
                    cipherText: data.cipherText
                }
            ).then(value => result.setResult(value))
        }
    } else {
        new Form(content, (payload, e) => {
            e.preventDefault()

            // TODO: Handle null values
            encrypt(payload || '').then(encryptedData => {
                insert(encryptedData.iv, encryptedData.cipherText)
                    .then(id => {
                        const link = new Link(content)
                        link.setURL(createUrl(id, encryptedData.key))
                    })
            })
        })
    }
})

export {}