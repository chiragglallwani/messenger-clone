import React, { useState, useEffect } from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState('');
  const[messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');  
  

  //useState is like a variable in react
  //useEffect is like code which run on passing specific condition

  useEffect(() => {
    db.collection('users')
    .orderBy('timestamp','desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
  },[])

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    //all the logic to send message goes here
    db.collection('users').add({
      message: input, 
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMessages(
      [...messages, {username: username, message: input}]
      );
    setInput('');
  }
  return (

    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"/>
      <h1>Facebook-Messenger-Clone</h1>
      <h2>Welcome to chat: {username}</h2>
      <form className="form__app">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter a message" value={input} onChange={event => setInput(event.target.value)}/>
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

     <FlipMove>
        {
        messages.map(({id, message}) =>( //here message variable should be similar to the variable we are appending at line: 38 "message: input
        <Message key={id} username={username} message={message} />
        ))
        }
     </FlipMove>
     
    </div>

    
  );
}

export default App;
