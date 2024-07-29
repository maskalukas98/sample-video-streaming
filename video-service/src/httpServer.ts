import express from "express"
import {createRoutes} from "./routes";
import cors from 'cors';
import {AsyncContextManager} from "./util/AsyncContextManager";
import config from "./config/env";
import swaggerSpec from "./config/swagger/swagger";
import swaggerUi from "swagger-ui-express"
const app = express();

export const contextManager = new AsyncContextManager();

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", createRoutes())


app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}/`);
});