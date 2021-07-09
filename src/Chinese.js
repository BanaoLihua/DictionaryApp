import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Input, Button, Header, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ChineseScreen = () => {

    const theme = {
        colors: {
            primary: 'orangered'
        }
    }

    const [answerList, setAnswerList] = useState([]);

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
                <Header 
                    centerComponent={{text: 'Weblio中国語辞書', style: {color: 'white', fontSize: 20}}}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 320 }}>
                    <Input onChangeText={onChangeWord} 
                        value={word} 
                        placeholder='请输入单词'
                        leftIcon={{
                                type: 'font-awesome', 
                                name: 'search', 
                                color: 'lightgray', 
                                size: 20
                                }} 
                    />
                    <Button title="検索" 
                            onPress={onPressFetch} 
                            style={{marginBottom: 10}}
                    />
                </View>
            </ThemeProvider>
            <FlatList
                data={answerList}
                renderItem={renderItem}
                keyExtractor={answerList => `${answerList.key}`}
                style={styles.flatlist}
            />
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