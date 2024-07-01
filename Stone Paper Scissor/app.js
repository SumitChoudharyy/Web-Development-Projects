let userScore =0;
let compScore =0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () =>{
    const options = ["Rock","Paper","Scissor"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];

}

const showWinner = (userWin) => {
    if(userWin){
        console.log("You Win!");
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = "You Win !";
        msg.style.backgroundColor = "green";
    } else{
        console.log("Computer Win!");
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = "You loose !";
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) =>{
    console.log("User Choice = ", userChoice);
    // Generate computer Choice 
    const compChoice = genCompChoice();
    console.log("Computer Choice = ", compChoice);

    if(userChoice === compChoice)
        {
            console.log("Game is Draw");
            msg.innerText = "Game Draw";
            msg.style.backgroundColor = "Blue";
        }else {
            let userWin = true;
            if(userChoice === "Rock")
                {
                    // Scissor, Paper
                    userWin = compChoice ==="Paper" ? false : true;

                }
            if(userChoice === "Paper")
                {
                        // Scissor, Paper
                    userWin = compChoice ==="Scissor" ? false : true;
    
                }else{
                    // Rock, Paper
                    userWin = compChoice ==="Rock" ? false : true;
                }
                showWinner(userWin);
        }
}

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
