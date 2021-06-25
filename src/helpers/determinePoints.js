import moveTypeWorker from "./moveTypeWorker"

export default function determinePoints(moveObj, attacker, target){
    let actualDmg = ""
    let dam_type = moveObj.damage_type
    let dmg = moveObj.dmg
    if (dmg >= 0){
        if (dam_type == "physical"){
            let actualDmgFloat = (attacker.atk * 2.55 - target.def * 1.35) * (dmg / 100.0) 
            actualDmg = parseInt(actualDmgFloat, 10)
        }
        else{
            let actualDmgFloat = (attacker.sAtk * 2.55 - target.sDef * 1.35) * (dmg / 100.0) 
            actualDmg = parseInt(actualDmgFloat, 10)           
        }
        actualDmg = moveTypeWorker(moveObj, actualDmg, target)
        if (actualDmg < 2 ){
            actualDmg = 2
        }
    }
    else{
        if (dam_type == "physical"){
            let actualDmgFloat = (attacker.atk * 1.35) * (dmg /100.0)
            actualDmg = parseInt(actualDmgFloat, 10)              
        }
        else{
            let actualDmgFloat = (attacker.atk * 1.35) * (dmg /100.0)
            actualDmg = parseInt(actualDmgFloat, 10)        
        }
    }
    return actualDmg
}