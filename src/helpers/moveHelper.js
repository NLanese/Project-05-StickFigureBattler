

export function moveAction(moveObj, attacker){
    // Sets globals
    let dispatchType = ""
    let effectOdds = Math.floor(Math.random() * 100)

    // Determines if status effect applies
    if (moveObj.effect == "blinding" || moveObj.effect == "burning" || moveObj.effect == "frozen" || moveObj.effect == "shock" || moveObj.effect == "poison"){
        if ( effectOdds > moveObj.acc){
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


