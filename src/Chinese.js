import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput, StyleSheet, FlatList } from 'react-native';

export const ChineseScreen = () => {

    const [answerList, setAnswerList] = useState([]);

    const [text, setText] = useState('');

    const [word, onChangeWord] = useState('');

    const url = 'https://script.google.com/macros/s/AKfycbwnnp8TH7hoqGTEUP5QV3Q1EB7yD9HlK0y1EdN1bdCvG62HO-BTddVcGW5jhEzS4ai_/exec';

    const fetchAnswer = async () => {
        const submitUrl = url + '?word=' + word;
        return fetch(submitUrl)
        .then(res => res.json());
    }

    const onPressFetch = () => {
        (async() => {setAnswerList(await fetchAnswer())})();
    }

    const onPressTest = () => {
        console.log(answerList[0].word);
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={answerList}
                renderItem={({item}) => {
                    return <Text>{item.word}</Text>
                }}
                keyExtractor={answerList => `${answerList.key}`}
            />
            <TextInput onChangeText={onChangeWord} value={word} style={styles.input} />
            <Button title="検索" onPress={onPressFetch} />
            <Button title="テスト" onPress={onPressTest} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1
    }
})