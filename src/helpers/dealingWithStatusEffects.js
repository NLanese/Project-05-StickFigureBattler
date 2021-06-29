export default function dealWithStatus(figure){

    // Declare Globals
    let prompt = ""
    let newHp = figure.hp
    let new_tEffected = figure.tEffected
    let targetToClear = 10000
    let clear = false
    // determines if there even is a status effect to deal with
    if (figure.status == "none"){
        return {newHp: newHp, new_tEffected: new_tEffected, prompt: "N/A", clear: true}
    }
    else{
        new_tEffected = figure.tEffected 
    }
    if (figure.status == "shock"){
        newHp = figure.hp - (figure.hp / 5)
        prompt = `${figure.name} was damaged from shock!|`
        targetToClear = 300
    }
    else if (figure.status == "burning"){
        newHp = figure.hp - 10
        prompt = `${figure.name} was damaged from burning! |`
        targetToClear = 375
    }
    else if (figure.status == "poison"){
        newHp = figure.hp - figure.hp - 15
        prompt = `${figure.name} was damaged from poison! |`
        targetToClear = 425
    }
    else if (figure.status == "frozen"){
        targetToClear = 230
    }
    else{
        targetToClear = 350
    }
    let clearChance = Math.floor(Math.random() * (375 * new_tEffected))
    if (clearChance > targetToClear){
        prompt += `${figure.name} is now cured of all status effects! |`
        clear = true
    }
    if (newHp <= 0){
        newHp = 1
    }
    console.log("Inside dealingWithStatusEffects.js Line 45: displaying clearChance and targetToClear")
    console.log(clearChance)
    console.log(targetToClear)
    newHp = parseInt(newHp, 10)
    return {newHp: newHp, new_tEffected: new_tEffected, prompt: prompt, clear: clear}
}