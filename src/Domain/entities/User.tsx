import { Role } from "./Role";

export interface User {
  _id: string; // Cambiado de id_user a _id para que coincida con el JSON recibido
  full_name: string;
  email: string;
  numero: string;
  password: string;
  image: string;
  status: string;
  roles: any[];
}


/* import { Role } from "./Role";
export interface User {
  id_user?: string;
  full_name: string;
  email: string;
  numero: string;
  password: string;
  image?: string;
  session_token?: string;
  id_rol: string;
  idCourse?: string
}
 */