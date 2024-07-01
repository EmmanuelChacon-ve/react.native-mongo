import { Role } from "../../Domain/entities/Role";
import { RoleRepository } from "../../Domain/repositories/RoleRepository";
import { ApiIngles } from "../apiIngles";
import { AxiosError } from "axios";

interface RoleApiResponse {
  success: boolean;
  message: string;
  status: number;
  data: Role[];
}

export class RoleRepositoryImplement implements RoleRepository {
  async getRoles(): Promise<Role[]> {
    try {
      const response = await ApiIngles.get<RoleApiResponse>("/role");
      if (response.data.success) {
        /* console.log("API response:", response.data); */ //PARA VER SI LLEVAN LOS ROLES
        return Promise.resolve(response.data.data); // Asegúrate de acceder al campo 'data'
      } else {
        return Promise.reject(new Error(response.data.message));
      }
    } catch (error) {
      let e = error as AxiosError;
      console.log("Error: ", e.message, "Response data:", e.response?.data);
      return Promise.reject(e.response?.data || { message: e.message });
    }
  }
}