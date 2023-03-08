import fetch from 'node-fetch'

export const insert = async (iv: string, cipherText: string): Promise<string> => {
    const body = {
        iv,
        cipherText
    }

    try {
        const response = await fetch('/api/data', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        })

        const data = await response.json()

        if (response.status !== 200 || !data) {
            console.error('Error while saving data - Status: "%s"', response.status)
            return Promise.reject('Error while saving data')
        }

        return data.id
    } catch (error) {
        console.log(error)
        return Promise.reject('Error while saving data')
    }
}

export const get = async (id: string) => {
    try {
        const response = await fetch(`/api/data/${id}`)

        const data = await response.json()

        if (response.status !== 200 || !data) {
            console.error('Error while retrieving data - Status: "%s"', response.status)
            return Promise.reject('Error while retrieving data')
        }

        return {
            iv: data.iv,
            cipherText: data.cipherText
        }
    } catch (error) {
        console.log(error)
        return Promise.reject('Error while retrieving data')
    }
}