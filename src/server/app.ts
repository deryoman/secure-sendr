import * as express from "express"
import {PrismaClient} from "@prisma/client"
import {nanoid} from 'nanoid'

const prisma = new PrismaClient()
const app = express()

const port = Number(String(process.env.PORT)) || 3000
const nanoIdSize = Number(String(process.env.SSENDR_ID_SIZE)) || 11

app.use(express.json())
app.use(express.static(process.env.SSENDR_STATIC_ROOT_FOLDER || 'dist'))

app.post(`/api/data`, async (req, res) => {
    const {iv, cipherText} = req.body

    if (!iv || !cipherText) {
        res.status(400)
        res.json({error: `'iv' and 'cipherText' must not be null or empty`})
        return
    }

    const id = nanoid(nanoIdSize)
    const result = await prisma.data.create({
        data: {
            id,
            iv,
            cipherText
        },
    })
    res.json(result)
})

app.get(`/api/data/:id`, async (req, res) => {
    const {id}: { id?: string } = req.params

    const data = await prisma.data.findUnique({
        where: {id: id},
    })

    if (!data) {
        res.status(404)
        res.json({error: `No data found for id '${id}'`})
        return
    }

    prisma.data.delete({
        where: {id: id}
    })
        .then(() => res.json(data))
        .catch(() => {
            res.status(404)
            res.json({error: `No data found for id '${id}'`})
        })
})

app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}`)
})

export {}