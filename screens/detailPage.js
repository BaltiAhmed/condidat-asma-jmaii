import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Button,
  Alert
} from "react-native";
import { Spinner } from "native-base";
import { Authcontext } from "../context/auth-context";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DetailOffre = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/offre/${id}`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.offre);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);
  const [entreprise, setEntreprise] = useState([]);

  const id = props.navigation.getParam("id");
  console.log(id);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/entreprise/${list.entrepriseId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setEntreprise(responseData.entreprise);
    };
    sendRequest();
  }, [list]);
  console.log(entreprise);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.185:5000/api/offre/${id}`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.offre);
    };
    sendRequest();
  }, []);
  console.log(list);
  const [loading, setLoading] = useState(false);
  const auth = useContext(Authcontext);
  const submit = async () => {

    setLoading(true);

    let response = await fetch(
      "http://192.168.1.185:5000/api/condidat/postuler",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCondidat: auth.userId,
          idOffre: id,
        }),
      }
    );

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      setLoading(false);
      throw new Error(responsedata.message);
    }

    let responsedata = await response.json();
    Alert.alert("Message", "demande enregistrer", [{ text: "fermer" }]);
    setLoading(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.mealItem}>
        <TouchableOpacity>
          <View>
            <View style={{ ...styles.MealRow, ...styles.mealHeader }}>
              <ImageBackground
                source={{
                  uri: `http://192.168.1.185:5000/${entreprise.image}`,
                }}
                style={styles.bgImage}
              >
                <Text style={styles.title}>{entreprise.nom_entreprise}</Text>
              </ImageBackground>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.MealRow, ...styles.mealDetail }}>
        <Text style={{ fontSize: 20 }}>{list.titre}</Text>
        <Text style={{ fontSize: 20 }}>{list.Ddebut}</Text>
        <Text style={{ fontSize: 20 }}>{list.Dfin}</Text>
        <Text style={{ fontSize: 20 }}>{list.mission}</Text>
        <Text style={{ fontSize: 20 }}>{list.Aprincipale}</Text>
        <Text style={{ fontSize: 20 }}>{list.description}</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        {loading ? (
          <Spinner />
        ) : (
          <Button title="Postuler" color="#0086c3" onPress={submit} />
        )}
      </View>
    </ScrollView>
  );
};

DetailOffre.navigationOptions = (navData) => {
  return {
    headerTitle: "Detail",
  };
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  MealRow: {
    flexDirection: "column",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default DetailOffre;
