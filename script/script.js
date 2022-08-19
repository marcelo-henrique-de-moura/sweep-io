/*

Code by marcelo-moura-mhm

*/


window.table_colums = null
var death, firstClick = false

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var bombrows = new Array()
var bombcolumns = new Array()


var randomNumberRow, randomNumberColumn


while(bombrows.length < 10){
    randomNumberRow = getRandomInt(0, 7)
    randomNumberColumn = getRandomInt(0, 7)

    if(bombrows.indexOf(randomNumberRow) === -1 || bombcolumns.indexOf(randomNumberColumn) === -1){
        bombrows.push(randomNumberRow)
        bombcolumns.push(randomNumberColumn)
        continue
    }

    var count = 0

    for(let i = 0; i<bombrows.length; i++){
        if(bombrows[i] == randomNumberRow && bombcolumns[i] == randomNumberColumn){
            count++
        }
    }
    if(count==0){
        bombrows.push(randomNumberRow)
        bombcolumns.push(randomNumberColumn)
    }
}

var bomba = [bombrows[0], bombcolumns[0]]
var bombb = [bombrows[1], bombcolumns[1]]
var bombc = [bombrows[2], bombcolumns[2]]
var bombd = [bombrows[3], bombcolumns[3]]
var bombe = [bombrows[4], bombcolumns[4]]
var bombf = [bombrows[5], bombcolumns[5]]
var bombg = [bombrows[6], bombcolumns[6]]
var bombh = [bombrows[7], bombcolumns[7]]
var bombi = [bombrows[8], bombcolumns[8]]
var bombj = [bombrows[9], bombcolumns[9]]


var bombs = [bomba, bombb, bombc, bombd, bombe, bombf, bombg, bombh, bombi, bombj]


var table = new Array(8)


table[0] = new Array(8)
table[1] = new Array(8)
table[2] = new Array(8)
table[3] = new Array(8)
table[4] = new Array(8)
table[5] = new Array(8)
table[6] = new Array(8)
table[7] = new Array(8)



function createTable(colums){
    for(let x=0; x<64; x++){
        table[Math.floor(x/8)][Math.floor(x%8)] = colums[x]
    }
}

function placeBombs(table){
    for(let row=0; row<8; row++){
        for(let column=0; column<8; column++){
            for(let bomb in bombs){
                if(row == bombs[bomb][0] && column == bombs[bomb][1]){
                    table[row][column].hasBomb = true
                }
            }
        }
    }
}

function checkWins(){
    let count = 0
    
    for(let row=0; row<8; row++){
        for(let column=0; column<8; column++){
            if(table[row][column].hasBomb != true && table[row][column].isPopped != true){
                count += 1
            }
        }
    }

    if(count==0 && death != true){
        alert("You won!")
        finishGame()
    }
}

function finishGame(){
    var button = document.createElement("button")
    var body = document.getElementById("body")
    var div = document.createElement("div")
            
    button.style.backgroundColor = "darkgreen"
    button.style.color = "white"
    button.style.paddingTop = "2%"
    button.style.paddingRight = "5%"
    button.style.marginLeft = "43%"

    button.addEventListener("click", function(){
        window.location.reload()
    })

    div.style.textAlign = "center"
    div.innerText = "Retry"
    div.style.marginBottom = "60%"
    div.style.marginLeft = "60%"
    div.style.fontSize = "x-large"

    body.appendChild(button)
    button.appendChild(div)
}

function pop(table, row, column){

    if(!firstClick){
        if(table[row][column].hasBomb){
            while(!firstClick){
                let rndrow = getRandomInt(0, 7)
                let rndcolumn = getRandomInt(0, 7)
                if(!table[rndrow][rndcolumn].hasBomb){
                    table[row][column].hasBomb = false
                    table[rndrow][rndcolumn].hasBomb = true
                    firstClick = true
                }
            }
        }
        firstClick = true
    }

    if(!table[row][column].isPopped){
        table[row][column].isPopped = true
        table[row][column].style.backgroundColor = "darkslategray"

        if(table[row][column].hasBomb){
            table[row][column].innerHTML = "💣"
            if(!death){
                alert("You died!")
                finishGame()
            }
            death = true

            for(var row=0; row<8; row++){
                for(var column=0; column<8; column++){
                    if(!table[row][column].isPopped){
                        pop(table, row, column)
                    }
                }
            }


            table[row][column].innerHTML = "💣"
        }else if(table[row][column].number != 0){
            table[row][column].innerHTML = table[row][column].number

            

            if(table[row][column].number == 1){
                table[row][column].style.color = "darkblue"
            }
            if(table[row][column].number == 2){
                table[row][column].style.color = "limegreen"
            }
            if(table[row][column].number == 3){
                table[row][column].style.color = "darkred"
            }
            if(table[row][column].number == 4){
                table[row][column].style.color = "darkorchid"
            }
            if(table[row][column].number == 5){
                table[row][column].style.color = "orange"
            }
            if(table[row][column].number == 6){
                table[row][column].style.color = "cornflowerblue"
            }
            if(table[row][column].number == 7){
                table[row][column].style.color = "burlywood"
            }
            if(table[row][column].number == 8){
                table[row][column].style.color = "black"
            }


        }else{
            setTimeout(() => {
                if(row>0 && row<7){
                    if(table[row-1][column].isPopped != true){
                        pop(table, row-1, column)
                    }
                    if(table[row+1][column].isPopped != true){
                        pop(table, row+1, column)
                    }
                    if(column>0){
                        if(table[row-1][column-1].isPopped != true){
                            pop(table, row-1, column-1)
                        }
                        if(table[row][column-1].isPopped != true){
                            pop(table, row, column-1)
                        }
                        if(table[row+1][column-1].isPopped != true){
                            pop(table, row+1, column-1)
                        }
                    }     
                    if(column<7){
                        if(table[row-1][column+1].isPopped != true){
                            pop(table, row-1, column+1)
                        }
                        if(table[row][column+1].isPopped != true){
                            pop(table, row, column+1)
                        }
                        if(table[row+1][column+1].isPopped != true){
                            pop(table, row+1, column+1)
                        }
                    }


                }else if(row==0){
                   if(table[row+1][column].isPopped != true){
                        pop(table, row+1, column)
                   }

                   if(column>0){
                        if(table[row][column-1].isPopped != true){
                            pop(table, row, column-1)
                        }
                        if(table[row+1][column-1].isPopped != true){
                            pop(table, row+1, column-1)
                        }
                   }
                   if(column<7){
                        if(table[row][column+1].isPopped != true){
                            pop(table, row, column+1)
                        }
                        if(table[row+1][column+1].isPopped != true){
                            pop(table, row+1, column+1)
                        }
                   }

                }else if(row==7){
                    if(table[row-1][column].isPopped != true){
                        pop(table, row-1, column)
                    }

                    if(column>0){
                        if(table[row][column-1].isPopped != true){
                            pop(table, row, column-1)
                        }
                        if(table[row-1][column-1].isPopped != true){
                            pop(table, row-1, column-1)
                        }
                    }

                    if(column<7){
                        if(table[row][column+1].isPopped != true){
                            pop(table, row, column+1)
                        }
                        if(table[row-1][column+1].isPopped != true){
                            pop(table, row-1, column+1)
                        }
                    }
                }
            },10)
                
        }
    }
    checkWins()
}
    


function placeNumbers(table){
    for(let row=0; row<8; row++){
        for(let column=0; column<8; column++){
           if(table[row][column].hasBomb){
                if(row==0 && column==0){

                    if(!table[row+1][column].hasBomb){
                        table[row+1][column].number = parseInt(table[row+1][column].number)+1
                    }
                    if(!table[row+1][column+1].hasBomb){
                        table[row+1][column+1].number = parseInt(table[row+1][column+1].number)+1
                    }
                    if(!table[row][column+1].hasBomb){
                        table[row][column+1].number = parseInt(table[row][column+1].number)+1
                    }
                      
                }else if(row==0 && column<7){

                    if(!table[row][column-1].hasBomb){
                        table[row][column-1].number = parseInt(table[row][column-1].number)+1
                    }
                    if(!table[row][column+1].hasBomb){
                        table[row][column+1].number = parseInt(table[row][column+1].number)+1
                    }
                    if(!table[row+1][column-1].hasBomb){
                        table[row+1][column-1].number = parseInt(table[row+1][column-1].number)+1
                    }
                    if(!table[row+1][column].hasBomb){
                        table[row+1][column].number = parseInt(table[row+1][column].number)+1
                    }
                    if(!table[row+1][column+1].hasBomb){
                        table[row+1][column+1].number = parseInt(table[row+1][column+1].number)+1
                    }
                    
                }else if(row==0 && column==7){

                    if(!table[row+1][column].hasBomb){
                    table[row+1][column].number = parseInt(table[row+1][column].number)+1
                    }
                    if(!table[row][column-1].hasBomb){
                        table[row][column-1].number = parseInt(table[row][column-1].number)+1
                    }
                    if(!table[row+1][column-1].hasBomb){
                        table[row+1][column-1].number = parseInt(table[row+1][column-1].number)+1
                    }
                    
                }else if(row<7 && column==0){
                    if(!table[row+1][column].hasBomb){
                        table[row+1][column].number = parseInt(table[row+1][column].number)+1
                    }
                    if(!table[row+1][column+1].hasBomb){
                        table[row+1][column+1].number = parseInt(table[row+1][column+1].number)+1
                    }
                    if(!table[row][column+1].hasBomb){
                        table[row][column+1].number = parseInt(table[row][column+1].number)+1
                    }
                    if(!table[row-1][column].hasBomb){
                        table[row-1][column].number = parseInt(table[row-1][column].number)+1
                    }
                    if(!table[row-1][column+1].hasBomb){
                        table[row-1][column+1].number = parseInt(table[row-1][column+1].number)+1
                    }
                
                }else if(row<7 && column==7){
                    if(!table[row][column-1].hasBomb){
                        table[row][column-1].number = parseInt(table[row][column-1].number)+1
                    }
                    if(!table[row+1][column].hasBomb){
                        table[row+1][column].number = parseInt(table[row+1][column].number)+1
                    }
                    if(!table[row-1][column].hasBomb){
                        table[row-1][column].number = parseInt(table[row-1][column].number)+1
                    }
                    if(!table[row+1][column-1].hasBomb){
                        table[row+1][column-1].number = parseInt(table[row+1][column-1].number)+1
                    }
                    if(!table[row-1][column-1].hasBomb){
                        table[row-1][column-1].number = parseInt(table[row-1][column-1].number)+1
                    }
                    
                }else if(row<7 && column<7){
                    if(!table[row][column-1].hasBomb){
                        table[row][column-1].number = parseInt(table[row][column-1].number)+1
                    }
                    if(!table[row][column+1].hasBomb){
                        table[row][column+1].number = parseInt(table[row][column+1].number)+1
                    }
                    if(!table[row+1][column].hasBomb){
                        table[row+1][column].number = parseInt(table[row+1][column].number)+1
                    }
                    if(!table[row+1][column-1].hasBomb){
                        table[row+1][column-1].number = parseInt(table[row+1][column-1].number)+1
                    }
                    if(!table[row+1][column+1].hasBomb){
                        table[row+1][column+1].number = parseInt(table[row+1][column+1].number)+1
                    }
                    if(!table[row-1][column-1].hasBomb){
                        table[row-1][column-1].number = parseInt(table[row-1][column-1].number)+1
                    }
                    if(!table[row-1][column].hasBomb){
                        table[row-1][column].number = parseInt(table[row-1][column].number)+1
                    }
                    if(!table[row-1][column+1].hasBomb){
                        table[row-1][column+1].number = parseInt(table[row-1][column+1].number)+1
                    }
                    
                }else if(row==7 && column==7){
                    if(!table[row][column-1].hasBomb){
                        table[row][column-1].number = parseInt(table[row][column-1].number)+1
                    }
                    if(!table[row-1][column].hasBomb){
                        table[row-1][column].number = parseInt(table[row-1][column].number)+1
                    }
                    if(!table[row-1][column-1].hasBomb){
                        table[row-1][column-1].number = parseInt(table[row-1][column-1].number)+1
                    }
                    
                }else if(row==7 && column==0){
                    if(!table[row][column+1].hasBomb){
                        table[row][column+1].number = parseInt(table[row][column+1].number)+1
                    }
                    if(!table[row-1][column].hasBomb){
                        table[row-1][column].number = parseInt(table[row-1][column].number)+1
                    }
                    if(!table[row-1][column+1].hasBomb){
                        table[row-1][column+1].number = parseInt(table[row-1][column+1].number)+1
                    }
                }else if(row==7 && column<7){
                    if(!table[row][column+1].hasBomb){
                        table[row][column+1].number = parseInt(table[row][column+1].number)+1
                    }
                    if(!table[row][column-1].hasBomb){
                        table[row][column-1].number = parseInt(table[row][column-1].number)+1
                    }
                    if(!table[row-1][column].hasBomb){
                        table[row-1][column].number = parseInt(table[row-1][column].number)+1
                    }
                    if(!table[row-1][column+1].hasBomb){
                        table[row-1][column+1].number = parseInt(table[row-1][column+1].number)+1
                    }
                    if(!table[row-1][column-1].hasBomb){
                        table[row-1][column-1].number = parseInt(table[row-1][column-1].number)+1
                    }
                }
            }
        }
    }
}



window.onload = function(){
    window.table_colums = document.getElementsByTagName("td")
    createTable(window.table_colums)
    placeBombs(table)

    for(let row=0; row<8; row++){
        for(let column=0; column<8; column++){
            table[row][column].number = 0
            table[row][column].addEventListener("click", function(row, column){
                return function(){
                    pop(table, row, column)
                }
            }(row, column), true)
            table[row][column].addEventListener("contextmenu", function(){
                return function(){
                    if(this.isPopped != true){
                        if(this.innerHTML != "🚩"){
                            this.innerHTML = "🚩"
                        }else{
                            this.innerHTML = ""
                        }   
                    }
                }
            }(row, column), false)

        }
    }

    placeNumbers(table)
}