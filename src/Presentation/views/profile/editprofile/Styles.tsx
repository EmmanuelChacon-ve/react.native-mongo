import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
    position: "absolute",
  },
  form: {
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    position: "absolute",
    bottom: 0,
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  formContent: {
    marginLeft: 15,
  },
  formImage: {
    height: 30,
    width: 30,
  },
  formTextDescription: {
    fontSize: 12,
    color: "gray",
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 30,
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
  },
  logout: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  logoutImage: {
    width: 40,
    height: 40,
  },
  change: {
    position: "absolute",
    right: 15,
    top: 75,
  },
  pdfContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  pdfView: {
    flex: 1,
  },
});

export default ProfileInfoStyles;
