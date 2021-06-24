export function userMoveAction(moveObj){
    let dispatchType = ""
    if (moveObj.effect == "blinding" || moveObj.effect == "burning" || moveObj.effect == "frozen" || moveObj.effect == "shock" || moveObj.effect == "poison"){
        if (Math.random() < 0.6){
            moveObj.effect = "none"
        }
    }
    if (moveObj.damage_rating < 0){
        dispatchType = "CHANGE_USER_HP"
    }
    else{
        dispatchType = "CHANGE_USER_HP"
    }
    return {type: dispatchType, payload: moveObj}
} 