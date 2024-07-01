import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { RoundedButton } from "../../../Presentation/components/RoundedButton";
import useViewModel from "./ViewModel";
import { CustomTextInput } from "../../components/CustomTextInput";
import styles from "./Styles";
import { ModalPickImage } from "../../components/modalPickImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import { MyColors } from "../../theme/AppTheme";
import { Picker } from "@react-native-picker/picker";

interface Props extends StackScreenProps<RootStackParamList, "RegisterScreen"> {}

export default function RegisterScreen({ navigation, route }: Props) {
  const {
    full_name,
    email,
    numero,
    password,
    onChange,
    register,
    errorMessage,
    loadingElement,
    pickImage,
    takePhoto,
    roles,
    image,
  } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null); // Estado para almacenar el rol seleccionado

  useEffect(() => {
    if (errorMessage) {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/background-login.png")}
        style={styles.imageBackground}
      />

      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {image === "" ? (
            <Image
              source={require("../../../../assets/user_image.png")}
              style={styles.logoImage}
            />
          ) : (
            <Image source={{ uri: image }} style={styles.logoImage} />
          )}
        </TouchableOpacity>
        <Text style={styles.logoText}>Select a picture</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>Sign Up!</Text>

          <View style={styles.formSelect}>
            <Image
              style={styles.formIcon}
              source={require("../../../../assets/user.png")}
            />
            <Picker
              style={styles.formPicker}
              selectedValue={selectedRole} // Usar el estado para el valor seleccionado
              onValueChange={(itemValue) =>
                setSelectedRole(itemValue) // Actualizar el estado con el nuevo valor seleccionado
              }
            >
              <Picker.Item
                label="Select a Role"
                value={null}
                enabled={false}
                style={styles.titlePickerItem}
              />
              {roles.map((role) => (
                <Picker.Item
                  key={role._id}
                  label={role.name_rol}
                  value={role._id}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.formTextTitleInput}>Full name</Text>
          <CustomTextInput
            image={require("../../../../assets/my_user.png")}
            placeholder="Full name"
            keyboardType="default"
            value={full_name}
            property="full_name"
            onChangeText={onChange}
          />

          <Text style={styles.formTextTitleInput}>Email</Text>
          <CustomTextInput
            image={require("../../../../assets/email.png")}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            value={email}
            property="email"
            onChangeText={onChange}
          />

          <Text style={styles.formTextTitleInput}>Your phone number</Text>
          <CustomTextInput
            image={require("../../../../assets/phone.png")}
            placeholder="(+12) 345-67890"
            keyboardType="numeric"
            value={numero}
            property="numero"
            onChangeText={onChange}
          />

          <Text style={styles.formTextTitleInput}>Password</Text>
          <CustomTextInput
            image={require("../../../../assets/password.png")}
            placeholder="More than 8 characters"
            keyboardType="default"
            secureTextEntry={true}
            value={password}
            property="password"
            onChangeText={onChange}
          />

          <View>
            <RoundedButton text="Sign up" onPress={() => register()} />
          </View>
        </ScrollView>
      </View>

      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />

      {loadingElement && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={MyColors.primary}
        />
      )}
    </View>
  );
}
