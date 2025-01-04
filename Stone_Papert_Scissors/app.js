let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const message = document.querySelector("#message");
const reset = document.querySelector("#reset");

const userScoreParagraph = document.querySelector("#user-score");
const computerScoreParagraph = document.querySelector("#computer-score");
constGenerateComputerChoice = () => {
    
    const options = ["rock", "paper", "scissors"];
    const ranIndex = Math.floor(Math.random() * 3);
    return options[ranIndex];

}

const drawGame = () => {
    
    message.innerText = "Draw";
    message.style.backgroundColor = "#30323d";
}

const showWinner = (userWin, userChoice, computerChoice) => {
    if(userWin){
        userScore++;
        
        message.innerText = `You win! your ${userChoice} beats ${computerChoice}`;
        message.style.backgroundColor = "green";
        userScoreParagraph.innerHTML = userScore;
    }else{
        computerScore++;
        
        message.innerText = `You lose.. ${computerChoice} beats your ${userChoice}`;
        message.style.backgroundColor = "red";
        computerScoreParagraph.innerHTML = computerScore;
    }
}

const playGame = (userChoice) => {
    
    //Generate computer choice
    const computerChoice = constGenerateComputerChoice();
    
    if(userChoice === computerChoice){
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = computerChoice === "scissors"? true : false;
        }else if(userChoice === "paper"){
            userWin = computerChoice === "rock"? true : false;
        }else if(userChoice === "scissors"){            
            userWin = computerChoice === "paper"? true : false;            
        }

        showWinner(userWin, userChoice, computerChoice);
    }    
    
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        
        playGame(userChoice)
    });
});

reset.addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    userScoreParagraph.innerHTML = userScore;
    computerScoreParagraph.innerHTML = computerScore;
});