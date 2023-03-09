import * as express from "express"
import {router as routes} from "./routes/data.routes";

const app = express()

app.use(express.json())
app.use(express.static(process.env.SSENDR_STATIC_ROOT_FOLDER || 'dist'))
app.use('/api', routes)

export {app}
