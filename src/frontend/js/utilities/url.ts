import {Base64} from "js-base64"

export interface UrlPayload {
    id: string
    key: string
}

export const createShareUrl = ({id, key}: UrlPayload): URL => {
    return createUrl('share', {id, key})
}

export const createShowUrl = ({id, key}: UrlPayload): URL => {
    return createUrl('show', {id, key})
}

export const getUrlPayload = (): UrlPayload | undefined => {
    const url = new URL(window.location.href)

    if (url.hash) {
        try {
            const data = JSON.parse(Base64.decode(url.hash))

            return {
                id: data.i,
                key: data.k
            }
        } catch (err) {
            console.error('Error while parsing json', err)
        }
    }

    return undefined
}

const createUrl = (path: string, payload: UrlPayload): URL => {
    const url = new URL(window.location.href)
    url.pathname = path
    url.hash = Base64.encode(JSON.stringify({i: payload.id, k: payload.key}), true)

    return url
}