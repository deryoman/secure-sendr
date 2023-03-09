import app from "./app";

const port = Number(String(process.env.PORT)) || 3000

app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}`)
})