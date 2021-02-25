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
import {
  Provider,
 
} from 'react-native-paper';

import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import {getAllTasks, currentUserEmail,todoRef, logout} from '../../components/firebase';
import {useNavigation} from '@react-navigation/native';



import AppBar from './Components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SettingsScreen = ({}) => {
    const navigation = useNavigation();

  const [deleteID, setdeleteID] = useState('');
 
  

  const onDelete = (deleteID) => {
    todoRef
      .doc(deleteID)
      .delete()
      .then(function () {
        console.log('Remove succeeded.');
        setdeleteID('');
          getTasks(sortMode, sortOrder);
        todoRef.onSnapshot();
      })
      .catch(function (error) {
        console.log('Remove failed: ' + error.message);
      });
  };

  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    ToastAndroid.show('Updating your tasks', ToastAndroid.SHORT);
    getTasks(sortMode, sortOrder);
  };

  const [taskList, setTasksList] = useState([]);

  const getTasks = async () => {
    let list = await getAllTasks(sortMode, sortOrder);
  

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

  
  const [sorting, setSorting] = useState({
    sortMode: 'scheduledTime',
    sortOrder: 'desc',
  });
  const {sortMode, sortOrder} = sorting;
 



  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      getTasks(sortMode, sortOrder);

      return () => (isMounted = false);
    }, [sorting]),
  );

  /**
   * Sync with cloud storage
   */
  const handleSync = async () => {
    setRefreshing(true);
    await getTasks(sortMode, sortOrder);
    ToastAndroid.show('Synced with cloud storage', ToastAndroid.SHORT);
  };

  // const logout = () => {
  //      auth()
  //         .signOut()
  //         .then(() => {
  //           navigation.navigate('Login');
  //         });
  // }


 const email = currentUserEmail();
    const [finished, setFinished] = useState([]);

  return (
    <Provider>
      <AppBar
        navigation={navigation}
        logout={logout}
        handleSync={handleSync}
      />

      <View style={[styles.flatListContainer]}>
        <Text style={styles.email}>{email}</Text>
       
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
              <TouchableOpacity
                style={styles.delete}
                onPress={() => onDelete(item.id)}>
                <Text>Delete Task</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Provider>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  taskItemTitle: {
    fontSize: 22,
    textAlign:'center'
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
