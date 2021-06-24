export default function handleStatChange(effect){

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
    
    
}
