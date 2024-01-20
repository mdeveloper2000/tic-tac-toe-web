const express = require("express")
const path = require("path")
const http = require("http")
const socketIO = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

server.listen(3000)

app.use(express.static(path.join(__dirname, "public")))

let player1 = null
let player2 = null
let turn = null

io.on("connection", client => {
    client.on("game-create", () => {
        if(player1 === null) {
            player1 = "x"
            client.emit("game-init", player1)
        }
        else if(player2 === null) {
            player2 = "o"
            client.emit("game-init", player2)
            turn = player1
            io.emit("game-start", turn)
        }
    })
    client.on("game-move", (player, move) => {        
        io.emit("game-update", player, move)
    })
    client.on("game-restart", () => {
        player1 = player2 = turn = null
    })    
})