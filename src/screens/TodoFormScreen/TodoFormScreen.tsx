
import React, {useState, FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Animated,
} from 'react-native';
import {
 
  Provider,
 
   
 
} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

import moment from 'moment';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Appbar from './Components/TodoFormHeader';
import {addTask} from '../../components/firebase';

interface Props{
  navigation: any,
 
}

const TodoDetails :FC<Props> = (props) => {
  const [content, setContent] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [scheduledTime, setscheduledTime] = useState('');

  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => {
    setDialogVisible(false);
    setError(false);
  };

  const [error, setError] = useState(false);

  const handleAddTask = async () => {
    if (content === '') {
      ToastAndroid.show('Task Content is empty', ToastAndroid.SHORT);
    }
    await addTask(
      props.navigation,

      scheduledTime,

      content,
    );

    ToastAndroid.show('Todo Added', ToastAndroid.SHORT);
    clearFields();

    NetInfo.fetch().then((state) => {
      !state.isConnected &&
        ToastAndroid.show(
          'Cannot add task at this moment. Please check your internet connection',
          ToastAndroid.SHORT,
        );
    });
  };

  const clearFields = () => {
    setContent('');
    setscheduledTime('');
  };

  // Date & time picker
  const handlePicker = (date) => {
    setscheduledTime(date);
    setIsVisible(false);
  };
  const showPicker = () => setIsVisible(true);
  const hidePicker = () => setIsVisible(false);

  return (
    <Provider>
      <Appbar
        navigation={props.navigation}
        showPicker={showPicker}
        handleAddTask={handleAddTask}
        clearFields={clearFields}
      />
      <View style={[styles.mainContainer]}>
        <View style={{flex: 1}}>
          <Text onPress={showPicker} style={[styles.dateInput]}>
            {scheduledTime !== ''
              ? moment(scheduledTime).calendar()
              : 'Scheduled Time'}
          </Text>

          <Text style={[styles.todoContentHead]}>Todo Content</Text>
          <TextInput
            style={[styles.contentInput]}
            onChangeText={(text) => setContent(text)}
            placeholder="Content"
            defaultValue={content}
            multiline={true}
          />
        </View>
        <DateTimePickerModal
          isVisible={isVisible}
          onConfirm={handlePicker}
          onCancel={hidePicker}
          mode="datetime"
          is24Hour={false}
        />
      </View>
    </Provider>
  );
}

export default TodoDetails
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  dateInput: {margin: 20, padding: 10,fontSize:20},
  titleInput: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1.2,
    borderBottomColor: '#E8E8E8',
  },
  todoContentHead: {
    margin: 10,
    fontWeight: 'bold',
    fontSize:22
  },
  contentInput: {
    paddingTop: 20,
    marginHorizontal: 10,
    fontSize: 18,
    lineHeight:30,
    

  },
  checkBox: {
    borderRadius: 10,
    borderWidth: 0,
  },
  bottomSheetContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },
  priorityHeading: {
    fontWeight: 'bold',
    fontSize: 15,
    //color: Colors.accentColor,
    paddingHorizontal: 20,
    // paddingBottom: 5,
  },
  setPriority: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  indicator: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 40,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 25,
    top: 7,
  },
});
