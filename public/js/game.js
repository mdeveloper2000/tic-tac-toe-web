const socket = io()
const startBtn = document.querySelector("#start")
const messages = document.querySelector(".messages")
let myIcon = null
let myTurn = null

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none"
    if(startBtn.innerHTML === "Reiniciar") {
        clearSquares()        
    }
    socket.emit("game-create")
})

function play(square) {
    if(myTurn !== null) {
        const element = document.querySelector(`#${square}`)    
        if(element.getAttribute("item-value") === "") {
            const image = document.createElement("img")
            image.src = "/images/" + myIcon + ".png"            
            element.appendChild(image)
            element.setAttribute("item-value", myIcon)            
            socket.emit("game-move", myIcon, square)
            myTurn = null
        }
    }
}

socket.on("game-init", player => {    
    if(myIcon === null) {
        myIcon = player
        const image = document.querySelector(".icon")
        if(myIcon === "x") {
            messages.innerHTML = "Aguardando início da partida..."            
        }
        else {
            messages.innerHTML = "A partida iniciou!"            
        }
        image.src = `/images/${myIcon}.png`
        image.style.display = "block"
    }
})

socket.on("game-start", turn => {    
    if(turn === myIcon) {
        myTurn = turn
        messages.innerHTML = "A partida iniciou!" + "<br />(Sua vez de jogar)"
    }
    else {
        messages.innerHTML = messages.innerHTML + "<br />(Aguardando jogada do adversário...)"
    }
})

socket.on("game-update", (player, move) => {
    if(myIcon !== player) {
        const element = document.querySelector(`#${move}`)
        element.setAttribute("item-value", player)
        const image = document.createElement("img")
        image.src = "/images/" + (player === "x" ? "x.png" : "o.png")
        element.appendChild(image)
        if(myTurn === null) {
            myTurn = myIcon
            messages.innerHTML = "(Sua vez de jogar)"
        }
    }
    else {
        messages.innerHTML = "(Aguardando jogada do adversário...)"
    }
    
    let icon = ""
    const a1 = document.querySelector("#a1").getAttribute("item-value")
    const a2 = document.querySelector("#a2").getAttribute("item-value")
    const a3 = document.querySelector("#a3").getAttribute("item-value")
    const b1 = document.querySelector("#b1").getAttribute("item-value")
    const b2 = document.querySelector("#b2").getAttribute("item-value")
    const b3 = document.querySelector("#b3").getAttribute("item-value")
    const c1 = document.querySelector("#c1").getAttribute("item-value")
    const c2 = document.querySelector("#c2").getAttribute("item-value")
    const c3 = document.querySelector("#c3").getAttribute("item-value")
    
    for(let i = 0; i < 2; i++) {
        if(i === 0) {
            icon = "x"
        }
        else {
            icon = "o"
        }
        if(a1 === icon && a2 === icon && a3 === icon || b1 === icon && b2 === icon && b3 === icon || 
            c1 === icon && c2 === icon && c3 === icon || a1 === icon && b1 === icon && c1 === icon ||
            a2 === icon && b2 === icon && c2 === icon || a3 === icon && b3 === icon && c3 === icon ||
            a1 === icon && b2 === icon && c3 === icon || a3 === icon && b2 === icon && c1 === icon) {            
            
            if(icon === myIcon) {
                messages.innerHTML = "Você ganhou!"
            }
            else {
                messages.innerHTML = "Você perdeu!"
            }
            myTurn = null
            startBtn.innerHTML = "Reiniciar"
            startBtn.style.display = "block"            
            socket.emit("game-restart")
            break
        }
        else {
            if(a1 !== "" && a2 !== "" & a3 !== "" && b1 !== "" && b2 !== "" && b3 !== "" && c1 !== "" && c2 !== "" && c3 !== "") {
                messages.innerHTML = "Vocês empataram!"
                startBtn.innerHTML = "Reiniciar"
                startBtn.style.display = "block"                
                socket.emit("game-restart")
                break
            }
        }
    }
})