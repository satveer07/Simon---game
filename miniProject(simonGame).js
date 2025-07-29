
let gameSeq =[];
let userSeq =[];
let btns = ["yellow","red","purple","green"];
let started = false;
let level = 1;
let h2 = document.querySelector('h2');
let body = document.querySelector("body");
let count = 0;
let time = document.createElement('p');
body.append(time);
let highestScore = 0;
let score = document.createElement('h3');
body.append(score);
const keySound = new Audio("bit-laser-151672.mp3.mp3");
const mouseClickSound = new Audio('mouse-click-290204.mp3.mp3');
const levelUpSound =  new Audio('game-bonus-02-294436.mp3.mp3')
const gameOverSound = new Audio('futuristic-shot-2-94413.mp3.mp3')

// let stylishbtn = document.createElement("button");
// stylishbtn.setAttribute('class', 'startgame');
// // stylishbtn.document.querySelector(stylishbtn);
// document.querySelector("body").insertAdjacentElement("beforeend", stylishbtn);
// stylishbtn.innerText = "Start Game";

// let btn = document.querySelector(".btn");

document.addEventListener('keypress',function(){
    keySound.play();
    if(started == false){
        console.log("game is started");
        
        started == true;
        time.innerHTML ="";
        levelUp();
    }
    
});

function levelUp(){
    userSeq = [];
    
    h2.innerText = `level ${level}`;
    

    let randIdx = Math.floor(Math.random() *4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout( function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    mouseClickSound.play();
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },400);
}
function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            
            level++;
            
            count++;
            setTimeout(levelUp, 1000);
            levelUpSound.play();
        }
    }else{
        mouseClickSound.pause();
        gameOverSound.play();
        h2.innerHTML = `Game Over. Your score was <b>${level}</b><br>Press any key to start`;
        document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },250);
        times(count);
        reset();
        
    }
}

function btnPress(){
    console.log("btn was pressed");
    console.log(this);
    let btn = this;
    userFlash(btn);

   let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}  
    let allBtns = document.querySelectorAll(".btn");
    for(btn of allBtns){
        btn.addEventListener("click", btnPress);
    }
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    count = 0;
}
// homework
function times(count){
    time.innerHTML =`<b>User complete round ${count} times!<br> I hope you gave best!</b>`;
    finalScore(count);
}
function finalScore(count){
    if(count > highestScore){
        highestScore = count; 
        score.innerHTML = `Higest Score = ${highestScore}`;
    }
    
}


