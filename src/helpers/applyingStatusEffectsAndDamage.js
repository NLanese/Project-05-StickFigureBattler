import returnStatDmg from "./returnStatDmg"

export default function applyingStatusEffectandDamage(state, damage, action){

    // ASSIGNS THE GLOBAL VALUES
    let selected = null
    let other = null
    let selectedObj = null
    let otherObj = null

    // ASSIGNS selected AND other
    if (state.figures[0].id == state.battle_details.this_move_target_id){
        selected = state.figures[0]
        other = state.figures[1]
    }
    else{
        selected = state.figures[1]
        other = state.figures[0]
    }

    // DETERMINES IF THIS WAS A BOOST OR AN ATTACK
    let damageDirection = "Lost" 
    if (damage < 0){
        damageDirection = "Gained"
    }
    else{
        damage = damage * -1
    }

    // DECLARES A PROMPT ARRAY
    let prompt_array = [`${selected.name} ${damageDirection} ${damage} hit points!`, null, null, null, null]


    switch(action){
        //  IF THE EFFECT IS A BOOST OR DECREASE INSTEAD OF STATUS EFFECT - BELOW
        case(effect.includes("increase")):
        case(effect.includes("decrease")):

            // sets needed third party values
            let effect = action.effect
            let modifier = 0

            // Determines whether stats increase of decrease
            if (effect.includes("increase")){ modifier = 1 }
            else{ modifier = -1 }

            // Turns the effect string into an array
            let effect_array = effect.split("-")

            // Turns the effect array into actual values assigned to each stat
            // example: "increase-atk-atk-def" would increase atk by 2 def by 1
            let upObj = {atk: 0, def: 0, sAtk: 0, sDef: 0}
            effect_array.forEach( (word) => {
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
            //  IF THE EFFECT IS A BOOST OR DECREASE INSTEAD OF STATUS EFFECT - ABOVE

            // ___________________________________________________________________________________________
            //

            //  CREATES A PROMPT ARRAY TO DISPLAY ON THE MESSAGE SCREEN - BELOW //
            //                     also modifies state changes                  //
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
                            tAmt = "Error ApplyingStatusEffects.js Line 44"
                    }
                    prompt_array[i] = `${selected.name} had their ${stat} ${tAmt}`
                    i += 1
                }
            }
            let effectingStat = 0
            let effectingFigure = null
            if (damageDirection == "Gained"){
                effectingFigure = selected
            }
            else{
                effectingFigure = other
            } 
            effectingStat = (effectingFigure.level * 1.8)
            let nAtk = parseInt((upObj.atk * effectingStat), 10)
            let nDef = parseInt((upObj.def * effectingStat), 10)
            let nsAtk = parseInt((upObj.sAtk * effectingStat), 10)
            let nsDef = parseInt((upObj.sDef * effectingStat), 10)
            upObj = {atk: nAtk, def: nDef, sAtk: nsAtk, sDef: nsDef}
            // ________________________________________________________________________
            //
            //  RETURNS AN OBJECT TO BE PLACED RIGHT INTO THE STATE IN THE REDUCER - BELOW //
            selectedObj = {...selected, hp: selected.hp + action.amount, 
                                    atk: selected.atk + upObj.atk,
                                    def: selected.def + upObj.def,
                                    sDef: selected.sDef + upObj.sDef,
                                    sAtk: selected.sAtk + upObj.sAtk
                          }
            otherObj = other
            //  RETURNS AN OBJECT TO BE PLACED RIGHT INTO THE STATE IN THE REDUCER - ABOVE // 
        // ________________________________________________________________________
        //
        //  IF THE EFFECT IS ANOTHER NON-STATUS ALTERING EFFECT - BELOW  //
        case(effect == "move first"):
        case(effect == "none"):
            selectedObj = {...selected, hp: state.user.hp + action.paylod} 
            otherObj = other
        //  IF THE EFFECT IS ANOTHER NON-STATUS ALTERING EFFECT - ABOVE  //
        // ________________________________________________________________________
        //
        //  IF THE EFFECT IS RECOIL - BELOW //
        case(effect == "recoil"):
            if (state.this_move_target_id == state.figures.user.id){
                return {
                    user: {...selected, hp: selected.hp + action.amount, effect: action.effect},
                    opp: {...other, hp: other.hp - (action.action / 3)},
                    battle_details: {...state.battle_details, prompt:[
                        (`${selected.name} ${damageDirection} ${damage} hit points!`),
                        (`${other.name} was damaged by the recoil`)
                    ]} 
                }
            }
            else{
                return {
                    opp: {...selected, hp: selected.hp + action.amount, effect: action.effect},
                    user: {...other, hp: other.hp - (action.action / 3)},
                    battle_details: {...state.battle_details, prompt:[
                        (`${selected.name} ${damageDirection} ${damage} hit points!`),
                        (`${other.name} was damaged by the recoil`)
                    ]} 
                }
            }
        //  IF THE EFFECT IS RECOIL - ABOVE //
        // ________________________________________________________________________
        //
        //  IF THE EFFECT IS CLEAR - BELOW //
        case(effect == "clear"):
            let selectedObj = {...selected, hp: selected.hp + action.amount, effect: "none"}
            let otherObj = {other}
        //  IF THE EFFECT IS CLEAR - ABOVE //
        // ________________________________________________________________________
        //  
        //  IF THE EFFECT IS ANYTHING ELSE - BELOW //
        default:
            selectedObj = {...selected, hp: selected.hp + action.amount, effect: action.effect }
            otherObj = other
            prompt_array[1] = `${selected.name} ${damageDirection} ${damage} hit points!`
            prompt_array[2] = `${selected.name} now has the ${action.effect} status effect applied.`
        //  IF THE EFFECT IS ANYTHING ELSE - BELOW //    
    }
    prompt_array = prompt_array.map( (prompt) => {
        if (prompt != null){
            return prompt
        }
    })
    let bDetails = state.battle_details
    if (state.this_move_target_id == state.figures.user.id){
        return returnStatDmg(selected, other, bDetails, prompt_array)
    }
    else{
        return returnStatDmg(other, selected, bDetails, prompt_array)
    }
}