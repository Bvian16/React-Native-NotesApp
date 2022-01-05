import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {asyncDeleteNote} from '../redux/action';

const Card = props => {
  const {id, title, content} = props;

  const deleteNote = () => {
    // try {
    //   const currentuserid = JSON.parse(
    //     await AsyncStorage.getItem('currentuser'),
    //   ).userid;
    //   let notesofcurrentuserid = await AsyncStorage.getItem('notes');
    //   notesofcurrentuserid = notesofcurrentuserid
    //     ? JSON.parse(notesofcurrentuserid)[currentuserid]
    //     : [];
    //   const filterednotes = notesofcurrentuserid.filter(note => note.id !== id);
    //   const oldnotes = JSON.parse(await AsyncStorage.getItem('notes'));
    //   const newnotes = {
    //     ...oldnotes,
    //     [currentuserid]: filterednotes,
    //   };
    //   await AsyncStorage.setItem('notes', JSON.stringify(newnotes));
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   props.navigation.dispatch(StackActions.replace('Home'));
    // }
    props.asyncDeleteNote(id);
  };

  const showAlert = () =>
    Alert.alert(
      'Delete this note?',
      '',
      [
        {
          text: 'OK',
          onPress: () => deleteNote(),
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancelled');
          },
        },
      ],
      {cancelable: true},
    );

  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => {
          props.navigation.navigate('NoteForm', {
            title: title,
            content: content,
            id: id,
          });
        }}
        onLongPress={showAlert}
        delayLongPress={250}>
        <View style={styles.card}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    asyncDeleteNote: id => dispatch(asyncDeleteNote(id)),
  };
};
const styles = StyleSheet.create({
  root: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#ffd32a',
  },
  title: {
    fontSize: 19,
    padding: 13,
    color: 'black',
  },
});

export default connect(null, mapDispatchToProps)(Card);
