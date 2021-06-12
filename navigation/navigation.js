import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import Landing from "../screens/landing";
import UpdateProfile from "../screens/profile/updateProfile";
import AddFormation from "../screens/formation/addFormation";

const LandingNav = createStackNavigator(
  {
    Landing: Landing,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const ProfileNav = createStackNavigator(
  {
    UpdateProfile: UpdateProfile,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const FormationNav = createStackNavigator(
  {
    AddFormation: AddFormation,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const AppNav = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: LandingNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <IconAntDesign
              name="home"
              size={25}
              color="#fafafa"
            />
          );
        },
        tabBarColor: "#0086c3",
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <IconAntDesign
              name="profile"
              size={25}
              color="#fafafa"
            />
          );
        },
        tabBarColor: "#0086c3",
      },
    },
    Formation: {
      screen: FormationNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <IconFontAwesome
              name="university"
              size={25}
              color="#fafafa"
            />
          );
        },
        tabBarColor: "#0086c3",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
