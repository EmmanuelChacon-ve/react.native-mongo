import React, { createContext, useState, useEffect } from "react";
import { User } from "../../Domain/entities/User";
import { getUserLocalUseCase } from "../../Domain/useCase/userLocal/getUserLocal";
import { saveUserLocalUseCase } from "../../Domain/useCase/userLocal/saveUserLocal";
import { removeUserLocalUseCase } from "../../Domain/useCase/userLocal/removeUserLocal";

export const userInitialState: User = {
  _id: "",
  full_name: "",
  numero: "",
  email: "",
  password: "",
  image: "",
 // session_token: "",
  roles:[],
  status:"",
  token:""
};

export interface UserContextProps {
  user: User | null;
  saveUserSession: (user: User, token:any) => Promise<void>;
  getUserSession: () => Promise<void>;
  removeUserSession: () => Promise<void>;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserSession();
  }, []);

  const saveUserSession = async (user: User, token:any) => {
    await saveUserLocalUseCase(user, token);
    setUser(user);
  };

  const getUserSession = async () => {
    const storedUser = await getUserLocalUseCase();
    setUser(storedUser);
  };

  const removeUserSession = async () => {
    await removeUserLocalUseCase();
    setUser(userInitialState);
  };

  return (
    <UserContext.Provider
      value={{ user, saveUserSession, getUserSession, removeUserSession }}
    >
      {children}
    </UserContext.Provider>
  );
};
