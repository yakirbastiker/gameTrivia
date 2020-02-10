let dataControl = (function (){
    return {
    //array of questions
     questionArr: [
        {
            q: '2 + 2',
            a: '4',
            op: ['3','5','6', '4']
        },
    
        {
            q: '5 + 2',
            a: '7',
            op: ['3','5','6', '7']
        },
        {
            q: '5 + 4',
            a: '9',
            op: ['3','5','6','9']
        },
        {
            q: '15 + 4',
            a: '19',
            op: ['3','5','6','19']
        },
        {
            q: '5 + 24',
            a: '29',
            op: ['3','5','6', '29']
        }
    ],

    //shuffle array 
    shuffle:  function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    },

    //checkAnswer

    checkAnswer: function (correctAnswer,playerOption){
        return correctAnswer === playerOption;
    }

}
})();


let  uiControl = (function (){
    
    return {
    //DOM
    theQuestion: document.querySelector('#the-question'),

    //showQuestion //array after shuffle

    showQuestion: function (questionSTR, optionArr) {
        this.theQuestion.innerHTML = questionSTR;

        for(let i = 0; i < optionArr.length; i++) {
            let box = document.querySelector(`#answer-${i + 1}`);
            box.innerHTML = optionArr[i];
            box.parentElement.style.display = 'flex';
        }
    },

    //removeBox
    removeBox: function(box) {
        box.style.display = 'none';
    },

    //show all box
    showAllBox: function(len){
        for(let i = 0; i < len; i++) {
            let box = document.querySelector(`#answer-${i + 1}`);
            box.parentElement.style.display = 'flex';
        }
    },

    gameOver: function(score, len){
        for(let i = 0; i < len; i++) {
            let box = document.querySelector(`#answer-${i + 1}`);
            box.parentElement.style.display = 'none';
        }

        this.theQuestion.innerHTML = `game over!!!!!! erors: ${score}`;

    }
}
})();



let Controller = (function (UI, DATA) {
    let indexQuestion = 0;
    let scoreError = 0;
    let isGameOver = false;
    //shuffle array of questions
    let newArrQuestion = DATA.shuffle(DATA.questionArr);


    //game //index newArrQuestion //newArrQuestion[index]
    let game = function(questionObj) {
       
        //shuffle options
        let newArray = DATA.shuffle(questionObj.op)

        if(!isGameOver) {

            //show all box
            UI.showAllBox(questionObj.op.length);
            //show question and option
            UI.showQuestion(questionObj.q, newArray);
        }else {
            UI.gameOver(scoreError, questionObj.op.length);
        }

    }
    game(newArrQuestion[indexQuestion]);

    //add event // edit 4
    for(let i = 0; i < 4; i++) {
        let box = document.querySelector(`#answer-${i + 1}`);
        box.parentElement.addEventListener('click', (e) => {
            let userAnswer;
            let elementBox;
            //get value from box
            if(e.target.matches("h3")){
            userAnswer = event.target.innerHTML;
            elementBox = event.target.parentElement;
            } else {
            userAnswer = event.target.children[0].innerHTML;
            elementBox = event.target;
            }
            //check answer
            let check = DATA.checkAnswer(newArrQuestion[indexQuestion].a, userAnswer);
            if(check) {
                //check if game over
                if(indexQuestion >= newArrQuestion.length -1 ) {
                    isGameOver = true;
                    UI.gameOver(scoreError);
                }else {
                    //next q
                    indexQuestion++;
                    game(newArrQuestion[indexQuestion]);
                }

                
            }else {
                scoreError++;
                //remove box;
                UI.removeBox(elementBox);
            }
        });
    }

})(uiControl, dataControl);