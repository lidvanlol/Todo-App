import React, { useContext } from "react";
import { Appbar, } from "react-native-paper";
import auth from '@react-native-firebase/auth';


const Header = ({ navigation,  handleSync,logout}) => {
  
  logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };

    return (
      <Appbar.Header>
        <Appbar.Content title="Settings Screen" />
        <Appbar.Action icon="sync" onPress={() => handleSync()} />
        <Appbar.Action icon="logout" onPress={() => logout()} />
      </Appbar.Header>
    );
};

export default Header;
