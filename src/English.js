import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList, StatusBar } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



export const EnglishScreen = () => {

    const [answerList, setAnswerList] = useState([]);


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

    const renderItem = ({item}) => {
        return(
            <View style={styles.flatlist}>
                <Text>{item.word}</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Input onChangeText={onChangeWord} 
                    value={word} 
                    placeholder='Input the word'
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
            <FlatList
                data={answerList}
                renderItem={renderItem}
                keyExtractor={answerList => `${answerList.key}`}
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
        padding: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    }
})