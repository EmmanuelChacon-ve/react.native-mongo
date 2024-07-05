import React, { useContext } from "react";
import { useUserLocal } from "../../../hooks/useUserLocal";
import { removeUserLocalUseCase } from "../../../../Domain/useCase/userLocal/removeUserLocal";
import { getUserLocalUseCase } from "../../../../Domain/useCase/userLocal/getUserLocal";
import { UserContext } from "../../../context/UserContext";
import { ApiInglesGetImage} from "../../../../Data/apiIngles"
const ProfileInfoViewModel = () => {
  /* const { user, setUser } = useUserLocal();

  const removeSession = async () => {
    await removeUserLocalUseCase();
  }; */

  /* 
  const removeSession = async () => {
    await removeUserLocalUseCase();
  }; */
  const { user, removeUserSession } = useContext(UserContext);
  console.log(user?.token)
  const urlImage = `${ApiInglesGetImage}/${user?.image}`;
  return { user, removeUserSession,urlImage };
};

export default ProfileInfoViewModel;
