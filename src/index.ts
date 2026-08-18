import express from "express";
import type { Request, Response} from "express";


const app = express();
const PORT = 3000;
app.use(express.json());
let index:number = 1;

interface Estudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}

let estudiantes: Estudiante[] = [];

app.get("/api/estudiantes",async function(req:Request,res:Response){
    res.json(estudiantes);
})

interface crearEstudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}

app.post("/api/estudiantes",(req:Request<{},{},crearEstudiante>,res:Response)=>{
    const {nombre,email,bootcamp} = req.body;
    if(!email){
        return (res.status(400).json({error:"400 Bad Request"}));
    }else{
        const nuevoEstudiante:Estudiante={
        id:index,
        nombre: nombre,
        email: email,
        bootcamp: bootcamp
        };
        estudiantes.push(nuevoEstudiante);
        res.status(201).json({msg:"201 Created"})
        index++;
        console.log(estudiantes)
    }
})

interface actualizarEstudiante{
    nombre: string;
    email: string;
    bootcamp: string;
}

app.put("/api/estudiantes/:id", function(req:Request,res:Response){
    const id = Number(req.params.id);
    const index = estudiantes.findIndex((e)=> e.id === id);
    if(index === -1){
        return res.status(404).json({
            error:"404 Not Found"
        })}else{
            const {nombre,email,bootcamp}:actualizarEstudiante=req.body;
            estudiantes[index] = {
                id:id,
                nombre: nombre ?? estudiantes[index]?.nombre,
                email: email ?? estudiantes[index]?.email,
                bootcamp: bootcamp ?? estudiantes[index]?.bootcamp
            };
            res.json(estudiantes[index]);
        };
});

app.delete("/api/estudiantes/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const index = estudiantes.findIndex(function (e) {
    console.log(idBuscado)
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "estudiante no encontrado no podemos eliminarlo" });
  } else {
    estudiantes = estudiantes.filter(
      (e) => e.id !== idBuscado,
    );
    res.json({ mensaje: "ESTUDIANTE ELIMINADO EXITOSAMENTE" });
  }
});

app.get("/api/status",(req:Request,res:Response)=>{
    return res.status(200).json({ status: "Servidor en línea", version:"1.0.0"})
});
app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
