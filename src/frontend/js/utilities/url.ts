import {Base64} from "js-base64";

export const createUrl = (id: string, key: string): URL => {
    const url = new URL(window.location.href)
    const data = {i: id, k: key}

    url.hash = Base64.encode(JSON.stringify(data), true)

    return url
}

export const getDataFromUrl = (): { id: string, key: string } | null => {
    const url = new URL(window.location.href)

    if (url.hash) {
        try {
            const data = JSON.parse(Base64.decode(url.hash));

            return {
                id: data.i,
                key: data.k
            }
        } catch (err) {
            console.error('Error while parsing json', err)
        }
    }

    return null
}