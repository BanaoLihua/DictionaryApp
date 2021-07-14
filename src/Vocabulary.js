import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, ThemeProvider, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

export const VocabularyScreen = () => {

    const theme = {
        colors: {
            primary: 'limegreen'
        }
    }

    const navigation = useNavigation();

    return (
        <View>
            <ThemeProvider theme={theme}>
                <Header 
                    centerComponent={{text: '単語帳', style: {color: 'white', fontSize: 20, height: 25}}}
                />
                <Card>
                    <Card.Title>英語</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('../assets/carden.jpg')} onPress={() => navigation.navigate('wordsEn')}>
                    </Card.Image>
                </Card>
                <Card>
                    <Card.Title>中国語</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('../assets/cardcn.jpg')} onPress={() => navigation.navigate('wordsCn')}>
                    </Card.Image>
                </Card>
            </ThemeProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderBottomColor: 'lightblue',
        borderBottomWidth: 1
    },
    flatlist: {
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        marginBottom: 140
    },
    flatlistContent: {
        padding: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    }
})