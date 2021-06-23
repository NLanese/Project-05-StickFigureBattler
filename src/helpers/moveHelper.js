export function moveDispatcher(moveObj){
    if (moveObj.effect == "blinding" || moveObj.effect == "burning" || moveObj.effect == "frozen" || moveObj.effect == "shock" || moveObj.effect == "poison"){
        if (Math.random() < 0.6){
            moveObj.effect = "none"
        }
    }
} 