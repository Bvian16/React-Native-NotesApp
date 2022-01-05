import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { asyncAddNote, asyncEditNote } from '../redux/action';

export const dark = {
  background: 'black',
  foreground: '#2C3A47',
  text: '#ffd32a',
};

const NoteForm = props => {
  // const {id, title, content} = props;
  const { id, title, content } = props.route.params;
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  const navigation = useNavigation();

  const addNote = () => {
    props.asyncAddNote(id, noteTitle, noteContent);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    ToastAndroid.show('Successfully Added', ToastAndroid.SHORT);
  };

  const editNote = async () => {
    // try {
    //   const currentuserid = JSON.parse(
    //     await AsyncStorage.getItem('currentuser'),
    //   ).userid;

    //   let oldnotesofcurrentuserid = await AsyncStorage.getItem('notes');
    //   oldnotesofcurrentuserid = oldnotesofcurrentuserid
    //     ? JSON.parse(oldnotesofcurrentuserid)[currentuserid]
    //     : [];

    //   const newnotesofcurrentuserid = oldnotesofcurrentuserid.map(note => {
    //     if (note.id === id) {
    //       return {id: id, title: noteTitle, content: noteContent};
    //     }
    //     return note;
    //   });
    //   const oldnotes = JSON.parse(await AsyncStorage.getItem('notes'));
    //   const newnotes = {
    //     ...oldnotes,
    //     [currentuserid]: newnotesofcurrentuserid,
    //   };
    //   await AsyncStorage.setItem('notes', JSON.stringify(newnotes));
    //   // getNotes();
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: 'Home'}],
    //   });

    props.asyncEditNote(id, noteTitle, noteContent);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });

    ToastAndroid.show('Successfully Updated', ToastAndroid.SHORT);
  };

  const SaveIcon = () => {
    return <Icon name="save-outline" size={34} color={dark.text} />;
  };

  const BackButton = () => {
    return (
      <View style={styles.button}>
        <Pressable
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }>
          <Icon name="arrow-back-outline" size={34} color={dark.text} />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.root, styles.darkBackground]}>
      <View style={styles.header}>
        <View style={styles.rightLeftContainer}>
          <BackButton />
        </View>
        <View style={styles.centerContainer}>
          <TextInput
            style={[styles.title, styles.darkInput]}
            placeholder="Title"
            placeholderTextColor={'white'}
            value={noteTitle}
            onChangeText={text => setNoteTitle(text)}
            maxLength={50}
          />
        </View>
        <View style={styles.rightLeftContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              // if note exists, then update
              if (props.notes.find(note => note.id === id) !== undefined) {
                editNote();

                console.log('update note');
              } else {
                // add new note
                addNote();

                console.log('add note');
              }
            }}>
            <SaveIcon />
          </Pressable>
        </View>
      </View>
      <View style={[styles.body, styles.Body]}>
        <TextInput
          style={[styles.content, styles.darkInput]}
          value={noteContent}
          multiline={true}
          onChangeText={text => setNoteContent(text)}
          maxLength={10000}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    asyncAddNote: (id, noteTitle, noteContent) =>
      dispatch(asyncAddNote(id, noteTitle, noteContent)),
    asyncEditNote: (id, noteTitle, noteContent) =>
      dispatch(asyncEditNote(id, noteTitle, noteContent)),
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLeftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 3,
  },
  title: {
    height: 45,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  body: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  Body: {
    flex: 8,
  },

  content: {
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    height: '95%',
    textAlignVertical: 'top',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center',
  },

  darkBackground: {
    backgroundColor: dark.background,
  },
  darkText: {
    color: 'white',
  },
  darkInput: {
    backgroundColor: dark.foreground,
    color: 'white',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
