import handleStatChange from "./handleStatChange"
import determinePoints from "./determinePoints"

export default function applyingStatusEffectandDamage(state, moveObj, whoIsAttacking){
    // Sets needed gloabl values
    let returnState = {...state}
    let attacker = null
    let other = null
    if (whoIsAttacking == "user"){
        attacker = {...state.user, tag: "user"}
        other = {...state.opp, tag: "opp"}
    }
    else{
        attacker =  {...state.opp, tag: "opp"}
        other =  {...state.user, tag: "user"}
    }

    // Determines if attacker is frozen, if so he cannot attack
    if (attacker.status == "frozen"){
        return {...returnState, prompt: returnState.prompt + ` ${attacker.name} is frozen and cannot attack!`}
    }
    else{
        returnState = {...returnState, prompt: returnState.prompt + ` ${attacker.name} used ${moveObj.name}`}
    }

    // Determines if attack misses or hits, if it misses, return with only a prompt change
    let missOdds = Math.floor(Math.random() * 100)
    if (attacker.status == "blinded"){
        missOdds = missOdds + 30
    }
    if (missOdds > moveObj.acc){
        return {...returnState, prompt: returnState.prompt + (`| ${attacker.name}'s attack missed! |`)}
    }

    // Handles damage
    if (moveObj.dmg >= 0){
        returnState = {...returnState, 
            [other.tag]: {...returnState[other.tag], hp: returnState[other.tag].hp - determinePoints(moveObj, attacker, other)},
            prompt: returnState.prompt + (`| ${attacker.name} dealt ${determinePoints(moveObj, attacker, other)} damage to ${other.name}!`)
        }
    } 
    else{
        returnState = {...returnState, 
            [attacker.tag]: {...returnState[attacker.tag], hp: returnState[attacker.tag].hp - determinePoints(moveObj, attacker, attacker) },
            prompt:  returnState.prompt + (`| ${attacker.name} healed ${determinePoints(moveObj, attacker, other) * -1} damage!`)
        }
    }

    // Handles any Stat Altering Effects
    if (moveObj.effect.includes("crease")){
        returnState = handleStatChange(returnState, moveObj.effect, attacker, other, moveObj.name)
    }

    // Handles any Recoil Effects
    else if (moveObj.effect == "recoil"){
        returnState = { ...returnState, 
            [attacker.tag]: {...returnState[attacker.tag], hp: returnState[attacker.tag].hp - (determinePoints(moveObj, attacker, other) / 4) },
            prompt:  returnState.prompt + (`${attacker.name} was dealt ${(determinePoints(moveObj, attacker, other) / 4)} damage in recoil!`)
        }
    }

    // Handles attacks with no effects
    else if (moveObj.effect == "none" || moveObj.effect == "move first" || moveObj.effect == "clear"){
        // Do nothing
    }

    // All normal status effects
    else{
        if (other.status == ("none")){
            returnState = {...returnState, 
                [other.tag]: {...returnState[other.tag], status: moveObj.effect, tEffected: 1},
                prompt:  returnState.prompt +  ` ${other.name} has a new status effect!`
            }
        }
        else{
            returnState = {...returnState}
        }
    }

    // Handles any Clear Effects
    if (moveObj.effect == "clear"){
        returnState = {...returnState, 
            [attacker.tag]: {...returnState[attacker.tag], status: "none"},
            prompt:  returnState.prompt +  (`${attacker.name} has been cleared of all effects!`)
        }
    }

    return {...returnState, prompt: returnState.prompt + "|"}
}