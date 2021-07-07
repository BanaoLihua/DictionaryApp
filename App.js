import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EnglishScreen } from './src/English';
import { ChineseScreen } from './src/Chinese';


export default function App() {

  const [ text, setText ] = useState('');

  const onPressTest = async () => {
    return fetch('https://script.google.com/macros/s/AKfycbwxEVsaRz81dSRDtMJyIR0TKjDW6Wsqb5KwNxArlc6P0grghgbLDDMgr9sxWd1wXPEk/exec?word=allow')
    .then(res => res.text());
  }

  const onPressTest2 = () => {
    (async() => {setText(await onPressTest())})();
  }

  const onPressTest3 = () => {
    console.log(text)
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="English" component={EnglishScreen} />
        <Tab.Screen name="Chinese" component={ChineseScreen} />
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
