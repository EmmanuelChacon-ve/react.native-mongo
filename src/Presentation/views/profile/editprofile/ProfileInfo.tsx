import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as FileSystem from "expo-file-system";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { RoundedButton } from "../../../components/RoundedButton";
import { RootStackParamList } from "../../../../../App";
import Layout from "../../../components/Layout";

type ProfileInfoScreenEditNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileInfoScreenEdit"
>;

const ProfileInfoScreenEdit = () => {
  const navigation = useNavigation<ProfileInfoScreenEditNavigationProp>();
  const { user, removeUserSession, urlImage } = useViewModel();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [base64Logo, setBase64Logo] = useState<string | null>(null);

  useEffect(() => {
    if (!user?._id) {
      navigation.navigate("HomeScreen");
    }
  }, [user, navigation]);

  const handleGeneratePDF = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 50px;
            text-align: center;
          }
          h1 {
            color: #333;
            font-size: 32px;
            margin-bottom: 20px;
          }
          p {
            font-size: 18px;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 2px solid #ccc;
            border-radius: 10px;
            background-color: #f5f5f5;
          }
          .logo {
            width: 150px;
            height: 150px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="http://192.168.1.100:3000/static/logo.png" alt="EnglishPlis Logo" class="logo">
          <h1>Felicitaciones, ${user?.full_name}!</h1>
          <p>Por graduarse de la academia EnglishPlis.</p>
          <p>Fecha de emisión: ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
    </html>
  `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      setPdfUri(uri);
      Alert.alert("PDF generado", `Diploma de EnglisPlish`);
      console.log(uri);

      if (uri) {
        await shareAsync(uri);
      }
    } catch (error) {
      console.error("Error al generar o compartir el PDF:", error);
      Alert.alert("Error", "No se pudo generar o compartir el PDF.");
    }
  };

  return (
    <Layout selected="third">
      <View style={styles.container}>
        <Image
          source={require("../../../../../assets/background-login.png")}
          style={styles.imageBackground}
        />

        <Pressable
          style={styles.logout}
          onPress={() => {
            removeUserSession();
          }}
        >
          <Image
            source={require("../../../../../assets/logout.png")}
            style={styles.logoutImage}
          />
        </Pressable>

        <View style={styles.logoContainer}>
          {user?.image !== "" && (
            <Image source={{ uri: urlImage }} style={styles.logoImage} />
          )}
        </View>

        <View style={styles.form}>
          <View style={styles.formInfo}>
            <Image
              source={require("../../../../../assets/user.png")}
              style={styles.formImage}
            />
            <View style={styles.formContent}>
              <Text>{user?.full_name}</Text>
              <Text style={styles.formTextDescription}>Nombre del usuario</Text>
            </View>
          </View>

          <View style={{ ...styles.formInfo, marginTop: 25 }}>
            <Image
              source={require("../../../../../assets/email.png")}
              style={styles.formImage}
            />
            <View style={styles.formContent}>
              <Text>{user?.email}</Text>
              <Text style={styles.formTextDescription}>Correo electronico</Text>
            </View>
          </View>

          <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 70 }}>
            <Image
              source={require("../../../../../assets/phone.png")}
              style={styles.formImage}
            />
            <View style={styles.formContent}>
              <Text> {user?.numero}</Text>
              <Text style={styles.formTextDescription}>Telefono</Text>
            </View>
          </View>

          <RoundedButton
            onPress={() => {
              navigation.navigate("UpdateProfileScreen");
            }}
            text="ACTUALIZAR INFORMACION"
          />

          <RoundedButton
            onPress={handleGeneratePDF}
            text="GENERAR DIPLOMA Y COMPARTIR"
          />

          {pdfUri && (
            <View style={styles.pdfContainer}>
              {/* Muestra el PDF generado automáticamente */}
            </View>
          )}
        </View>
      </View>
    </Layout>
  );
};

export default ProfileInfoScreenEdit;
