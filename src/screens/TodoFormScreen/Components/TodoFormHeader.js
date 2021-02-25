import React from "react";
import { Appbar } from "react-native-paper";

const TodoFormHeader = ({
  navigation,
  showPicker,
  handleAddTask,
  
  clearFields,

 
}) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          navigation.goBack();
          clearFields();
        }}
      />
      <Appbar.Content title="Add Todos" />
      <Appbar.Action icon="alarm" onPress={showPicker} />
     
      <Appbar.Action
        icon="check"
        onPress={handleAddTask}
       
      />
    </Appbar.Header>
  );
};

export default TodoFormHeader;
