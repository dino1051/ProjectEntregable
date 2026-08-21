import { Router } from "express";
import type { Request, Response} from "express";
import type { 
    crearEstudiante,
    Estudiante,
    actualizarEstudiante,
    estudiantesFiltrados,
    idParam
} from "../types/estudiantes.types.js";

let estudiantes: Estudiante[] = [];

const router = Router();
let index:number = 1;

router.post("/",(req:Request<{},{},crearEstudiante>,res:Response)=>{
  /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Postear'
    #swagger.description = 'Agregar a un estudiante nuevo'
  */
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

router.put("/:id", function(req:Request,res:Response){
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

router.delete("/:id", function (req: Request, res: Response) {
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

router.get("/api/status",(req:Request,res:Response)=>{
    return res.status(200).json({ status: "Servidor en línea", version:"1.0.0"})
});

// router.get("/",function(req:Request,res:Response){
//     res.json(estudiantes);
// })
router.get("",(req: Request<{}, {}, {}, estudiantesFiltrados>, res: Response)=>{
    const { bootcamp } = req.query;
    let resultado = [...estudiantes];
    if(bootcamp){
    resultado = resultado.filter(
        (e) => e.bootcamp.toLowerCase() === bootcamp.toLowerCase()
    );
    if(resultado.length===0){return res.status(404).json({error:"Estudiante no encontrado"})}
    else{return res.json({"datos":resultado})}}
    return res.json(resultado);
});


router.get("/:id", function (req: Request<idParam>, res: Response) {
  const idBuscado = Number(req.params.id);

  if (isNaN(idBuscado)) {
    return res
      .status(400)
      .json({ error: "El parametro id debe ser un numero valido" });
  }
  const estudianteFiltrado = estudiantes.find(
    (e) => e.id === idBuscado,
  );

  if (!estudianteFiltrado) {
    return res
      .status(404)
      .json({ error: "no existe un estudiante con ese ID" });
  }
  return res.json(estudianteFiltrado);
});

export default router;