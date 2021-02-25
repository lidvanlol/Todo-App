import React, {useState, useCallback, useContext, FC} from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Provider, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';

import {todoRef, getAllTasks, updateCompleted} from '../../components/firebase';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppBar from './Components/Header';

const TodoListScreen = () => {
  /**
   * Refresh Control
   */
    const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [tasksList, setTasksList] = useState([]);
  const onRefresh = async () => {
    setRefreshing(true);
    ToastAndroid.show('Updating your tasks', ToastAndroid.SHORT);
    getTasks(sortMode, sortOrder);
  };

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
  const [deleteTaskId, setDeleteTaskId] = useState();

  const handleSetTaskId = (id) => setDeleteTaskId(id);

  // const handleDisplayMode = (value) => setDisplayMode(value);

  const LeftItem = () => {
    return (
      <View style={styles.leftItem}>
        <Text style={styles.leftItemText}>Complete</Text>
      </View>
    );
  };

  const RightItem = () => {
    return (
      <View style={styles.rightItem}>
        <TouchableOpacity style={styles.deleteButtonStyle}>
          <Text style={styles.textButtonStyle}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
const [finished, setFinished] = useState([]);
    const searchResults = async (
      search,
      id,
      content,
      finished,
      scheduledTime,
    ) => {
      const dbRef = firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('Todos')

        .where('content', '>=', search);

      let list = [];

      const snapshot = await dbRef.orderBy('content', 'desc').get();
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
        setContent(content);
        setFinished(finished);
      });
      return list;
    };
  
  
  const [updateID, setUpdateID] = useState(finished);
  const [deleteID, setdeleteID] = useState();

  const onDelete = (deleteID, refreshing) => {
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

  const updatebyButton = (updateID) => {
    todoRef
      .doc(updateID)
      .update({
        finished: !finished,
      })
      .then(function () {
         console.log('Update Finished');
        setFinished(!finished);
        updateCompleted(finished, updateID);
       getTasks(sortMode, sortOrder);
        if (!finished) {
         
          handleSetTaskId(updateID);
        getTasks(sortMode, sortOrder);

        }
       getTasks(sortMode, sortOrder);
      });
  };

  return (
    <Provider>
      <AppBar navigation={navigation} handleSync={handleSync} />
    
      <View style={[styles.flatListContainer]}>
        <FlatList
          removeClippedSubviews={true}
          data={tasksList}
          extraData={tasksList}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <View>
              <Swipeable
                onSwipeableLeftOpen={() => updatebyButton(item.id)}
                onSwipeableRightOpen={() => onDelete(item.id)}
                renderLeftActions={(progress, dragx) => (
                  <LeftItem
                 
                  />
                )}
                renderRightActions={(progress, dragx) => <RightItem />}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('TodoDetails', item);
                  }}>
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

                  <Text style={[styles.taskDate]}>
                    {item.scheduledTime !== ''
                      ? 'Due ' + moment(item.scheduledTime.toDate()).calendar()
                      : moment(item.scheduledTime.toDate()).calendar()}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            </View>
          )}
        />
      </View>
    </Provider>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  mainContainer: {
    marginVertical: 5,
    marginHorizontal: 7,
  },
  taskListContainer: {
    elevation: 1,
  },
  taskListView: {
    flex: 1,
    paddingVertical: 9,
  },
  taskItemTitle: {
    paddingTop: 10,

    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskDate: {
    margin: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#767676',
  },

  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
  titleWrapper: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black',
    marginVertical: 20,
  },
  leftItem: {
    flex: 1,
    backgroundColor: '#76a21e',
    justifyContent: 'center',
  },
  archiveButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#3e64ff',
  },
  archiveTextButtonStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  textButtonStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#c00000',
  },
  rightItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  leftItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#fff',
  },
  listItemWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  listItem: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
    flex: 1,
    height: 60,
    backgroundColor: '#fff',
  },
  item2: {
    flex: 4,
    justifyContent: 'center',
  },
  item: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textBtn: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    width: '80%',
    margin: 5,
    alignSelf: 'center',
  },
  description: {
    fontSize: 16,
    color: '#000',
  },
});
