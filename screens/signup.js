import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import Card from "../components/Card";
import { Spinner } from "native-base";

const Signup = (props) => {
  const [email, setEmail] = useState();
  const [nom, setNom] = useState();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    let response = await fetch(
      "http://192.168.1.185:5000/api/condidat/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: nom,
        }),
      }
    );
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      setLoading(false);
      throw new Error(responsedata.message);
    }
    setLoading(false);
    Alert.alert("Message", "Votre compte est crée, un mot de passe sera envoyer par email", [{ text: "fermer" }]);
  };

  return (
    <Card style={styles.authContainer}>
      {loading && <Spinner />}
      <ScrollView>
        <View style={styles.formControl}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={(text) => {
              setNom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="nom"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="email"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Valider" color="#0086c3" onPress={submit} />
        </View>
      </ScrollView>
    </Card>
  );
};

Signup.navigationOptions = {
  headerTitle: "Inscription",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 600,
    padding: 20,
    marginLeft: "10%",
    marginTop: "20%",
  },
  buttonContainer: {
    marginTop: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default Signup;
