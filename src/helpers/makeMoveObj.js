export default function makeMoveObj(json){
    return ({
        name: json.name,
        type: json.class_type,
        dmg: json.damage_rating,
        acc: json.acc,
        cool: json.cooldown,
        dmg_type: json.damage_type,
        desc: json.description,
        effect: json.effect,
        tillCooldown: 0
    })
}