import React, { useState, useContext,useEffect } from "react";
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

const UpdateFormation = (props) => {
  const [nom, setNom] = useState();
  const [etablissement, setetablissement] = useState();
  const [ville, setville] = useState();
  const [A_debut, setA_debut] = useState();
  const [A_fin, setA_fin] = useState();
  const [description, setdescription] = useState();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleA_fin, setDatePickerVisibilityA_fin] =
    useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showDatePickerA_Fin = () => {
    setDatePickerVisibilityA_fin(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideDatePickerA_Fin = () => {
    setDatePickerVisibilityA_fin(false);
  };

  const handleConfirmA_Debut = (date1) => {
    setA_debut(date1.toString());
    hideDatePicker();
  };

  const handleConfirmA_Fin = (date2) => {
    setA_fin(date2.toString());
    hideDatePickerA_Fin();
  };

  const id = props.navigation.getParam("id");

 

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.46:5000/api/formation/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

  
      setNom(responseData.formation.nom_deplome)
      setetablissement(responseData.formation.etablissement)
      setville(responseData.formation.ville)
      setA_debut(responseData.formation.A_debut)
      setA_fin(responseData.formation.A_fin)
      setdescription(responseData.formation.description)
    };

    sendRequest();
  }, []);

  const submit = async () => {
    console.log(nom, etablissement, ville, A_debut, A_fin, description);
    let response = await fetch(
      `http://192.168.1.46:5000/api/formation/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom_deplome: nom,
          etablissement: etablissement,
          ville: ville,
          A_debut: A_debut,
          A_fin: A_fin,
          description: description,
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
            placeholder="Nom"
            style={{ marginTop: "10%" }}
            value={nom}
            onChangeText={(text) => {
              setNom(text);
            }}
          />
        </Item>

        <Item regular>
          <Input
            placeholder="Etablissement"
            style={{ marginTop: "10%" }}
            value={etablissement}
            onChangeText={(text) => {
              setetablissement(text);
            }}
          />
        </Item>

        <Item regular>
          <Input
            placeholder="Ville"
            style={{ marginTop: "10%" }}
            value={ville}
            onChangeText={(text) => {
              setville(text);
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
            onConfirm={handleConfirmA_Debut}
            onCancel={hideDatePicker}
          />
          <Text>{A_debut ? A_debut : "Date de début de formation"}</Text>
        </View>

        <View style={{ marginTop: 20, marginLeft: "4%" }}>
          <IconFontisto
            name="date"
            size={25}
            color="blue"
            onPress={showDatePickerA_Fin}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisibleA_fin}
            mode="date"
            onConfirm={handleConfirmA_Fin}
            onCancel={hideDatePickerA_Fin}
          />
          <Text>{A_fin ? A_fin : "Date de fin de formation"}</Text>
        </View>

        <Textarea
          rowSpan={5}
          bordered
          placeholder="description"
          style={{ marginTop: "5%" }}
          value={description}
          onChangeText={(text) => {
            setdescription(text);
          }}
        />

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

UpdateFormation.navigationOptions = (navData) => {
  return {
    headerTitle: "Mise à jour de la formation",
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

export default UpdateFormation;
