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
    #swagger.summary = 'Registrar un estudiante nuevo'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'Estudiante',
            required: ['nombre','email','bootcamp'],
            properties: {
              nombre: { type: 'string', example: 'Maria' },
              email: { type: 'string', example: 'maria123@gmail.com' },
              bootcamp: { type: 'string', example: 'FrontEnd' }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: '201 Created',
      schema: { id: 3, nombre: 'Juan', email: 'juan123@gmail.com',bootcamp:'Backend' }
    }
    #swagger.responses[400] = {
      description: '400 Bad Request',
      schema: { error: '400 Bad Request' }
    }
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
  /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Modifica un estudiante por ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID numérico del producto',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Estudiante modificado',
      schema: { id: 1, nombre: 'Maria', email: 'maria456@gmail.com',bootcamp:'FullStack' }
    }
    #swagger.responses[404] = {
      description: 'Estudiante no encontrado',
      schema: { error: 'Estudiante no encontrado' }
    }
  */
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
  const indice = estudiantes.findIndex(function (e) {
    /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Elimina un estudiante del registro'
    #swagger.description = 'Elimina un estudiante del registro'
  */
    console.log(idBuscado)
    return e.id === idBuscado;
  });
  if (indice === -1) {
    return res
      .status(404)
      .json({ error: "estudiante no encontrado no podemos eliminarlo" });
  } else {
    estudiantes = estudiantes.filter(
      (e) => e.id !== idBuscado,
    );
    index--;
    res.json({ mensaje: "ESTUDIANTE ELIMINADO EXITOSAMENTE" });
  }
});



// router.get("/",function(req:Request,res:Response){
//     res.json(estudiantes);
// })
router.get("/",(req: Request<{}, {}, {}, estudiantesFiltrados>, res: Response)=>{
      /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Listar estudiantes'
    #swagger.parameters['bootcamp'] = {
      in: 'query',
      description: 'Filtrar por bootcamp',
      required: false,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Lista de estudiantes',
      schema: [{ id: 3, nombre: 'Roberto', email: 'rober123@gmail.com',bootcamp:'Frontend' }]
    }
  */
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
  /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'Obtener estudiante por ID'
    #swagger.parameters['id'] = {
      in: '/api/estudiantes/'id'',
      description: 'ID numérico del estudiante',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Estudiante encontrado',
      schema: { id: 1, nombre: 'Maria', email: 'maria123@gmail.com',bootcamp:'Frontend' }
    }
    #swagger.responses[404] = {
      description: 'Estudiante no encontrado',
      schema: { error: 'Estudiante no encontrado' }
    }
  */

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