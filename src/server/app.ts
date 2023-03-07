import * as express from "express";

const app = express()
const host = process.env.SSENDR_SERVER_HOST || '0.0.0.0'
const port = Number(String(process.env.SSENDR_SERVER_PORT)) || 3000

app.use(express.static(process.env.SSENDR_STATIC_ROOT_FOLDER || 'dist'))

app.listen(port, host, () => {
    console.log(`Secure Sendr server listening on port ${port}`)
})

export {}