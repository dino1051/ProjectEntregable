import express from "express";
import estudiantesRouter from './routes/estudiantes.routes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';
const app = express();
const PORT = 3000;



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(express.json());

app.use('/api/estudiantes', estudiantesRouter);

app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
