
function typeAnimation(element,array){
    const savedArray = array;
    let counter = 0
    let sentence = array[counter].split('')
    function typeSentence(){
        if(sentence.length > 0){
            element.innerHTML += sentence.shift()
            setTimeout(typeSentence,90)
        }else{
            setTimeout(deleteSentence,700)
        }
        }
        typeSentence()



        function deleteSentence(){
            let sentenceToDelete = array[counter].split('')
            function deleteEffect(){
                if(sentenceToDelete.length > 0){
                    sentenceToDelete.pop()
                    //fjerner komma
                    element.innerHTML = sentenceToDelete.join('')
                }else{
                    if(counter < array.length){
                        if(array.length > counter+1){
                            counter += 1
                        }else{
                            counter = 0
                            array = savedArray
                        }
                        sentence = array[counter].split('')
                    setTimeout(typeSentence,300)
                    return
                    }
        
                }
                setTimeout(deleteEffect, 40);
            }
            deleteEffect()
        }
}

export default{
    typeAnimation
}


