import {createClient} from '@supabase/supabase-js'
import {nanoid} from "nanoid";
import {Database} from "../types/supabase";

const supabase = createClient<Database>(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
)

export const insert = async (iv: string, cipherText: string): Promise<string> => {
    const id = nanoid(11)

    const {error} = await supabase
        .from('password')
        .insert({
            id: id,
            iv: iv,
            cipherText: cipherText
        })

    if (error) {
        return Promise.reject(error)
    }

    return id
}

export const get = async (id: string) => {
    try {
        const {data, error} = await supabase
            .from('password')
            .select('iv, cipherText')
            .eq('id', id)
            .single()

        if (error) {
            console.error('error', error)
            return
        }

        return data
    } catch (err) {
        console.error('Error retrieving data from db', err)
    }
}