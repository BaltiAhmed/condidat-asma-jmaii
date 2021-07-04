import React, { useState, useContext } from "react";
import { View, Text, Picker, Image,Alert } from "react-native";
import { Button } from "native-base";
import { Container, Content, Form, Item, Input, Label } from "native-base";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconEntypo from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Authcontext } from "../../context/auth-context";
import mime from "mime";


const UpdateProfile = (props) => {
  const [image, setImage] = useState();
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const img = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(img);
    console.log(image.uri);
    props.onImageTaken(img.uri);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateN(date.toString());
    hideDatePicker();
  };

  const [sexe, setSexe] = useState("Homme");
  const [dateN, setDateN] = useState();
  const [nom, setNom] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();

  const auth = useContext(Authcontext);

  const postDocument = async () => {
    const url = `http://192.168.1.185:5000/api/condidat/${auth.userId}`;
    const fileUri = image.uri;
    const newImageUri = "file:///" + fileUri.split("file:/").join("");
    const formData = new FormData();
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", nom);
    formData.append("sexe", sexe);
    formData.append("age", age);
    formData.append("dateNaissance", dateN);
    formData.append("email", email);
    const options = {
      method: "PATCH",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);

    let response = await fetch(url, options);

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }

    Alert.alert("Message", "Votre demande est enregistré", [
      { text: "fermer" },
    ]);
  };

  return (
    <Container>
      <Content>
        <Form>
          {image && (
            <View style={{ width: 150, height: 150, marginLeft: "4%" }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: image.uri }}
              />
            </View>
          )}

          <View style={{ marginTop: 20, marginLeft: "4%" }}>
            <IconEntypo
              name="image"
              size={25}
              color="blue"
              onPress={takeImage}
            />
          </View>
          <Item floatingLabel>
            <Label>Nom</Label>
            <Input
              value={nom}
              onChangeText={(text) => {
                setNom(text);
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </Item>

          <Item floatingLabel>
            <Label>Age</Label>
            <Input
              value={age}
              onChangeText={(text) => {
                setAge(text);
              }}
            />
          </Item>
          <View style={{ marginTop: 20, marginLeft: "4%" }}>
            <IconFontisto
              name="date"
              size={25}
              color="blue"
              onPress={showDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text>{dateN ? dateN : "Choisir votre date de naissance"}</Text>
          </View>

          <Text style={{ marginTop: 20, marginLeft: "4%" }}>Sexe</Text>
          <Picker
            selectedValue={sexe}
            style={{ width: "100%", marginLeft: "2%" }}
            onValueChange={(itemValue, itemIndex) => setSexe(itemValue)}
          >
            <Picker.Item label="Homme" value="Homme" />
            <Picker.Item label="Femme" value="Femme" />
          </Picker>
          <Button
            style={{ marginTop: 20 }}
            block
            onPress={() => {
              postDocument();
            }}
          >
            <Text>Envoyer</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default UpdateProfile;
