

/*
const header = document.getElementById("terminal-span-express")
let commands = ["npm install express", "npm i express","npm install -g express","npm install express@2.0.0"]
let commandCounter = 0
function type(){
    let word = commands[commandCounter].split('')
    function typeWord(){
    if(word.length > 0){
        header.innerHTML += word.shift()
        setTimeout(typeWord,90)
    }else{
        setTimeout(deleteWord,700)
    }
}
typeWord()
}


type()
function deleteWord(){
    let word = commands[commandCounter].split('')
    function deleteEffect(){
        if(word.length > 0){
            word.pop()
            //fjerner komma
            header.innerHTML = word.join('')
        }else{
            if(commandCounter < commands.length){
                if(commands.length > commandCounter+1){
                    commandCounter += 1
                }else{
                    commandCounter = 0
                    commands = ["npm install express", "npm i express","npm install -g express","npm install express@2.0.0"]
                }
            setTimeout(type,300)
            return
            }

        }
        setTimeout(deleteEffect, 40);
    }
    deleteEffect()
}


*/


import main from "../../assets/js/main.js"

main.typeAnimation(document.getElementById("code-span-express"),
["res.send('hello world')","res.sendFile('/path/to/index.html')","res.send(req.params.name)"]
)

//["npm install express", "npm i express","npm install -g express","npm install express@2.0.0"]