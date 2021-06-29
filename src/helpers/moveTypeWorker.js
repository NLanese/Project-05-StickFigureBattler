export default function moveTypeWorker(moveObj, dmg, target){

    if (moveObj.name == "Tackle"){
        moveObj.type = "athletic"
    }
    // Weaponry Type
    if (moveObj.type == ("weaponry")){
        if (target.type.includes("supernatural")){
            dmg = dmg / 2
        }
        if (target.type.includes("nether")){
            dmg = dmg / 2
        }
        if (target.type.includes("athletics")){
            dmg = dmg * 2
        }
    }

    // Tech type
    else if (moveObj.type == ("tech")){
        if (target.type.includes("tech")){
            dmg = dmg / 2
        }
        if (target.type.includes("athletic")){
            dmg = dmg / 2
        }
        if (target.type.includes("stealth")){
            dmg = dmg * 2
        }
        if (target.type.includes("supernatural")){
            dmg = dmg * 2
        }
    }

    // Super Natural type
    else if (moveObj.type == ("supernatural")){
        if (target.type.includes("tech")){
            dmg = dmg / 2
        }
        if (target.type.includes("supernatural")){
            dmg = dmg / 2
        }
        if (target.type.includes("weaponry")){
            dmg = dmg * 2
        }
        if (target.type.includes("athletic")){
            dmg = dmg * 2
        }
    }

    // Athletics type
    else if (moveObj.type == ("athletic")){
        if (target.type.includes("nether")){
            dmg = dmg / 2
        }
        if (target.type.includes("stealth")){
            dmg = dmg / 2
        }
        if (target.type.includes("tech")){
            dmg = dmg * 2
        }
    }

    // Nether type
    else if (moveObj.type == ("nether")){
        if (target.type.includes("weaponry")){
            dmg = dmg / 2
        }
        if (target.type.includes("supernatural")){
            dmg = dmg / 2
        }
        if (target.type.includes("stealth")){
            dmg = dmg * 2
        }
        if (target.type.includes("nether")){
            dmg = dmg * 2
        }
    }

    // Stealth type
    else if (moveObj.type == ("tech")){
        if (target.type.includes("tech")){
            dmg = dmg / 2
        }
        if (target.type.includes("athletic")){
            dmg = dmg * 2
        }
        if (target.type.includes("weaponry")){
            dmg = dmg * 2
        }
    }
    else{
        let i = 50
        while ( i > 0 ){
            console.log(`Error: Type was ${moveObj.type}`)
            i = i - 10
        }
    }

    return dmg
} 