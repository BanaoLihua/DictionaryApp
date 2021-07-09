import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EnglishScreen } from './src/English';
import { ChineseScreen } from './src/Chinese';


export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let icon;
            switch(route.name) {
              case 'English': {
                icon = focused ? require('./assets/iconENfc.png') : require('./assets/iconEN.png');
              } break;
              case '中文': {
                icon = focused ? require('./assets/iconCNfc.png') : require('./assets/iconCN.png');
              } break;
            }
            return <Image source={icon} style={{width: 40, height: 40}} />
          }
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name="English" component={EnglishScreen} />
        <Tab.Screen name="中文" component={ChineseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
