import { StackActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { asyncfetchNotes, asyncRemoveCurrentUser } from '../redux/action';
import Card from './Card';

export const dark = {
  background: '#2C3A47',
  foreground: 'black',
  text: '#ffd32a',
};

const Home = props => {
  
  useEffect(() => {
    props.asyncfetchNotes();
  }, []);

  const logoutHandler = async () => {
    await props.asyncRemoveCurrentUser();
    props.navigation.dispatch(StackActions.replace('Login'));
  };

  const newNoteId = () => {
    return uuid.v4().toString();
  };

  const showAlert = () =>
    Alert.alert(
      'Are you sure you want to logout of this app?',
      '',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('Cancelled');
          },
        },
        {
          text: 'Yes',
          onPress: () => logoutHandler(),
        },
      ],
      { cancelable: true },
    );

  const LogoutIcon = () => {
    return <Icon name="log-out-outline" size={34} color={dark.text} />;
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.header, styles.header]}>
        <View style={[styles.rightLeftContainer]} />
        <View style={styles.centerContainer}>
          <Text style={[styles.headerText, styles.title]}>Notes</Text>
        </View>
        <View style={styles.rightLeftContainer}>
          <Pressable style={styles.button} onPress={() => showAlert()}>
            <LogoutIcon />
          </Pressable>
        </View>
      </View>
      <View style={[styles.Body, styles.body]}>
        <ScrollView>
          {props.notes.map(note => {
            return (
              <Card
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                navigation={props.navigation}
              />
            );
          })}
        </ScrollView>
        <ActionButton
          buttonTextStyle={{ color: '#ffd32a', fontSize: 34 }}
          buttonColor="black"
          onPress={() => {
            props.navigation.navigate('NoteForm', {
              id: newNoteId(),
              title: '',
              content: '',
              notes: props.notes,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes,
    currentUser: state.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    asyncfetchNotes: () => dispatch(asyncfetchNotes()),
    asyncRemoveCurrentUser: () => dispatch(asyncRemoveCurrentUser()),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: dark.foreground,
  },
  rightLeftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 3,
  },
  headerText: {
    fontSize: 23,
    textAlign: 'center',
  },
  Body: {
    flex: 15,
    backgroundColor: dark.background,
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center',
  },
  title: {
    color: dark.text,
  },
  logout: {
    marginLeft: 7,
    fontSize: 15,
    color: dark.text,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
