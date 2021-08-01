import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconFoundation from "react-native-vector-icons/Foundation";
import Landing from "../screens/landing";
import UpdateProfile from "../screens/profile/updateProfile";
import AddFormation from "../screens/formation/addFormation";
import ListeFormation from "../screens/formation/liste-formation";
import UpdateFormation from "../screens/formation/update-formation";
import ListeExperience from "../screens/experience/list-experience";
import AjoutExperience from "../screens/experience/add-experience";
import UpdateExperience from "../screens/experience/update-experience";
import ListeCompetence from "../screens/competance/liste-competence";
import AjoutCompetence from "../screens/competance/add-competence";
import UpdateCompetence from "../screens/competance/update-Competence";
import DetailOffre from "../screens/detailPage";

const LandingNav = createStackNavigator(
  {
    Landing: Landing,
    DetailOffre: DetailOffre,
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
    ListeFormation : ListeFormation,
    AddFormation: AddFormation,
    UpdateFormation: UpdateFormation
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

const ExperienceNav = createStackNavigator(
  {
    ListeExperience : ListeExperience,
    AjoutExperience: AjoutExperience,
    UpdateExperience: UpdateExperience
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

const CompetenceNav = createStackNavigator(
  {
    listeCompetence : ListeCompetence,
    AjoutCompetence: AjoutCompetence,
    UpdateCompetence: UpdateCompetence
 
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
            <IconFontisto
              name="person"
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
    Experience: {
      screen: ExperienceNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <IconMaterialIcons
              name="work"
              size={25}
              color="#fafafa"
            />
          );
        },
        tabBarColor: "#0086c3",
      },
    },
    Competence: {
      screen: CompetenceNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <IconFoundation
              name="social-skillshare"
              size={25}
              color="#fafafa"
            />
          );
        },
        tabBarColor: "#0086c3",
      },
    }
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
