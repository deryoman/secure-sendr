import {nanoid} from "nanoid";
import {Router} from "express";
import {prisma} from "../database/client";

const router = Router();
const nanoIdSize = Number(String(process.env.SSENDR_ID_SIZE)) || 11

router.post(`/data`, async (req, res) => {
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

router.get(`/data/:id`, async (req, res) => {
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

export {router}