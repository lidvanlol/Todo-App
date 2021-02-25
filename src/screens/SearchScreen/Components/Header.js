import React, { useContext } from "react";
import { Appbar, } from "react-native-paper";



const Header = ({ navigation,  handleSync}) => {
  

    return (
      <Appbar.Header>
        <Appbar.Content title="Search Screen" />
        <Appbar.Action icon="sync" onPress={() => handleSync()} />
       
      </Appbar.Header>
    );
};

export default Header;
