import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Keyboard, Alert } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Storage from 'react-native-storage';

export const EnglishScreen = () => {

    const [answerList, setAnswerList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [word, onChangeWord] = useState('');

    const [wordTitle, setWordTitle] = useState('');

    const [addIcon, setAddIcon] = useState(false);

    const [wordsData, setWordsData] = useState([]);

    const url = 'https://script.google.com/macros/s/AKfycbzZgYWR32JsBCn8H3UoRE_mHbqemR7ZQli_V1tzTsH_g-fDWb0hNBu5-Cs7h77RmkXG/exec';

    const fetchAnswer = async () => {
        const submitUrl = url + '?word=' + word;
        return fetch(submitUrl)
        .then(res => res.json());
    }

    const onPressFetch = () => {
        Keyboard.dismiss();
        setIsLoading(true);
        (async() => {
            setAnswerList(await fetchAnswer());
            setIsLoading(false);
            setWordTitle(word);
            setAddIcon(true);
        })();
    }

    const renderItem = ({item}) => {
        return(
            <View style={styles.flatlistContent}>
                <Text>{item.word}</Text>
            </View>
        )
    }

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            storage.load({key: 'english'})
            .then(res => setWordsData(res))
        })
        return unsubscribe;
    }, [])

    const storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true
    });

    const onPressBookmark = async () => {
        wordsData.push({key: wordsData.length, text: word})
        storage.save({
            key: 'english',
            data: wordsData
        });
        Alert.alert('単語帳に追加しました！')
    }

    return (
        <View>
            <Header 
                centerComponent={{text: 'Weblio英語辞書', style: {color: 'white', fontSize: 20, height: 25}}}
            />
            <View >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 320 }}>
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
                {/* todo: ブックマークボタンがダサい */}
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.wordTitle}>{wordTitle}</Text>
                    {addIcon && 
                    <Icon name='bookmark-o' color="limegreen" size={45} onPress={onPressBookmark}/>
                    }
                </View>

            </View>
            {isLoading && <Spinner
                visible
                textContent="検索中"
                textStyle={{ color: 'white' }}
            />}
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
    wordTitle: {
        fontSize: 40,
        marginLeft: 10,
        marginBottom: 10
    },
    flatlist: {
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        marginBottom: 190
    },
    flatlistContent: {
        padding: 10,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    }
})