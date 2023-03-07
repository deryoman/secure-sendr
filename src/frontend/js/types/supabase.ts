export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            password: {
                Row: {
                    cipherText: string
                    created_at: string | null
                    id: string
                    iv: string
                }
                Insert: {
                    cipherText: string
                    created_at?: string | null
                    id: string
                    iv: string
                }
                Update: {
                    cipherText?: string
                    created_at?: string | null
                    id?: string
                    iv?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
