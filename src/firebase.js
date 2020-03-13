import {
  initializeApp
} from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyCaOxXWv93g-PDhgJoIYuuKVvJ70bxf2oE",
  authDomain: "crud-people.firebaseapp.com",
  databaseURL: "https://crud-people.firebaseio.com",
  projectId: "crud-people",
  storageBucket: "crud-people.appspot.com",
  messagingSenderId: "426717548264",
  appId: "1:426717548264:web:a435f6ff0704dcaf21435d",
  measurementId: "G-72L74P2ZVN"
});

export const db = app;
export const peopleRef = db.database().ref('people');