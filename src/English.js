import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native';

export const EnglishScreen = () => {

    const [text, setText] = useState('');

    const [word, onChangeWord] = useState('');

    const url = 'https://script.google.com/macros/s/AKfycbwxEVsaRz81dSRDtMJyIR0TKjDW6Wsqb5KwNxArlc6P0grghgbLDDMgr9sxWd1wXPEk/exec';

    const fetchAnswer = async () => {
        const submitUrl = url + '?word=' + word;
        return fetch(submitUrl)
        .then(res => res.text());
    }

    const onPressFetch = () => {
        (async() => {setText(await fetchAnswer())})();
    }


    return (
        <View style={styles.wrapper}>
            <Text>{text}</Text>
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