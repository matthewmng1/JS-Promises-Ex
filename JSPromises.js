
// let url = "http://numbersapi.com/random/trivia";
// axios.get(url)
//   .then(res => {
//     console.log("FIRST NUMBER FACTS REQUEST")
//     return console.log(res.data)
//   })
//   // .catch(err => console.log("REJECTED!!", err))

// let multiurl = "http://numbersapi.com/1,5,8,9/trivia";
//   axios.get(multiurl)
//     .then(res => {
//       console.log("SECOND NUMBER FACTS REQUEST")
//       return console.log(res.data)
//     })
//     // .catch(err => console.log("REJECTED!!", err))


// let faveurl = "http://numbersapi.com/1/trivia"
// numFacts = []
// for(i=1 ; i<5 ; i++){
//   numFacts.push(
//     axios.get(faveurl)
//   );
// }
// Promise.all(numFacts)
//   .then(numFactsArr => {
//     console.log("THIRD NUMBER FACTS REQUEST")
//     for (res of numFactsArr){
//       console.log(res.data)
//     }
//   })
//   .catch(err => console.log("REJECTED!!", err))

let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
axios.get(url)
  .then(res=>{
    console.log(res.data)
    console.log("DECK HAS BEEN SHUFFLED")
    deck_id = res.data.deck_id
    return deck_id
  })
  .then(res=>{
  let draw = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    axios.get(draw)
      .then(res=>{
        console.log(res.data)
        value = res.data.cards[0].value
        suit = res.data.cards[0].suit
        console.log(`YOU DREW A ${value} OF ${suit}`)
        return axios.get(draw)
      })
      .then(res=>{
        value = res.data.cards[0].value
        suit = res.data.cards[0].suit
        console.log(`YOU DREW A ${value} OF ${suit}`)
      })
  })
  .catch(err => console.log("REJECTED!!", err))

$(function(){
  let url = 'https://deckofcardsapi.com/api/deck';
    axios.get(`${url}/new/draw`)
      .then(res=>{
        value = res.data.cards[0].value
        suit = res.data.cards[0].suit
        console.log(`YOU DREW A ${value} OF ${suit}`)
})

  let firstCard = null;
  axios.get(`${url}/new/draw`)
    .then(res=>{
      firstCard = res.data.cards[0]
      let deckId = res.data.deck_id;
      return axios.get(`${url}/${deckId}/draw/`)
    })
    .then(res=>{
      let secondCard = res.data.cards[0]
      [firstCard, secondCard].forEach(function(card){
        console.log(
          `YOU DREW A ${card.value} OF ${card.suit}`
        )
      })
    })

  let deckId = null;
  let $btn = $('button');
  let cardArea = document.getElementById('card-area')

  axios.get(`${url}/new/shuffle/`)
    .then(res=>{
      deckId = res.data.deck_id;
      $btn.show()
    })

  $btn.on('click', function(){
    axios.get(`${url}/${deckId}/draw/`)
      .then(res=> {
        let cardSrc = res.data.cards[0].image;
        let img = document.createElement('img')
        img.src = cardSrc
        cardArea.appendChild(img)
      })
  })
})