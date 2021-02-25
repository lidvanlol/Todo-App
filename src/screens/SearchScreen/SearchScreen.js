import React, {useState, useCallback, useContext} from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  FlatList,
  RefreshControl,
  Text,
  Button,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Provider,TextInput} from 'react-native-paper';

import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

import AppBar from './Components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SearchScreen = ({}) => {
  const navigation = useNavigation();
const [finished, setFinished] = useState([]);
  const [deleteID, setdeleteID] = useState('');
const [refreshing, setRefreshing] = useState(true);
const [content, setContent] = useState([]);
  

const searchTasks = async (search) => {
  const dbRef = firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Todos')
    .where('content','>=','==',  search);

  let list = [];

  const snapshot = await dbRef.orderBy('content','desc', search).get();
  snapshot.forEach((doc) => {
    list.push({
      id: doc.id,
      ...doc.data(),
    });
   
  });
   setContent(content);
  return list;
 
};








  
  const onRefresh = async () => {
    setRefreshing(true);
    ToastAndroid.show('Updating your tasks', ToastAndroid.SHORT);
    getTasks();
  };

  const [taskList, setTasksList] = useState([]);

  const getTasks = async () => {
    let list = await searchTasks();

    setTasksList(list);
    setRefreshing(false);

    NetInfo.fetch().then((state) => {
      !state.isConnected &&
        ToastAndroid.show(
          'Cannot retrieve tasks at this moment. Please check your internet connection',
          ToastAndroid.SHORT,
        );
    });
  };

 

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      getTasks();

      return () => (isMounted = false);
    }, []),
  );

  /**
   * Sync with cloud storage
   */
  const handleSync = async () => {
    setRefreshing(true);
    await getTasks();
    ToastAndroid.show('Synced with cloud storage', ToastAndroid.SHORT);
  };


  

  return (
    <Provider>
      <AppBar navigation={navigation} handleSync={handleSync} />
      <TextInput
        
        onChangeText={(search) => searchTasks(search)}
        placeholder="Search"
       
      />
      <View style={[styles.flatListContainer]}>
        <FlatList
          removeClippedSubviews={true}
          data={taskList}
          extraData={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.mainContainer}>
              <View style={[styles.taskListContainer]}>
                <View style={styles.taskListView}>
                  <Text
                    style={[
                      styles.taskItemTitle,
                      finished && {
                        textDecorationLine: item.finished
                          ? 'line-through'
                          : 'none',
                      },
                    ]}>
                    {item.content}
                  </Text>
                  <Text style={styles.date}>
                    {item.scheduledTime !== ''
                      ? 'Due ' + moment(item.scheduledTime.toDate()).calendar()
                      : moment(item.scheduledTime.toDate()).calendar()}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </Provider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  taskItemTitle: {
    fontSize: 22,
    textAlign: 'center',
  },
  delete: {
    width: 150,
    height: 30,
    backgroundColor: '#ccc',

    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 20,
    padding: 10,
  },
  taskListContainer: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  email: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  mainContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
  },
});
