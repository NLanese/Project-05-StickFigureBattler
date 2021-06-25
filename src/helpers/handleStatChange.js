export default function handleStatChange(state, effect, attacker, other){

    let returnState = state
    let modifier = 0
    let prompt_array = [null, null, null, null]

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
        switch(word){
            case("atk"):
                upObj.atk += (1 * modifier) 
            case("sAtk"):
                upObj.sAtk += (1 * modifier) 
            case("def"):
                upObj.def += (1 * modifier) 
            case("sDef"):
                upObj.sDef += (1 * modifier) 
    }})

    // This will generate one message per state change, returning each message as an element in an array
    let i = 1 
    for (const stat in upObj){
        let tAmt = ""
        let tDir = ""
        if (effect_array[stat] != 0){ 
            if (effect_array[stat] > 0){
                tDir = "increased!"
            }
            else{
                tDir = "decreased!"
            }
            switch(effect_array[stat]){
                case(1 || -1):
                    tAmt = `Slightly ${tDir}`
                case(2 || -2):
                    tAmt = `Moderately ${tDir}` 
                case(3 || -3):
                    tAmt = `Tremendously ${tDir}`
                default: 
                    tAmt = "Error ApplyingStatusEffects.js Line 27"
            }
            prompt_array[i] = `${attacker.name} had their ${stat} ${tAmt}`
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
            [other]: {...returnState[other], 
                atk: returnState[other].atk + nAtk, 
                def: returnState[other].def + nDef,
                sAtk: returnState[other].sAtk + nsAtk,
                sDef: returnState[other].sDef + nsDef
            },
            [attacker]: {...returnState[attacker]}
        }
    }
    else{
        returnState = {...returnState,
            [attacker]: {...returnState[attacker], 
                atk: returnState[attacker].atk + nAtk, 
                def: returnState[attacker].def + nDef,
                sAtk: returnState[attacker].sAtk + nsAtk,
                sDef: returnState[attacker].sDef + nsDef
            },
            [other]: {...returnState[other]}
        }
    }
    returnState = {...returnState, prompt: prompt_array}
    return returnState
}
