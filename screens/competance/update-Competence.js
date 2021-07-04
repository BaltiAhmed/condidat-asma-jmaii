import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Item, Input, Textarea } from "native-base";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconEntypo from "react-native-vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Authcontext } from "../../context/auth-context";

const UpdateCompetence = (props) => {
  const [titre, setTitre] = useState();
  const [niveau, setNiveau] = useState();

  const id = props.navigation.getParam("id");

  const submit = async () => {
    
    let response = await fetch(
      `http://192.168.1.185:5000/api/competance/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: titre,
          niveau: niveau,
        }),
      }
    );
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }

    Alert.alert("Message", "Votre demande est enregistrer", [
      { text: "fermer" },
    ]);
  };

  return (
    <ScrollView>
      <View>
        <Item regular>
          <Input
            placeholder="Titre"
            style={{ marginTop: "10%" }}
            value={titre}
            onChangeText={(text) => {
              setTitre(text);
            }}
          />
        </Item>

        <Item regular>
          <Input
            placeholder="Niveaux"
            style={{ marginTop: "10%" }}
            value={niveau}
            onChangeText={(text) => {
              setNiveau(text);
            }}
          />
        </Item>

      

       
       

       

        <Button
          style={{ marginTop: 20 }}
          title="Envoyer"
          color="#0086c3"
          onPress={() => {
            submit();
          }}
        />
      </View>
    </ScrollView>
  );
};

UpdateCompetence.navigationOptions = (navData) => {
  return {
    headerTitle: "Modifier une compétence",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UpdateCompetence;
