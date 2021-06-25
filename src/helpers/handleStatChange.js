export default function handleStatChange(state, effect, attacker, other, name){

    let returnState = state
    let modifier = 0
    let prompt_array = `${attacker.name} used ${name}`

    // Determines whether stats increase of decrease
    if (effect.includes("increase")){ 
        modifier = 1 
    }
    else{ 
        modifier = -1 
    }

    // Turns the effect string into an array
    let effect_array = effect.split("-")

    // Turns the effect array into actual values assigned to each stat
    // example: "increase-atk-atk-def" would increase atk by 2 def by 1
    let upObj = {atk: 0, def: 0, sAtk: 0, sDef: 0}
    effect_array.forEach( (word) => {

    // Recall that the array will now look like ("increase", "atk", "atk", "sAtk", "aAtk")
    // In which case, upObj would look like {atk: 2, sAtk: 2, def: 0, sDef: 0} after the following code is run
        if (word == "atk"){
            upObj.atk += (1 * modifier)
        }
        else if (word == "sAtk"){
            upObj.sAtk += (1 * modifier)
        }
        else if (word == "sDef"){
            upObj.sDef += (1 * modifier)    
        }
        else if (word == 'def'){
            upObj.def += (1 * modifier) 
        }
    })

    // This will generate one message per state change, returning each message as an element in an array
    let i = 1 
    for (const stat in upObj){
        let tAmt = ""
        let tDir = ""
        if (upObj[stat] != 0){ 
            if (upObj[stat] > 0){
                tDir = "increased!"
            }
            else{
                tDir = "decreased!"
            }
            if (upObj[stat] == 1 || upObj[stat] == -1){
                tAmt = (`Slightly ${tDir}`)
            }
            else if (upObj[stat] == 2 || upObj[stat] == -2){
                tAmt = (`Moderately ${tDir}`)
            }
            else if (upObj[stat] == 3 || upObj[stat] == -3){
                tAmt = (`Tremendously ${tDir}`)
            }

            prompt_array += `|${attacker.name} had their ${stat} ${tAmt}`
            i += 1
        }
    }
    // Makes actual changes to the stats, adjusted to the level of the user
    let effectingStat = (attacker.level * 1.8)
    let nAtk = parseInt((upObj.atk * effectingStat), 10)
    let nDef = parseInt((upObj.def * effectingStat), 10)
    let nsAtk = parseInt((upObj.sAtk * effectingStat), 10)
    let nsDef = parseInt((upObj.sDef * effectingStat), 10)
    if (effect == "increase"){
        returnState = {...returnState,
            [other]: {...returnState[other.tag], 
                atk: returnState[other.tag].atk + nAtk, 
                def: returnState[other.tag].def + nDef,
                sAtk: returnState[other.tag].sAtk + nsAtk,
                sDef: returnState[other.tag].sDef + nsDef
            },
            [attacker]: {...returnState[attacker.tag]},
            prompt: prompt_array
        }
    }
    else{
        returnState = {...returnState,
            [attacker]: {...returnState[attacker.tag], 
                atk: returnState[attacker.tag].atk + nAtk, 
                def: returnState[attacker.tag].def + nDef,
                sAtk: returnState[attacker.tag].sAtk + nsAtk,
                sDef: returnState[attacker.tag].sDef + nsDef
            },
            [other]: {...returnState[other.tag]},
            prompt: prompt_array
        }
    }
    returnState = {...returnState, prompt: prompt_array}
    return returnState
}
