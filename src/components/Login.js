import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  asyncAddUsers,
  asyncfetchData,
  asyncUpdateCurrentUser,
  fetchData,
} from '../redux/action';

const Login = props => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // AsyncStorage.clear();
    const fetchingData = async() => {
    if (!props.users.length) {
      await props.asyncfetchData();
    }
    console.log("currentUser after ayncfetchData inside login =>", props.currentUser);
    if (props.currentUser) {
      props.navigation.dispatch(StackActions.replace('Home'));
    }
  }
  fetchingData();
  }, [props.currentUser]);

  // const asyncfetchData = async () => {
  //   console.log('asyncfetchData');
  //   try {
  //     let currentUser = await AsyncStorage.getItem('currentuser');
  //     currentUser = currentUser ? JSON.parse(currentUser) : null;
  //     let users = await AsyncStorage.getItem('users');
  //     users = users ? JSON.parse(users) : [];
  //     console.log("currentUser", currentUser);
  //     console.log("users", users);
  //     props.fetchData(currentUser, users);
  //     // extra case
  //     if (currentUser) {
  //       props.navigation.dispatch(StackActions.replace('Home'));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLogin = async () => {
    const user = props.users.find(
      user => user.userId === userId && user.password === password,
    );
    //current user update
    // console.log("users inside login", props.users);
    await props.asyncUpdateCurrentUser(userId, password);
    if (!user) {
      await props.asyncAddUsers(userId, password);
      Alert.alert('Success!', 'New user registered.');
    } else {
      Alert.alert('Success!', 'User logged in.');
    }

    props.navigation.dispatch(StackActions.replace('Home'));
  };

  const { colors } = useTheme();

  return (
    <View style={styles.body}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder={'User Id'}
        onChangeText={text => setUserId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Pressable
        onPress={() => handleLogin(userId, password)}
        style={styles.loginButton}>
        <Text style={styles.text}>LOGIN</Text>
      </Pressable>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    users: state.users,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    asyncAddUsers: (userId, password) =>
      dispatch(asyncAddUsers(userId, password)),
    asyncfetchData: () => dispatch(asyncfetchData()),
    // fetchData: (currentUser, users) =>
    //   dispatch(fetchData(currentUser, users)),
    asyncUpdateCurrentUser: (userId, password) =>
      dispatch(asyncUpdateCurrentUser(userId, password)),
  };
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    marginBottom: 48,
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 8,
    backgroundColor: '#e8e8e8',
    width: '100%',
    padding: 20,
    borderRadius: 8,
    color: 'black',
  },
  loginButton: {
    marginVertical: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 17,
    borderRadius: 8,
    backgroundColor: '#ffd32a',
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
