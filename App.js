import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EnglishScreen } from './src/English';
import { ChineseScreen } from './src/Chinese';
import { VocabularyScreen } from './src/Vocabulary';
import { createStackNavigator } from '@react-navigation/stack';
import { WordsCn } from './src/WordsCn';
import { WordsEn } from './src/WordsEn';
import { WordsEnDetail } from './src/WordsEnDetail';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {

  const Tab = createBottomTabNavigator();

  const Stack = createStackNavigator();

  const VocabularyStackScreen = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="vocaulary" component={VocabularyScreen} />
            <Stack.Screen name="wordsEn" component={WordsEn} />
            <Stack.Screen name="wordsEnDetail" component={WordsEnDetail} />
            <Stack.Screen name="wordsCn" component={WordsCn} />
        </Stack.Navigator>
    )
}

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let icon;
            switch(route.name) {
              case '英語': {
                icon = focused ? require('./assets/iconENfc.png') : require('./assets/iconEN.png');
              } break;
              case '中国語': {
                icon = focused ? require('./assets/iconCNfc.png') : require('./assets/iconCN.png');
              } break;
              case '単語帳': {
                let color = focused ? 'limegreen' : 'lightgray'
                return <Icon name={'bookmark-o'} size={35} color={color} />
              }
            }
            return <Image source={icon} style={{width: 40, height: 40}} />
          }
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name="英語" component={EnglishScreen} />
        <Tab.Screen name="中国語" component={ChineseScreen} />
        <Tab.Screen name="単語帳" component={VocabularyStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
