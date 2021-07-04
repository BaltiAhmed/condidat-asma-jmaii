import React, { useContext, useState, useEffect, useCallback } from "react";
import { ListItem, Body, Right, Text } from "native-base";
import { Authcontext } from "../../context/auth-context";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, RefreshControl, ScrollView  , Alert} from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListeExperience = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const auth = useContext(Authcontext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/experience/codidat/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.experiences);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/experience/codidat/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.experiences);
    };
    sendRequest();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <View style={{ marginLeft: "8%", marginTop: 30 }}>
          <IconEntypo
            name="add-to-list"
            size={50}
            color="#1976d2"
            onPress={() => {
              props.navigation.navigate({
                routeName: "AjoutExperience",
              });
            }}
          />
        </View>

        {list &&
          list.map((item, index) => (
            <ListItem avatar>
              <Body>
                <View style={{ marginTop: 20 }}>
                  <Text note>Poste: {item.poste}</Text>
                  <Text note>Employeur: {item.employeur}</Text>
                  <Text note>Ville: {item.ville}</Text>
                  <Text note>Date de début: {item.Ddebut}</Text>
                  <Text note>Date de fin: {item.Dfin}</Text>
                  <Text note>Description: {item.description}</Text>
                </View>
              </Body>
              <Right>
                <MaterialCommunityIcons
                  name="update"
                  size={25}
                  color="#00e676"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: "UpdateExperience",
                      params: {
                        id: item._id,
                      },
                    });
                  }}
                />

                <IconAntDesign
                  name="delete"
                  size={20}
                  color="#c62828"
                  onPress={() => {}}
                  style={{ marginTop: 30 }}
                  onPress={async () => {
                    let response = await fetch(
                      `http://192.168.1.185:5000/api/experience/${item._id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    let responsedata = await response.json();
                    if (!response.ok) {
                      Alert.alert("Message", "Failed !!", [{ text: "fermer" }]);
                      throw new Error(responsedata.message);
                    }
                    setList(list.filter((el) => el._id !== item._id));
                    Alert.alert("Message", "Supprimer", [{ text: "fermer" }]);
                  }}
                />
              </Right>
            </ListItem>
          ))}
      </View>
    </ScrollView>
  );
};

ListeExperience.navigationOptions = (navData) => {
  return {
    headerTitle: "Mes Experience",
  };
};

export default ListeExperience;
