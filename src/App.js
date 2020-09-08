import React, { useState, useEffect } from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

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
      [...messages, {username: username, text: input}]
      );
    setInput('');
  }
  return (

    <div className="App">
      <img />
      <h1>Messenger-clone</h1>
      <h2>Welcome to chat: {username}</h2>
      <form>
        <FormControl>
          <InputLabel >Enter text here....</InputLabel>
          <Input  value={input} onChange={event => setInput(event.target.value)}/>
          <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>Send Message</Button>
        </FormControl>
      </form>

     <FlipMove>
        {
        messages.map(({id, message}) =>(
        <Message key={id} username={username} message={message} />
        ))
        }
     </FlipMove>
     
    </div>

    
  );
}

export default App;
