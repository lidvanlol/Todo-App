import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, Clipboard, ToastAndroid,TouchableOpacity} from 'react-native';
import {
  FAB,
  Portal,
  Provider,
  Appbar,
  Chip,
  Button,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {deleteTask, updateCompleted,todoRef} from '../../components/firebase';

export default function TodoDetailsScreen({ route }) {
  const navigation = useNavigation();
  const {
    id,

    content,
    finished,
    scheduledTime,

   
  } = route.params;

  const handleSetTaskId = (id) => setDeleteTaskId(id);
  const [deleteTaskId, setDeleteTaskId] = useState();
  const [checked, setFinished] = useState(finished);


 
  const [updateID, setUpdateID] = useState('');


  const updatebyButton = (id) => {
      todoRef
      .doc(id)
      .update({
        finished: !finished,
      })
      .then(function () {
        setFinished(!finished);
        updateCompleted(finished, updateID);
        navigation.navigate('TodoList');
        if (!finished) {
          handleSetTaskId(updateID);
        }
      });
  };

  // FAB
  const [open, setOpen] = useState(false);
  const onStateChange = () => setOpen(!open);

  const handleDivider = () => {
    if (scheduledTime !== '' || content !== '') {
      return {borderBottomWidth: 1, borderBottomColor: '#E8E8E8'};
    }
  };

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handleDelete = (id) => {
    deleteTask(navigation, id)
    navigation.navigate('TodoList');
    hideDialog();
  };

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Appbar.Content title="Todo Details" />
      </Appbar.Header>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            width: 320,
            alignSelf: 'center',
            borderRadius: 15,
          }}>
          <Dialog.Content>
            <Button title="Cancel" onPress={() => hideDialog()}>
              Cancel
            </Button>
            <Button title="Delete" onPress={() => handleDelete(id)}>
              Delete
            </Button>
            <Button title="Complete" onPress={() => updatebyButton(id)}>Complete </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <View style={{flex: 1}}>
        <View>
          <View style={handleDivider()}></View>

          <View>
            <Text style={[styles.taskDate]}>
              {moment(scheduledTime.toDate()).calendar()}
            </Text>
          </View>

          <View>
            <Text
              style={[
                styles.taskItemTitle,
                finished && {
                  textDecorationLine: finished ? 'line-through' : 'none',
                },
              ]}>
              {content}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => showDialog()}
            style={styles.showDialog}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Show Dialog</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    margin: 10,
    paddingHorizontal: 20,
    elevation: 2,
    paddingTop: 15,
    borderRadius: 15,
  },
  taskTitle: {
    fontWeight: '700',
    fontSize: 36,
    paddingTop: 5,
    paddingBottom: 10,
  },
  taskDate: {
    paddingVertical: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  showDialog: {
    backgroundColor: '#aa14e0',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    borderRadius:10
  },
  taskItemTitle: {
    padding: 20,

    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createdDate: {
    marginTop: 5,
    fontSize: 14,
  },
  content: {
    fontSize: 18,
    lineHeight: 29,
    paddingBottom: 15,
  },
});
