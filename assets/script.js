const note = require("../models/note");

console.log("script works")

localStorage.setItem('jwt', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzI4NGU3NjUyNjI4MzU0OTNmNGUzYWIiLCJlbWFpbCI6Imhhbm5hQGdtYWlsLmZpIiwiaWF0IjoxNjYzNTg5MTk3fQ.H4eXLE-RDFoRYywChs8_Wgk77i6nT4gm4vJs_J8beu0")

const API_URL = 'https://firstappwom.azurewebsites.net';

document.querySelector.apply('#btn-login').addEventListener('click', (e) => {
    login();
})


function showLogIn() {
    document.querySelector('#login').style.display = 'block';
}

async function getNotes() {
    const resp = await fetch(API_URL + '/notes', {
        //ett objekt med config
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
    });
    if (resp.status > 201) {
        console.log(error);
        return showLogIn();
    }
};

const notes = await resp.json();
console.log(notes);
let notesHTML = "";

for (const note of notes) {
    notesHTML += `<div class= "note">${note.text}</div>`;
    document.querySelector('#notes').innerHTML = notesHTML;
};

async function login() {
    const resp = await fetch(API_URL + '/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
        }) 
    });
    const respJson = await resp.json();
    console.log(respJson);
    if (resp.status > 201) return alert(respJson.msg);

    localStorage.setItem('jwt', respJson.token);
    
    getNotes();
}

getNotes();