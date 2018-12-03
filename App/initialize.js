
// Initialize Firebase
const config = {
    apiKey: "AIzaSyAXJ0-jm0BcvRJlFMaDu80qzn8RAvHZT10",
    authDomain: "enterviewquestions.firebaseapp.com",
    databaseURL: "https://enterviewquestions.firebaseio.com",
    projectId: "enterviewquestions",
    storageBucket: "enterviewquestions.appspot.com",
    messagingSenderId: "964476697673"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
firestore.settings({
    timestampsInSnapshots:true
});

// Get the data from firebase 
const questionsRef = firestore.collection("Questions");
questionsRef.get().then((snapshot)=>{
    snapshot.forEach(doc => {
        console.log(`${doc.id}`);
    })
});

/*
questionsRef.doc("JavaScript").set({
    Level: "Basic",
    Questions:[
        "What is JavaScritp?",
        "What is the JavaScript Engine?",
        "Which are the most used JavaScript Engines (ie; IE,Chrome,FireFox)?",
        "What is the difference between interpeted code and compiled code?",
        "Is JavaScript Compiled or Interpreted?"
    ],
    Answers:[
        "JavaScript is a Scripting programing language that is most used for fornt end application development.",
		"The JavaScript Engine is the one that reads and interprete the JavaScript code.",
		"IE, Chrome uses V8, FireFox uses Geko.",
		"For the compilation proecces there is a machine code file generated which contains all the details (instruction) of the program from the original hight level language. For the interpretation proces the hight level instructions are translated on the fly so there is not addition file generation.",
		"JavaScript is an Interpreted language."
    ]
});*/
