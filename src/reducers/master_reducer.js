import { combineReducers } from "redux";
import applyingStatusEffectandDamage from "../helpers/applyingStatusEffectsAndDamage"
import figures from "../helpers/list_of_figures";


const rootReducer = combineReducers({
    battle: manageBattle,
    user: manageUser
  })
  export default rootReducer


// This is in charge of changing or creating a BATTLE instance. This means it will cover the following...
  // 1. Generates a new BATTLE instance with a new OPPONENT BATTLER instance as well in one fetch action
  // 2. This is the reducer that will enable us to make changes to either a USER or OPPONENT state like 
  //    health or status. Def, Atk, and sDef can also be raised on rare occasions.
  // 3. Handles an action that will fire as soon as either the user or opponent's health goes to 0. This ends
  //    the Battle and resets the user's health and clears any status effects. It also handles the leveling up, which 
  //    involves a fetch to send data and alter the user's character in the database
function manageBattle(
    state={
        // figures:{                       // The following figures are temporary as the stats will ne changed during the battle.
        //     user: {                     // We save the original user stats under the manageUser reducer
        //         name: "",                       // The name of the user figure
        //         id: null,                       // Generated in Rails
        //         hp: 0,                          // Health
        //         type: null,                     // Type, one of... TECH, WEAPONRY, SUPERNATURAL, ATHLETIC, NETHER, STEALTH. Each has a different effectiveness on the other
        //         level: 0,                       // Keeps track of how many fights they have won
        //         status: "none",                 // Certins moves (generated by Rails) have status effects. This variable holds what effects (if any) are present on the user
        //         spd: 0,                         // Speed
        //         atk: 0,                         // Attack
        //         def: 0,                         // Defense... you get it right?
        //         sAtk: 0,                        //
        //         sDef: 0,                        //
        //         tEffected: 0,                   // How many turns the user has been effected by a status effect. 0 if unaffected 
        //         image: "N/A",                   // Generated by Rails and used to determine with jpeg to load
        //         moves: [null]                   // Sets an empty array for the moves and setting that up is gonna suck so I'm avoiding it
        //     },
             opp: {
                 created: false,
                 name: "",
                 title: "",
                 id: null,                       // See Above
                 hp: 0,
                 type: null,
                 level: 0,
                 status: "none",
                 spd: 0,
                 atk: 0,
                 def: 0,
                 sAtk: 0,
                 sDef: 0,
                 tEffected: 0,
                 image: "N/A",
                 moves: [null]
             },
             user: {
                 status: "none",
                 tEffected: 0,
                 hp: 0,
                 // You should add tToCool to the Moves Database in Rails
                 moves: [null]
             },
        // },
        // battle_details: {
            turns: 0,                           // This will keep track of the turns elapsed
            whoseTurn_id: null,                     // This will be set to 'user', 'opp', or 'none'. 
            this_move_target_id: null,
            prompt: "Welcome",
            loading: false
       // }
    }, action){

    switch (action.type) {
    // action = {type: 'SET_USER', payload: <user object>}
        case 'SET_USER':
            let figure = action.payload
            return {...state, figures: {...state.figures, user: {...state.figures.user, name:figure.name, hp: figure.hp, type: figure.type, level: figure.level, atk: figure.atk, def: figure.def, sDef: figure.sDef, sAtk: figure.sAtk, spd: figure.spd, hp: figure.hp }}}

    // action {type: 'START_BATTLE', oppo: <opponent object> user: <user object)}   
        case 'START_BATTLE':
            console.log(action)
            let whoStarts = ""
            let opponent = action.oppo
            opponent = {...opponent, created: true, title: opponent.name}
            if (action.user.spd >= action.oppo.spd){
                whoStarts = "user"
            }
            else{
                whoStarts = "opp"
            }
            return {...state, opp: opponent, loading: false, whoseTurn: whoStarts}

    // action {type: 'LOAD_BATTLE'}
        case 'LOAD_BATTLE':
            return {...state, loading: true}       

        case 'CHANGE_USER_HP':
            // action = {type: "CHANGE_OPP_HP", payload: <move object> }
            let effect = action.effect
            let newUserState = applyingStatusEffectandDamage(state, action.payload)
            return {newUserState}

        case 'CHANGE_OPP_HP':
            // action = {type: "CHANGE_OPP_HP", amount: {Number generated in Event Listener inside of Moves}, effect: {String generated in Event Listener} }
            effect = action.effect
            let newOppState = applyingStatusEffectandDamage(state, action.amount, effect)
            return {newOppState}

        case 'COMPLETE_BATTLE':
            // CHANGE PROMPT, RESET USER HP, LEVEL UP
            return state

                    
        default:
            return state;
    }
}

function manageUser( 
    state= 
        {
            name: null,
            title: null,
            created: false,
            id: null,                       // Generated in Rails
            hp: 0,                          // Health
            type: null,                     // Type, one of... TECH, WEAPONRY, SUPERNATURAL, ATHLETIC, NETHER, STEALTH. Each has a different effectiveness on the other
            level: 0,                       // Keeps track of how many fights they have won
            status: "none",                 // Certins moves (generated by Rails) have status effects. This variable holds what effects (if any) are present on the user
            spd: 0,                         // Speed
            atk: 0,                         // Attack
            def: 0,                         // Defense... you get it right?
            sAtk: 0,                        //
            sDef: 0,                        //
            tEffected: 0,                   // How many turns the user has been effected by a status effect. 0 if unaffected 
            image: "N/A",                   // Generated by Rails and used to determine with jpeg to load
            moves: [null, null, null, null],// Sets an empty array for the moves and setting that up is gonna suck so I'm avoiding it
            currentlySelected: null,        // Lets the code know whether or not we have selected a figure
            loading: false
        }, 
        action){
    switch(action.type){
        // {type: "CREATE_USER_NAME", figureName: "Sample Name"}
        case('SELECT_USER_FIGURE'):
            return {...state, currentlySelected: action.figureName}

    // {type: "CREATE_USER_NAME", payload: "Sample Name"}
        case('CREATE_USER_NAME'):
            return {...state, name: action.payload}

    // {type: "REPLACE_USER_MOVE", payload: <move object generated in LevelUp.js>, index: <index of move being removed> }
        case('REPLACE_USER_MOVE'):
            
    // {type: "CREATE_USER_FIGURE", figure: {<stats>, <moves>, <info>}}        
        case('CREATE_USER_FIGURE'):
            let figure = action.payload
            let stats = action.payload.stats
            return {...state, title: figure.name, type: figure.class_type, level: 1,
                    hp: stats.hp, spd: stats.spd, atk: stats.atk, def: stats.def, sAtk: stats.sAtk, sDef: stats.sDef,
                    moves: figure.moves, created: true, loading: false}

    // {type: "DESELECT"}
        case('DESELECT'):
            return {...state, currentlySelected: null}
        
    // {type: 'LOAD_FIGURE'}        
        case('LOAD_FIGURE'):
            return {...state, loading: true}

        default:
            return state
    }
}
