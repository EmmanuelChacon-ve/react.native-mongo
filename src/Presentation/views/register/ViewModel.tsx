import React, { useEffect, useState } from "react";
import { ApiIngles } from "../../../Data/apiIngles";
import { RegisterAuthUseCase } from "../../../Domain/useCase/auth/registerAuth";
import { RegisterWithImageUseCase } from "../../../Domain/useCase/auth/registerWithImageAuth";
import * as ImagePicker from "expo-image-picker";
import { saveUserLocalUseCase } from "../../../Domain/useCase/userLocal/saveUserLocal";
import { useUserLocal } from "../../hooks/useUserLocal";
import { Role } from "../../../Domain/entities/Role";
import { RoleRepositoryImplement } from "../../../Data/repositories/RoleRepositoryImplement";
import { GetRolesUseCase } from "../../../Domain/useCase/auth/GetRolesUseCase";
import { ResponseApi } from "../../../Data/sources/remote/api/models/responseApi";
import { User } from "../../../Domain/entities/User";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState<User>({
    full_name: "",
    email: "",
    numero: "",
    password: "",
    image: "",
    roles: [],
    status: ""
  });

  const [loadingElement, setLoadingElement] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { user, getUserSession } = useUserLocal();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleRepository = new RoleRepositoryImplement();
        const getRolesUseCase = new GetRolesUseCase(roleRepository);
        const roles = await getRolesUseCase.execute();
        setRoles(roles);
      } catch (error) {
        console.error(":( Error fetching roles:", error);
        setErrorMessage("Error fetching roles. Please try again later.");
      }
    };

    fetchRoles();
  }, []);
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      onChange("image", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const register = async () => {
    if (isValidForm()) {
      setLoadingElement(true);
      try {
        const apiResponse = await RegisterWithImageUseCase(values, file!);
        setLoadingElement(false);
        if (apiResponse.success) {
          console.log("API response", apiResponse.data);
          await saveUserLocalUseCase(apiResponse.data);
          getUserSession();
        } else {
          setErrorMessage(JSON.stringify(apiResponse.respuesta));
        }
      } catch (error) {
        setLoadingElement(false);
        setErrorMessage("Error during registration");
        console.error("Error during registration:", error);
      }
    }
  };

  const isValidForm = (): boolean => {
    if (!values.full_name) {
      setErrorMessage("Full name can't be empty");
      return false;
    }
    if (isNaN(Number(values.numero)) || !values.numero) {
      setErrorMessage("Please enter a valid number");
      return false;
    }
    if (!values.password) {
      setErrorMessage("Password can't be empty");
      return false;
    }
    if (!values.email) {
      setErrorMessage("Email can't be empty");
      return false;
    }
    if (!values.image) {
      setErrorMessage("Select an image");
      return false;
    }
    if (!values.roles || values.roles.length === 0) {
      setErrorMessage("Select a role");
      return false;
    }
    return true;
  };

  return {
    ...values,
    roles,
    onChange,
    register,
    errorMessage,
    pickImage,
    takePhoto,
    user,
    loadingElement,
  };
};

export default RegisterViewModel;