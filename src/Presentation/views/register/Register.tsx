import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./ViewModel";
import { CustomTextInput } from "../../components/CustomTextInput";
import styles from "./Styles";

export default function RegisterScreen() {
  const {
    full_name,
    email,
    numero,
    password,
    confirmPassword,
    onChange,
    register,
    errorMessage,
    pickImage,
    image,
  } = useViewModel();

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

      {/* LOGO SUPERIOR CENTRAL */}
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => pickImage()}>
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

      {/* COMIENZA FORMULARIO */}
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formText}>Sign Up!</Text>

          {/* COMIENZA SGUNDO INPUT */}
          <Text style={styles.formTextTitleInput}>Full name</Text>

          <CustomTextInput
            image={require("../../../../assets/my_user.png")}
            placeholder="Full name"
            keyboardType="default"
            value={full_name}
            property="full_name"
            onChangeText={onChange}
          />

          {/* COMIENZA TERCER INPUT */}
          <Text style={styles.formTextTitleInput}>Email</Text>

          <CustomTextInput
            image={require("../../../../assets/email.png")}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            value={email}
            property="email"
            onChangeText={onChange}
          />

          {/* COMIENZA CUARTO INPUT */}
          <Text style={styles.formTextTitleInput}>Your phone number</Text>

          <CustomTextInput
            image={require("../../../../assets/phone.png")}
            placeholder="(+12) 345-67890"
            keyboardType="numeric"
            value={numero}
            property="numero"
            onChangeText={onChange}
          />

          {/* COMIENZA QUINTO INPUT */}
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

          {/* COMIENZA SEXTO INPUT */}
          <Text style={styles.formTextTitleInput}>Confirm password</Text>

          <CustomTextInput
            image={require("../../../../assets/confirm_password.png")}
            placeholder="Confirm password"
            keyboardType="default"
            secureTextEntry={true}
            value={confirmPassword}
            property="confirmPassword"
            onChangeText={onChange}
          />

          {/* COMIENZA BOTON */}
          <View>
            <RoundedButton text="Sign up" onPress={() => register()} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
