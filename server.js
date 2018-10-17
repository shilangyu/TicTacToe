const express = require('express')
const fs = require('fs')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)


// my variables
let IPlist = []


// public folder for client side
app.use("/client", express.static(__dirname + "/client"))
app.use("/libs", express.static(__dirname + "/libs"))


// handling http requests
app.get('/tictactoe', (req, res) => {
    IPlist.push(req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null)
    )
    res.sendFile(__dirname + '/client/index.html')
})



// sockets server side
io.on('connection', client => {

    let AI = new (require('./AI/brain.js'))()

    // AI makes a move
    client.on('makeMove', data => {
        let [x, y] = AI.makeMove(data.board)
        client.emit('moveMade', {x: x, y: y})

        console.log(`${client.id} made a move`)
    })

    // end game, save score, teach AI
    client.on('gameover', data => {
        let learned = AI.end(data.name)
        
        let obj = JSON.parse(fs.readFileSync('./AI/stats.json', 'utf8'))
        obj[data.name]++
        obj[learned]++
        let sum = obj['wins'] + obj['losses'] + obj['draws']
        obj["win%"] = obj['wins'] / sum * 100
        obj["loss%"] = obj['losses'] / sum * 100
        obj["draw%"] = obj['draws'] / sum * 100
        fs.writeFile('./AI/stats.json', JSON.stringify(obj, null, 4) , 'utf-8')


        client.emit('gameEnded', {"bitch": "lol"})

        console.log(`${client.id} finished a game`)
    })
    
    // client disconnected
    client.on('disconnect', () => {
        console.log(`${client.id} disconnected`)
    })

    // default
    console.log(`${client.id} connected`)
})


// start the server
let port = 159
server.listen(port, () => console.log(`server started on port ${port}`))