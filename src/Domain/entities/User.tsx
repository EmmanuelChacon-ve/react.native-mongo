import { Role } from "./Role";
export interface User {
  id_user?: string;
  full_name: string;
  email: string;
  numero: string;
  password: string;
  image?: string;
  session_token?: string;
  roles: {
    id_rol?: string;
    name_rol: string;
    status: string;
  }[];
  status: string;
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