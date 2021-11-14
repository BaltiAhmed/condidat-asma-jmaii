import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
} from "native-base";

const Landing = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.1.46:5000/api/offre/`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.offre);
    };
    sendRequest();
  }, []);
  console.log(list);
  const [categorie, setCategorie] = useState("");
  return (
    <ScrollView>
      <Item regular>
        <Input
          placeholder="Recherche"
          value={categorie}
          onChangeText={(text) => {
            setCategorie(text);
          }}
        />
      </Item>
      <View>
        {list &&
          list
            .filter((val) => {
              if (categorie == "") {
                return val;
              } else if (val.titre.includes(categorie)) {
                return val;
              }
            })
            .map((item) => (
              <ListItem
                avatar
                onPress={() => {
                  props.navigation.navigate({
                    routeName: "DetailOffre",
                    params: {
                      id: item._id,
                    },
                  });
                }}
              >
                <Left>
                  <Thumbnail
                    source={{ uri: `http://192.168.1.46:5000/${item.photo}` }}
                  />
                </Left>
                <Body>
                  <Text>{item.titre}</Text>
                  <Text note>{item.mission}</Text>
                </Body>
                <Right>
                  <Text note>{item.categorie}</Text>
                  <Text note>{item.Ddebut}</Text>
                </Right>
              </ListItem>
            ))}
      </View>
    </ScrollView>
  );
};

Landing.navigationOptions = (navData) => {
  return {
    headerTitle: "Home",
  };
};

export default Landing;
