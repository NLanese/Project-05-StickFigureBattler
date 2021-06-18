export default function returnStatDmg(user, opp, battle_details, prompt_array){
    // one of user or opp will be SELECTED or OTHER. This allows us to use the state to determine who is up
    // without having to code the entriety of the method twice, one for if selected is a user and one for opponent. 
    // Without this method, the object returned would say "selected" and "other" instead of "user" and "opp"  
    return {
        user: {user},
        opp: {opp},
        // The only thing changed for battle_details is the prompt
        battle_details: {...battle_details, prompt: prompt_array}
    }
}