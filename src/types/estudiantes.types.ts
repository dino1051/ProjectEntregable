interface Estudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}

interface crearEstudiante {
    id: number;
    nombre: string;
    email: string;
    bootcamp: string;
}

interface actualizarEstudiante{
    nombre: string;
    email: string;
    bootcamp: string;
}

interface estudiantesFiltrados{
    bootcamp:string;
}
interface idParam {
  id: string;
}

export type {Estudiante,crearEstudiante,actualizarEstudiante,estudiantesFiltrados, idParam}