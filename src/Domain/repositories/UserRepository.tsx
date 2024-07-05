import { ResponseApi } from "../../Data/sources/remote/api/models/responseApi";
import { User } from "../entities/User";

export interface UserRepository {
  update(full_name: string, numero: string, token:any): Promise<ResponseApi>;
}