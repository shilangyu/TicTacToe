const ENV = {
    width: 3,
    height: 3,
    scale: 200,
    auto: false,
    draw: {
        msg: 'DRAW',
        name: 'draws'
    },
    win: {
        msg: 'PLAYER WON',
        name: 'losses'
    },
    loss: {
        msg: 'AI WON',
        name: 'wins'
    }
}
let tiles = Array(ENV.width).fill(Array(ENV.height).fill(null)).map(e => e.map(e => null))
let game = {
    over: false,
    endMsg: null,
    playerSign: 'X',
    AISign: 'O',
    pause: false
}
let clientSocket

// p5 shit
function setup() {
    createCanvas(ENV.width * ENV.scale, ENV.height * ENV.scale)
    pixelDensity(1)

    // create tiles
    for ([x, y] of tiles.all2D('index')) {
        tiles[x][y] = new Tile(createVector(x * ENV.scale, y * ENV.scale),
                               createVector(ENV.scale, ENV.scale))
    }

    // sockets
    clientSocket = io.connect('http://127.0.0.1:159')
    clientSocket.on('moveMade', (data) => {
        tiles[data.x][data.y].type = game.AISign
        checkGame()
        game.pause = false
        redraw(1)

        if(ENV.auto && !game.over) botMakeMove()
    })
    clientSocket.on('gameEnded', (data) => {
        if(ENV.auto) window.location.reload(false)
    })
    if(ENV.auto) botMakeMove()
    noLoop()
}

function draw() {
    background(151)

    // board
    strokeWeight(15)
    stroke(255)
    for (let i = 0; i < ENV.width * ENV.scale; i += ENV.scale)
        line(i, 0, i, ENV.height * ENV.scale)
    for (let i = 0; i < ENV.height * ENV.scale; i += ENV.scale)
        line(0, i, ENV.width * ENV.scale, i)

    // vals
    for (ele of tiles.all2D('value')) {
        ele.draw()
    }

    // win lost
    if(game.over) {
        let endType
        if(game.endMsg == ENV.win.msg)
            endType = ENV.win.name
        else if(game.endMsg == ENV.loss.msg)
            endType = ENV.loss.name
        else if(game.endMsg == ENV.draw.msg)
            endType = ENV.draw.name
        clientSocket.emit('gameover', {
            name: endType
        })

        textAlign(CENTER, CENTER)
        strokeWeight(2)
        stroke(255)
        textSize(64)
        text(game.endMsg, ENV.width * ENV.scale / 2, ENV.height * ENV.scale / 2)
    }

    // waiting for AI to make a move
    if(game.pause) {
        textAlign(CENTER, CENTER)
        strokeWeight(2)
        stroke(255)
        textSize(64)
        text("WAIT FOR AI", ENV.width * ENV.scale / 2, ENV.height * ENV.scale / 2)
    }
}


// functions
function checkGame() {
    // horizontal
    for(let i = 0; i < tiles.length; i++) {
        if(tiles[i].every((e) => e.type == game.playerSign)) {
            game.endMsg = ENV.win.msg
            game.over = true
            return true
        }
        if(tiles[i].every((e) => e.type == game.AISign)) {
            game.endMsg = ENV.loss.msg
            game.over = true
            return true
        }
    }
    // vertical
    for(let i = 0; i < tiles.length; i++) {
        if(tiles.every((e) => e[i].type == game.playerSign)) {
            game.endMsg = ENV.win.msg
            game.over = true
            return true
        }
        if(tiles.every((e) => e[i].type == game.AISign)) {
            game.endMsg = ENV.loss.msg
            game.over = true
            return true
        }
    }
    // diagonal
    let current = null
    for(let i = 0; i < tiles.length; i++) {
        if(i == 0) {
            current = tiles[i][i].type
        } else if(current != tiles[i][i].type) {
            current = null
            break
        }
    }
    game.endMsg = current == game.playerSign ? ENV.win.msg : current == game.AISign ? ENV.loss.msg : null
    game.over = (game.endMsg != null)
    if(game.over) return true
    
    current = null
    for(let i = 0, j = tiles.length-1; i < tiles.length; i++, j--) {
        if(i == 0) {
            current = tiles[i][j].type
        } else if(current != tiles[i][j].type) {
            current = null
            break
        }
    }
    game.endMsg = current == game.playerSign ? ENV.win.msg : current == game.AISign ? ENV.loss.msg : null
    game.over = (game.endMsg != null)
    if(game.over) return true

    // check if the board is full
    if(tiles.every((e) => e.every( e => e.type != null))) {
        game.endMsg = ENV.draw.msg
        game.over = true
        return true
    }

    return false
}

function botMakeMove() {
    let possibleMoves = []
    tiles.forEach((e, i) => {
        e.forEach((e, j) => {
            if (e.type == null) possibleMoves.push({
                x: i,
                y: j
            })
        })
    })
    
    let choice = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    tiles[choice.x][choice.y].type = game.playerSign

    let stopGame = checkGame()
    if (!stopGame) {
        let board = tiles.map(e =>
            e.map(e => e.type == game.AISign ? 1 : e.type == game.playerSign ? 0 : null)
        )

        clientSocket.emit('makeMove', {
            board: board
        })

        game.pause = true
    }
    redraw(1)
}


// events
document.addEventListener('click', (e) => {
    for ([x, y] of tiles.all2D('index')) {
        if (tiles[x][y].wasClicked(createVector(mouseX, mouseY)) && !tiles[x][y].type && !game.over && !game.pause) {
            tiles[x][y].type = game.playerSign
            let stopGame = checkGame()
            if(!stopGame) {
                let board = tiles.map( e => 
                    e.map( e => e.type == game.AISign ? 1 : e.type == game.playerSign ? 0 : null)
                )
                
                clientSocket.emit('makeMove', {
                    board: board
                })
                
                game.pause = true
            }
            redraw(1)
            return
        }
    }
})