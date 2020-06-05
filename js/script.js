// script.js
// Weekly Assignment No. 6

// a class, or blueprint, for building a Playing Card object
class PlayingCard {
    // constructs a card
    constructor(element, face, suit) {
        // set needed properties
        this.element = element
        this.face = face
        this.suit = suit
        this.img = `img/${face}_of_${suit}.png`
        this.state = 0

        // adds an event listener to the card's element (img)
        // controls card state: "show back of card" or "show card face"
        this.element.addEventListener('click', () => {
            if (this.state == 0) {
                // calls method of card class
                this.showFaces()
                this.state = 1
            } else {
                this.showBacks()
                this.state = 0
            }
        })
    }

    // methods
    showFaces() {
        this.element.src = this.img
    }

    showBacks() {
        this.element.src = 'img/back.png'
    }
}

// creates an image element and assigns a source path to it
function createCardImage() {
    const img = document.createElement('img')
    img.src = 'img/back.png'
    return img
}

// iterates through an array (deck) of objects 
// accesses the image element of the object via object's property
// appends that element to the container div
function displayDeck() {
    deck.forEach(card => {
        container.appendChild(card.element)
    })
}

// shuffles deck
// sorts the deck according to specified function within parameter
// uses the random method from the math library 
function shuffleDeck() {
    for (let i = 0; i < 1000; i++) {
        deck.sort(() => Math.random() - 0.5)
    }
}

// removes card
// selects the image tag (1st instance)
// removes card with remove method
function removeCard() {
    if (deck.length != 0) {
        card = document.querySelector('img')
        card.remove()
        // shift method shifts the array positioning (so there won't be empty array elements)
        deck.shift()
        // doesn't allow a delete when no more elements are in the deck array
        if (deck.length == 0) {
            actions.innerHTML = 'No cards left in the deck. :-('
        }
    }
}

// builds deck using suits and faces arrays and nesting
function buildDeck() {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs']
    const faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

    // for each suit add a face
    // for each face create an image element with specificied id and push that card onto the deck array
    suits.forEach(suit => {
        faces.forEach(face => {
            image = createCardImage()
            image.id = `${face}_of_${suit}.png`
            deck.push(new PlayingCard(image, face, suit))
        })
    })
}

// clears HTML
function clearActions() {
    actions.innerHTML = ''
}

// the array container for the cards
let deck = []

// handles for div that will contain card and the buttons for actions
const container = document.querySelector('#container')
const actions = document.querySelector('#actions')
const shuffleBtn = document.querySelector('#shuffle')
const removeBtn = document.querySelector('#remove')
const newDeckBtn = document.querySelector('#newdeck')
const showFacesBtn = document.querySelector('#showfaces')
const showBacksBtn = document.querySelector('#showbacks')

// event listeners for buttons that provide actions

// click to shuffle cards
shuffleBtn.addEventListener('click', () => {
    actions.innerHTML = 'The deck of cards has been shuffled.'
    container.innerHTML = ''
    shuffleDeck()
    // allows delay in displaying cards
    setTimeout(displayDeck, 500)
    // clears presented message
    setTimeout(clearActions, 5000)
})

// click to remove a card
removeBtn.addEventListener('click', () => {
    actions.innerHTML = 'A card was removed.'
    removeCard()
    setTimeout(clearActions, 5000)
})

// click to create a new deck
newDeckBtn.addEventListener('click', () => {
    actions.innerHTML = 'A new deck of cards has been created.'
    deck = []
    container.innerHTML = ''
    buildDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

// click to show all card faces
showFacesBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card faces are now showing.'
    deck.forEach(card => {
        // uses object's method
        card.showFaces()
    })
})

// click to show all backs of cards
showBacksBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card backs are now showing.'
    deck.forEach(card => {
        card.showBacks()
    })
})

// function calls
buildDeck()
shuffleDeck()
displayDeck()