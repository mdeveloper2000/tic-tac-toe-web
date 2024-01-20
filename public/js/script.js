function removeBorders(element, borders) {
    borders.forEach(b => {
        switch(b) {
            case "borderTop":
                element.style.borderTop = "none"
            break
            case "borderBottom":
                element.style.borderBottom = "none"
            break
            case "borderRight":
                element.style.borderRight = "none"
            break
            case "borderLeft":
                element.style.borderLeft = "none"
            break
        }        
    })
}

function clearSquares() {
    const messages = document.querySelector(".messages")
    messages.innerHTML = ""
    const divs = document.querySelectorAll(".board > div")
    divs.forEach((div) => {
        div.innerHTML = ""
        div.setAttribute("item-value", "")
    })
}

window.onload = () => {
    removeBorders(document.querySelector("#a1"), ["borderLeft", "borderTop"])
    removeBorders(document.querySelector("#a2"), ["borderLeft", "borderTop", "borderRight"])
    removeBorders(document.querySelector("#a3"), ["borderTop", "borderRight"])
    removeBorders(document.querySelector("#b1"), ["borderTop", "borderLeft"])
    removeBorders(document.querySelector("#b2"), ["borderTop", "borderLeft"])
    removeBorders(document.querySelector("#b3"), ["borderTop", "borderLeft", "borderRight"])
    removeBorders(document.querySelector("#c1"), ["borderTop", "borderLeft", "borderRight", "borderBottom"])
    removeBorders(document.querySelector("#c2"), ["borderTop", "borderBottom", "borderRight"])
    removeBorders(document.querySelector("#c3"), ["borderTop", "borderBottom", "borderRight"])
}