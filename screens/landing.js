import React, { useState, useEffect } from "react";
import { View } from "react-native";
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
      const response = await fetch(`http://192.168.1.185:5000/api/offre/`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.offre);
    };
    sendRequest();
  }, []);
  console.log(list)
  return (
    <View>
      {list &&
        list.map((item) => (
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: `http://192.168.1.185:5000/` }} />
            </Left>
            <Body>
              <Text>{item.titre}</Text>
              <Text note>{item.mission}</Text>
            </Body>
            <Right>
              <Text note>{item.Ddebut}</Text>
            </Right>
          </ListItem>
        ))}
    </View>
  );
};

export default Landing;
