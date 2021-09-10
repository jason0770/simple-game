var current = 1;
var timeCountInterval;
var numbers = [];


function init(restartBtn, grid, items) {

    restartBtn.disabled = false;
    grid.style.display = "grid";
    
    while(numbers.length < items.length) {
        let randomNum = Math.round(Math.random() * (items.length - 1)) + 1;
        let found = false;
        if (numbers.length == 0) {
            numbers.push(randomNum);
        }
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] == randomNum) {
                found = true;
                break;
            }
        }
        if (!found) {
            numbers.push(randomNum);
        }
    }

    for (let i = 0; i < numbers.length; i++) {
        items[i].innerHTML = numbers[i];
    }
}

function reset() {
    numbers = [];
    current  = 1;
    clearInterval(timeCountInterval);
}

function changeColorToBlack(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].style.color = "black";
    }
}

function timeCount(time, backBtn) {
    backBtn.disabled = true; 
    timeCountInterval = setInterval(
        () => {
            time.innerHTML--;
            if (time.innerHTML <= 0) {
                let callback = function() {
                    backBtn.disabled = false;
                    alert("Stop! You did not complete this challenge in the allocated time!");
                    clearInterval(timeCountInterval);
                }
                setTimeout(callback, 100);
            }
        }, 1000 
    )
}

function addEventListenerToBlock(items, time, score, backBtn) {
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", () => {

            if (numbers.length == items.length && numbers[i] == 1) {
                timeCount(time, backBtn);
                numbers.pop();
            }

            if (time.innerHTML > 0) {
                if (items[i].innerHTML == current) {
                    items[i].style.color = "transparent";
                    current++;    
                }
                if (current-1 == items.length) {
                    let callback = function() {
                        
                        alert("You completed the challenge! Well Done!");
                        clearInterval(timeCountInterval);
                        backBtn.disabled = false;
                        current = 1;
                        if (score.innerHTML < time.innerHTML) {
                            score.innerHTML = time.innerHTML;
                        }
                    };
                    setTimeout(callback, 100);
                }
            }
        });
    }
}

function addEventListenerToStartButton(startBtn, restartBtn, grid, items, score, backBtn, time, timeVal) {
    startBtn.addEventListener("click", () => {
        init(restartBtn, grid, items);
        addEventListenerToBlock(items, time, score, backBtn);
        startBtn.disabled = true;
        time.innerHTML = timeVal;
    });
}


function addEventListenerToRestartButton(restartBtn, grid, items, backBtn, time, timeVal) {
    restartBtn.addEventListener("click", () => {
        reset();
        init(restartBtn, grid, items);
        changeColorToBlack(items);
        backBtn.disabled = false;
        time.innerHTML = timeVal;
    })
}

function showDialog() {
    // $( function() {
        $( "#dialog-confirm").dialog({
            rezsable: false,
            height: 400,
            modal: true,
            buttons: {
                "Delete all items": function(){
                    $(this).dialog("close");
                },
                Cancel: function() {
                    $(this).dialog("close");
                }
            }
        })
    // })
}

// function showDialog() {
//     let body = document.getElementsByTagName("body");
//     let dialogBox = document.createElement("div");
//     dialogBox.style.position = "absolute";
//     // dialogBox.style.width = "8rem";
//     dialogBox.style.height = "4rem";
//     dialogBox.style.backgroundColor = "white";
//     dialogBox.style.textAlign = "center";
//     dialogBox.style.display = "flex";
//     dialogBox.style.flexDirection = "column";
//     dialogBox.style.justifyContent = "center";
    
//     let dialogBoxText = document.createTextNode("Hi ........00000000.............");
//     dialogBox.appendChild(dialogBoxText);

//     let buttonContainer = document.createElement("div");
//     buttonContainer.style.width = "100%";
//     // buttonContainer.style.height = "50%";
//     buttonContainer.style.backgroundColor = "yellow";
//     dialogBox.appendChild(buttonContainer);

//     let okButton = document.createElement("button");
//     okButton.textContent = "OK";
//     buttonContainer.appendChild(okButton);

//     let cancelButton = document.createElement("button");
//     cancelButton.textContent = "Cancel";
//     buttonContainer.appendChild(cancelButton);

//     cancelButton.addEventListener("click", () => {
//         document.body.removeChild(dialogBox);
//     });

//     buttonContainer.style.display = "flex";
//     buttonContainer.style.justifyContent = "space-around";
//     buttonContainer.style.alignItems = "flex-end";

//     document.body.appendChild(dialogBox);

// }


export {addEventListenerToStartButton, addEventListenerToRestartButton, showDialog};