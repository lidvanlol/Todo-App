import React, {useState,FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


import {loginUser} from '../../components/firebase';



export default function LoginScreen({navigation}:any) {
  const [email, setEmail]: [string, Function] = useState('');
  const [password, setPassword]: [string, Function] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    loginUser(email, password);
    
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper} >
      <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.avoidView}>
          <Text style={styles.loginHeader}>Login</Text>
          <Text style={styles.labelText}>E-mail</Text>
          <TextInput
            textContentType="emailAddress"
            style={{
              color: 'white',
              borderBottomColor: 'white',
              borderBottomWidth: 1,
              paddingTop: 5,
              paddingBottom: 5,
              marginBottom: 30,
            }}
            onChangeText={(email) => setEmail(email)}
          />
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={{
              color: 'white',
              borderBottomColor: 'white',
              borderBottomWidth: 1,
              paddingTop: 5,
              paddingBottom: 5,
              marginBottom: 30,
            }}
            onChangeText={(password) => setPassword(password)}
          />
          <Text
            style={styles.navigateText}
            onPress={() => navigation.navigate('Registration')}>
            Dont have an account? Create one
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
              marginTop: 20,
            }}>
            <ActivityIndicator size="large" color="white" animating={loading} />
          </View>
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={[{opacity: 0.6}, styles.button]}
            onPress={handleLogin}>
            <Icon
              name="angle-right"
           
              size={32}
              style={styles.icon}
            />
          </TouchableHighlight>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  avoidView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },
  loginHeader: {
    fontSize: 28,
    color: 'white',
    fontWeight: '300',
    marginBottom: 40,
  },
  labelText: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 14,
    color: 'white',
  },
  buttonWrapper: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
    paddingTop: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
  },
  navigateText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
