import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const loginUser = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      Alert.alert(error.message);
    });
};

//if (user) {
//       usersRef
//         .doc(user.uid)
//         .get()
//         .then((document) => {
//           const userData = document.data();
//           setLoading(false);
//           setUser(userData);
//         })
//         .catch((error) => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }

export const signupUser = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const userUid = auth().currentUser.uid;

      firestore().collection('users').doc(userUid).set({
        userUid: userUid,
        userEmail: email,
      });
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
};

export const passwordReset = (email) => auth().sendPasswordResetEmail(email);

export const addTask = async (
  navigation,

  scheduledTime,
  content,

  finished = false,
) => {
  //const timeStamp = firestore.Timestamp.fromDate(new Date());

  await firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Todos')
    .add({
      userId: auth().currentUser.uid,

      content: content,
      scheduledTime: scheduledTime,

      finished: finished,
    })
    .catch((error) => console.log(error));

  navigation.navigate('TodoList');
};

export const deleteTask = async (navigation, id) => {
  await firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Todos')
    .doc(id)
    .delete();

  navigation.navigate('TodoList');
};

export const SettingsdeleteTask = async (id) => {
  await firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Todos')
    .doc(id)
    .delete();
};

export const updateCompleted = async (finished, id) => {
  await firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Todos')
    .doc(id)
    .update({finished: !finished});
};

export const currentUserEmail = () => {
  return auth().currentUser.email;
};
export const todoRef = firestore()
  .collection('users')
  .doc(auth().currentUser.uid)
  .collection('Todos');

export const getAllTasks = async (sortBy, sortOrder) => {
  const dbRef = firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Todos');

  let list = [];

  const snapshot = await dbRef.orderBy(sortBy, sortOrder).get();
  snapshot.forEach((doc) => {
    list.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return list;
};

export const searchTasks = async (search) => {
  const dbRef = firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Todos')
    .where('content',">=",'<=',search)
    
    
  

  let list = [];

  const snapshot = await dbRef.orderBy('content','desc',search).get();
  snapshot.forEach((doc) => {
    list.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return list;
};
