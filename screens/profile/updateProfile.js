import React, { useState } from "react";
import { View, Text, Picker, Button, Image } from "react-native";
import { Container, Content, Form, Item, Input, Label } from "native-base";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconEntypo from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

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

  return (
    <Container>
      <Content>
        <Form>
          {image && (
            <View style={{ width: 150, height: 150,marginLeft:'4%' }}>
              <Image style={{width:'100%',height:'100%'}} source={{ uri: image.uri }} />
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
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>

          <Item floatingLabel>
            <Label>Age</Label>
            <Input />
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
        </Form>
      </Content>
    </Container>
  );
};

export default UpdateProfile;
