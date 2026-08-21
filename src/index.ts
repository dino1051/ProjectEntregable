import express from "express";
import estudiantesRouter from './routes/estudiantes.routes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';
import cors from "cors";
import type { Request, Response} from "express";

const app = express();
const PORT = 3000;
app.use(cors());

app.get("/",(req:Request,res:Response)=>{
    return res.status(200).json({ status: "Servidor en línea", version:"1.0.0"})
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(express.json());

app.use('/api/estudiantes', estudiantesRouter);

app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
