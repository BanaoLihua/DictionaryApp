import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Header, ThemeProvider } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

export const WordsCnDetail = ({route}) => {

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

    const url = 'https://script.google.com/macros/s/AKfycbwnnp8TH7hoqGTEUP5QV3Q1EB7yD9HlK0y1EdN1bdCvG62HO-BTddVcGW5jhEzS4ai_/exec';

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
                <Header centerComponent={{text: `"${word}"の意味`, style: {color: 'white', fontSize: 20, height: 25}}} />
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
        marginTop: 10,
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