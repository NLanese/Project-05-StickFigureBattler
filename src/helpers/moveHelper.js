

export function moveAction(moveObj, attacker){
    // Sets globals
    let dispatchType = ""

    // Determines if status effect applies
    if (moveObj.effect == "blinding" || moveObj.effect == "burning" || moveObj.effect == "frozen" || moveObj.effect == "shock" || moveObj.effect == "poison"){
        if (Math.random() < 0.6){
            moveObj.effect = "none"
        }
    }

    // determines whether the dispatch will be for the user or opponennt
    if (attacker == "user"){
        dispatchType = "PROCESS_USER_MOVE"
    }
    else{
        dispatchType = "PROCESS_OPP_MOVE"
    }
    return {type: dispatchType, payload: moveObj}
} 


