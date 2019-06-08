const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')  // importing axios - Axios is a promise-based HTTP client that works both in the browser and in a node.js environment. It basically provides a single API for dealing with XMLHttpRequest s and node's http interface. 
const ipc = electron.ipcRenderer    // Communicate asynchronously from a renderer process to the main process.

const notifyBtn = document.getElementById('notifyBtn')  // reference to notifyBtn in index.html
var price = document.querySelector('h1')    // reference to h1 in index.html
var targetPrice = document.getElementById('targetPrice')    // reference to targetPrice in index.html
var targetPriceVal

const notification = {
    title: 'BTC Alert', // title of notification that shows up
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD') // get the current USD bitcoin
        .then(res => {  // take the response 
            const cryptos = res.data.BTC.USD    // bind the response to cryptos
            price.innerHTML = '$'+cryptos.toLocaleString('en')  // The toLocaleString() method returns a string with a language-sensitive representation of this number.

            // if the target price is empty
            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                const myNotification = new window.Notification(notification.title, notification)    // pass in notification title and the notification itself
            }
        })
}

getBTC()    // call the function
setInterval(getBTC, 30000); // at an interval of 30 secs (30000 milliseconds)

notifyBtn.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'add.html') // find where the add.html file is
    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        alwaysOnTop: true, 
        width: 400, 
        height: 200
    })    // frame gets rid of the menu in add window
    win.on('close', function() { win = null})
    win.loadURL(modalPath)
    win.show()

})


ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})