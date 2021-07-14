import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Keyboard, Alert } from 'react-native';
import { Input, Button, Header, ThemeProvider } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';

export const WordsEnDetail = ({route}) => {

    const navigation = useNavigation();

    const theme = {
        colors: {
            primary: 'limegreen'
        }
    }

    const word = route.params;

    const [answerList, setAnswerList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [wordTitle, setWordTitle] = useState('');

    const url = 'https://script.google.com/macros/s/AKfycbzZgYWR32JsBCn8H3UoRE_mHbqemR7ZQli_V1tzTsH_g-fDWb0hNBu5-Cs7h77RmkXG/exec';

    const fetchAnswer = async () => {
        const submitUrl = url + '?word=' + word;
        return fetch(submitUrl)
        .then(res => res.json());
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLoading(true);
            (async() => {
                setAnswerList(await fetchAnswer());
                setIsLoading(false);
                setWordTitle(word);
            })();
        });
        return unsubscribe;
    }, []);

    const renderItem = ({item}) => {
        return(
            <View style={styles.flatlistContent}>
                <Text>{item.word}</Text>
            </View>
        )
    }
    return (
        <View>
            <ThemeProvider theme={theme}>
                <Header centerComponent={{text: `${word}の意味`, style: {color: 'white', fontSize: 20, height: 25}}} />
                {isLoading && 
                <Spinner
                    visible
                    textContent="検索中"
                    textStyle={{ color: 'white' }}
                />}
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.wordTitle}>{wordTitle}</Text>
                </View>
                <FlatList
                    data={answerList}
                    renderItem={renderItem}
                    keyExtractor={answerList => `${answerList.key}`}
                    style={styles.flatlist}
                />
            </ThemeProvider>
        </View>
    )
}
const styles = StyleSheet.create({
    wordTitle: {
        fontSize: 40,
        marginLeft: 10,
        marginBottom: 10
    },
    flatlist: {
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        marginBottom: 120
    },
    flatlistContent: {
        padding: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    }
})