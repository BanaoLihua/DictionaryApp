import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput, StyleSheet, FlatList } from 'react-native';

export const EnglishScreen = () => {

    const [answerList, setAnswerList] = useState([]);

    const [text, setText] = useState('');

    const [word, onChangeWord] = useState('');

    const url = 'https://script.google.com/macros/s/AKfycbzZgYWR32JsBCn8H3UoRE_mHbqemR7ZQli_V1tzTsH_g-fDWb0hNBu5-Cs7h77RmkXG/exec';

    const fetchAnswer = async () => {
        const submitUrl = url + '?word=' + word;
        return fetch(submitUrl)
        .then(res => res.json());
    }

    const onPressFetch = () => {
        (async() => {setAnswerList(await fetchAnswer())})();
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