import AsyncStorage from '@react-native-async-storage/async-storage';

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const ADD_USERS = 'ADD_USERS';
export const FETCH_DATA = 'FETCH_DATA';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const FETCH_NOTES = 'FETCH_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

export const updateCurrentUser = (userId, password) => {
  return {
    type: UPDATE_CURRENT_USER,
    userId: userId,
    password: password,
  };
};

export const addUsers = (userId, password) => {
  return {
    type: ADD_USERS,
    userId: userId,
    password: password,
  };
};
export const fetchData = (currentUser, users) => {
  return {
    type: FETCH_DATA,
    currentUser: currentUser,
    users: users,
  };
};

export const fetchNotes = notes => {
  return {
    type: FETCH_NOTES,
    notes: notes,
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
};

export const addNote = notes => {
  return {
    type: ADD_NOTE,
    notes: notes,
  };
};

export const deleteNote = notes => {
  return {
    type: DELETE_NOTE,
    notes: notes,
  };
};

export const editNote = notes => {
  return {
    type: EDIT_NOTE,
    notes: notes,
  };
};

export const asyncRemoveCurrentUser = navigation => {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('currentuser');
      console.log('asyncRemoveCurrentUser');
      dispatch(removeCurrentUser());
      AsyncStorage.getItem('currentuser').then(value => {
        console.log("currentUser => ", value);
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const asyncfetchData = () => {
  return async dispatch => {
    try {
      console.log('asyncfetchData');
      let currentUser = await AsyncStorage.getItem('currentuser');
      currentUser = currentUser ? JSON.parse(currentUser) : null;
      let users = await AsyncStorage.getItem('users');
      users = users ? JSON.parse(users) : [];
      console.log("currentUser", currentUser);
      console.log("users", users);
      dispatch(fetchData(currentUser, users));
    } catch (error) {
      console.log(error);
    }
  };
};

export const asyncfetchNotes = () => {
  return async (dispatch, getState) => {
    console.log("asyncfetchNotes");
    const currentUser = getState().currentUser;
    let notes = await AsyncStorage.getItem('notes');
    notes = notes ? JSON.parse(notes) : [];
    // console.log(notes, currentUser.userId);
    const notesOfCurrentUserId = notes[currentUser.userId]
      ? notes[currentUser.userId]
      : [];
    dispatch(fetchNotes(notesOfCurrentUserId));
    console.log("Notes of currentUser in asyncfetchNotes", getState().notes);
  };
};

export const asyncUpdateCurrentUser = (userId, password) => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem(
        'currentuser',
        JSON.stringify({ userId, password }),
      );
      console.log('asyncUpdateCurrentUser');
      dispatch(updateCurrentUser(userId, password));
      AsyncStorage.getItem('currentuser').then(value => {
        console.log("currentUser => ", value);
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const asyncAddUsers = (userId, password) => {
  return async (dispatch, getState) => {
    await AsyncStorage.setItem(
      'users',
      JSON.stringify([...getState().users, { userId, password }]),
    );
    dispatch(addUsers(userId, password));
    AsyncStorage.getItem('users').then(value => {
      console.log("All Users => ", value);
    });
  };
};

export const asyncAddNote = (id, title, content) => {
  return async (dispatch, getState) => {
    console.log('asyncAddNote');
    const currentUser = getState().currentUser;
    let notes = await AsyncStorage.getItem('notes');
    notes = notes ? JSON.parse(notes) : [];
    let notesOfCurrentUserId = notes[currentUser.userId]
      ? notes[currentUser.userId]
      : [];
    notesOfCurrentUserId = [...notesOfCurrentUserId, { id, title, content }];
    const newNotes = {
      ...notes,
      [currentUser.userId]: notesOfCurrentUserId,
    };
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    await dispatch(addNote(notesOfCurrentUserId));
    console.log("Notes of currentUser", getState().notes);
  };
};

export const asyncDeleteNote = id => {
  return async (dispatch, getState) => {
    console.log('asyncDeleteNote');
    const currentUser = getState().currentUser;
    let notes = await AsyncStorage.getItem('notes');
    notes = notes ? JSON.parse(notes) : [];
    const notesOfCurrentUserId = notes[currentUser.userId]
      ? notes[currentUser.userId]
      : [];
    const updatedNotes = notesOfCurrentUserId.filter(note => note.id !== id)
    const newNotes = {
      ...notes,
      [currentUser.userId]: updatedNotes,
    };
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    dispatch(deleteNote(updatedNotes));
    console.log("notes of currentUser ", getState().notes);
  };
};

export const asyncEditNote = (id, title, content) => {
  return async (dispatch, getState) => {
    console.log('asyncEditNote');
    const currentUser = getState().currentUser;
    let notes = await AsyncStorage.getItem('notes');
    notes = notes ? JSON.parse(notes) : [];
    const notesOfCurrentUserId = notes[currentUser.userId]
      ? notes[currentUser.userId]
      : [];
    const updatedNotes = notesOfCurrentUserId.map(note =>
      note.id === id ? { id, title, content } : note);
    const newNotes = {
      ...notes,
      [currentUser.userId]: updatedNotes,
    };
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    dispatch(editNote(updatedNotes));
    console.log("notes of currentUser", getState().notes);
  };
};
