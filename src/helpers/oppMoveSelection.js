export default function makeOppMoveSelection(opp){
    let cooled = opp.moves.map( (move) => {
        if (move.tillCooldown == 0){
            return move
        }
    })
    if (opp.hp < 50 ){
        cooled.forEach(element => {
            if (element.dmg < 0){
                return element
            }
        });
    }
    else{
        let len = cooled.length
        let indexSel = Math.floor(Math.random() * len)
        return opp.moves[indexSel]
    }

}