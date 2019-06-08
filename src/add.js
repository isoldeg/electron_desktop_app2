const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer    // Communicate asynchronously from a renderer process to the main process.

const closeBtn = document.getElementById('closeBtn')    // reference to closeBtn in add.html


closeBtn.addEventListener('click', function(event){
    var window = remote.getCurrentWindow(); // gets the current window that the link is currently on
    window.close()
    //const p = document.createElement('p');
    //const itemText = document.createTextNode("hi");
    //p.appendChild(itemText);
    //closeBtn.appendChild(p);
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function(){
    ipc.send('update-notify-value', document.getElementById('notifyVal').value) // sends to index.html (name, value)

    // close window after submission
    var window = remote.getCurrentWindow();
    window.close()
})