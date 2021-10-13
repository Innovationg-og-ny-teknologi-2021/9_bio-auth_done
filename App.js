import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import { AntDesign,Entypo } from '@expo/vector-icons';
import BioScreen from "./components/BioScreen";
import FacebookScreen from "./components/FacebookScreen";
import GoogleScreen from "./components/GoogleScreen";


export default function App() {

  const Tab = createBottomTabNavigator();
    /*Vores tab navigator*/
  return (
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name={"Bio"} component={BioScreen} options={{tabBarIcon:({tintColor}) =>(<Entypo name="fingerprint" size={24} color={tintColor} />)}} />
              {/*Hvis det er Iphone, så vis Facebook tab'en*/}
              {Platform.OS === 'ios' && <Tab.Screen name={"Facebook"} component={FacebookScreen} options={{tabBarIcon:({tintColor}) =>(<Entypo name="facebook" size={24} color={tintColor} />)}} />}
              <Tab.Screen name={"Google"} component={GoogleScreen} options={{tabBarIcon:({tintColor}) =>(<AntDesign name="google" size={24} color={tintColor} />)}} />
          </Tab.Navigator>
      </NavigationContainer>
  );
}

