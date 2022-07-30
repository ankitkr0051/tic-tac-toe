console.log("Welcome to Tic Tac Toe");
let pturn = document.getElementById("playerturn");
let reset = document.getElementById("reset");
let boxes = document.getElementsByClassName("box");
let X =  document.getElementById("pxs");
let O =  document.getElementById("pos");
console.log(X)
let playerWin =""
let Xscore = 0;
let Oscore = 0;
let count = 0;
let turn = "X";
let gameover = false;
let music_win = new Audio("win.mp3")
let audioTurn = new Audio("turn.mp3")
let tie_music = new Audio("tie.mp3")
let background_music=  new Audio("background_music.mp3")

//background_music.play()
// console.log(boxes)--- html collection convert it in arrray
boxes = Array.from(boxes); // changed in array

// Function to change the turn ----------------------------------------------------------------------
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};


// Game Logic ---------------------------------------------------------------------------------------------
boxes.forEach(function (value, index) {
  // console.log(`${value.innerHTML} ${index}`);
  boxes[index].addEventListener("click", (event)=>{
    audioTurn.play()
    if(gameover){
      event.preventDefault()

    }else{
        f1(event,value)
    }
  });
})

//Game function--------------------------------------------------------------------------------------------
function f1(event,value) {
  if (value.innerHTML == "") {
    // alert("hello is clicked");//console.log(event);
    event.target.innerHTML = turn;

    count++;
    Checkwin();
    turn = changeTurn();
    // pturn.innerHTML= `Player ${turn}'s move`
    if (!gameover) {
      pturn.innerHTML = `Player ${turn}'s move`;

      if (count == 9) {
        pturn.innerHTML = `Tie`;
        tie_music.play();
        setTimeout(() => {
          pturn.innerText = `GAMEOVER!!`;
        }, 800);

        setTimeout(() => {
          clear();
        }, 1200);
      }
    }
  }
}

// Add onclick listener to reset button-----------------------------------------------------------------
function clear() {
  boxes.forEach((value) => {
    value.innerHTML = "";
    value.classList.remove("winstyle")
  });
  turn = "X";
  pturn.style.fontWeight= "normal"
  if(gameover){
    setTimeout(() => {
      pturn.innerHTML = `Start with Player X's move`;
    }, 400);
  }else{pturn.innerHTML = `Start with Player X's move`;}
  // pturn.innerHTML = `Start with Player X's move`;
  gameover = false;
  count = 0;
}
reset.addEventListener("click", clear);

// array to check win -------------------------------------------------------------------------------------
let wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check for a win-------------------------------------------------------------------------------
function Checkwin() {
  let check = document.getElementsByClassName("box");
  // console.log(check)
  wins.forEach((e) => {
    // console.log(check[e[0]])
    if (
      check[e[0]].innerText === check[e[1]].innerText &&
      check[e[2]].innerText === check[e[1]].innerText &&
      check[e[0]].innerText !== ""
    ) {

      pturn.style.fontWeight= "900"
      document.querySelector("#playerturn").innerText =
        pturn.innerText = ` Player ${turn} "Won"`;
        playerWin = turn
        // console.log(playerWin)
         gameover = true;
         music_win.play()
  
      // final won display --- win style declared in css
      check[e[0]].classList.add('winstyle');
      check[e[1]].classList.add('winstyle');
      check[e[2]].classList.add('winstyle');


      // score update
      if(playerWin=='X'){
        Xscore++;
        sessionStorage.setItem('pxs',Xscore)
        let data= sessionStorage.getItem('pxs')
        X.innerHTML=data
      }
      if(playerWin=='O'){
        Oscore++;
        sessionStorage.setItem('pos', Oscore)
        let data= sessionStorage.getItem('pos')
        O.innerHTML=data
      }
    

      setTimeout(() => {
        pturn.style.fontWeight= "normal"
        pturn.innerText = `GAMEOVER!!`;
      }, 800);

      setTimeout(() => {
        clear();
        //background_music.play()
      }, 1300);
    }
  });
}







