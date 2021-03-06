import React, { useState, useRef, useEffect } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Header, ThemeProvider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { useNavigation } from '@react-navigation/native';

const theme = {
    colors: {
        primary: 'limegreen'
    }
}

export const WordsEn = () => {
    const navigation = useNavigation();
     
    const storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
    });

    const [listData, setListData] = useState();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            storage.load({key: 'english'})
            .then(res => setListData(res))
        });
        return unsubscribe;
    }, []);

    const rowTranslateAnimatedValues = {};

    //単語の表示制限
    const max = 1000;
    Array(max)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    // Todo: リストの削除時にkeyがずれる為、消した要素以降の値のkeyを減らす必要がある。なお、keyは数字だがstring型

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(async() => {
                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                setListData(newData);
                animationIsRunning.current = false;
                
                console.log(newData)
                await storage.save({
                    key: "english",
                    data: newData
                })
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                styles.rowFrontContainer,
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 50],
                    }),
                },
            ]}
        >
            <TouchableHighlight
                onPress={() => {
                    navigation.navigate('wordsEnDetail', data.item.text)
                }}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View>
                    <Text style={styles.frontText}>{data.item.text}</Text>
                </View>
            </TouchableHighlight>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>削除</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ThemeProvider theme={theme}>
                <Header 
                    centerComponent={{text: '単語帳', style: {color: 'white', fontSize: 20, height: 25}}}
                />
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    keyExtractor={( item ) => `${item.key}`}
                />
            </ThemeProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    frontText: {
        fontSize: 30,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
