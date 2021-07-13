import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Keyboard } from 'react-native';
import { Input, Button, Header, ThemeProvider, Card } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { createStackNavigator } from '@react-navigation/stack';

export const WordsEn = () => {

    const theme = {
        colors: {
            primary: 'limegreen'
        }
    }

    const wordsList = [
        {
            key: 0,
            word: 'apple'
        },
        {
            key: 1,
            word: 'banana'
        },
        {
            key: 2,
            word: 'grape'
        }
    ]

    const renderItem = ({item}) => {
        return (
            <View style={styles.flatlistContent}>
                <Text style={{fontSize: 30}}>{item.word}</Text>
            </View>
        )
    }

    return (
        <View>
            <ThemeProvider theme={theme}>
                <Header 
                    centerComponent={{text: '単語一覧', style: {color: 'white', fontSize: 20, height: 25}}}
                />
            </ThemeProvider>
            <FlatList 
                data={wordsList}
                renderItem={renderItem}
                keyExtractor={wordsList => `${wordsList.key}`}
                style={styles.flatlist}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatlist: {
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        marginBottom: 190
    },
    flatlistContent: {
        padding: 10,
        height: 70,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})