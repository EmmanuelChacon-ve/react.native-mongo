import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";

const { update } = new UserRepositoryImpl();

export const UpdateUserUseCase = async (full_name: string, numero: string,token:any) => {
  return await update(full_name, numero, token);
};
