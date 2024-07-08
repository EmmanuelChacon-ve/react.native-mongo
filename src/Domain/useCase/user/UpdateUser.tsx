import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";

const { update,getAllUser,deleteUser } = new UserRepositoryImpl();

export const UpdateUserUseCase = async (full_name: string, numero: string,token:any) => {
  return await update(full_name, numero, token);
};

export const getAllUserUseCase = async () => 
  {
    return getAllUser();
  }

  export const deleteUserUseCase = async (idUser: string,token:string) => 
    {
      return deleteUser(idUser,token);
    }