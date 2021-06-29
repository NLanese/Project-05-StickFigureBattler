import { combineReducers } from "redux";
import applyingStatusEffectandDamage from "../helpers/applyingStatusEffectsAndDamage"
import makeOppMoveArray from "../helpers/makeOppMoves";
import dealWithStatus from "../helpers/dealingWithStatusEffects";

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
            moves: [null],
            tag: "opp"
        },
        user: {
            level: 0,
            status: "none",
            tEffected: 0,
            hp: 0,
            moves: [null],
            spd: 0,
            atk: 0,
            def: 0,
            sAtk: 0,
            sDef: 0,
            tag: "user"
        },
        turns: 0,                           
        prompt: "",
        loading: false,
        move_selection: true,
        statusHandled: false,
        failed: false,
        levelUp: false,
        completed: false
    }, action){

    switch (action.type) {
    // action = {type: 'SET_USER', payload: <user object>}
        case 'SET_USER':
            let figure = action.payload
            if (figure.name == "" || figure.name == null){
                figure.name = "player1"
            }
            return {...state, user: {...state.user, name: figure.name, hp: figure.hp, type: figure.type, level: figure.level, atk: figure.atk, def: figure.def, sDef: figure.sDef, sAtk: figure.sAtk, spd: figure.spd, hp: figure.hp, moves: figure.moves}}

    // action {type: 'START_BATTLE', oppo: <opponent object> user: <user object)}   
        case 'START_BATTLE':
            let opponent = action.oppo
            opponent.status = "none"
            opponent.tEffected = 0
            opponent = {...opponent, created: true, moves: makeOppMoveArray(opponent.moves)}
            return {...state, opp: opponent, loading: false, move_selection: true, tag: "opp"}

    // action {type: 'LOAD_BATTLE'}
        case 'LOAD_BATTLE':
            return {...state, loading: true}       

    // action {type: "PROCESS_USER_MOVE", paylaod: <move object>}
        case 'PROCESS_USER_MOVE':
            return applyingStatusEffectandDamage(state, action.payload, "user")

    // action {type: "PROCESS_OPP_MOVE", paylaod: <move object>}
        case 'PROCESS_OPP_MOVE':
            return applyingStatusEffectandDamage(state, action.payload, "opp")        

    // action {type: 'MOVE_SELECTED}
        case 'MOVE_SELECTED':
            return ({...state, move_selection: false})

    // action {type: 'STATUS_PROCESS}
        case 'STATUS_PROCESS':

            let prompt = ""

            let userStatus = state.user.status
            let userStatusObj = dealWithStatus(state.user)
            let user_tEffected = userStatusObj.new_tEffected
            if (userStatusObj.clear == true){
                userStatus = "none"
                user_tEffected = 0
            }
            if (userStatusObj.prompt != "N/A"){
                prompt = userStatusObj.prompt
            }

            let oppStatus = state.opp.status
            let oppStatusObj = dealWithStatus(state.opp)
            let opp_tEffected = oppStatusObj.new_tEffected
            if (oppStatusObj.clear == true){
                oppStatus = "none"
                opp_tEffected = 0
            }
            if (oppStatusObj.prompt != "N/A"){
                prompt += oppStatusObj.prompt
            }
            return({...state,
                opp: {...state.opp, hp: oppStatusObj.newHp, status: oppStatus, tEffected: opp_tEffected},
                user: {...state.user, hp: userStatusObj.newHp, status: userStatus, tEffected: user_tEffected},
                move_selection: false, statusHandled: true, prompt: prompt
            })


    // action {type: 'TURN_COPLETE}
        case 'TURN_COMPLETE':
            dealWithStatus(state.opp)
            dealWithStatus(state.user)
            return ({...state, move_selection: true, statusHandled: false, prompt: ""})

    // action {type: 'END_BATTLE', victor: <figureObj>}
        case 'END_BATTLE':
            if (action.victor.tag != "user"){
                return({...state, 
                    prompt: "",
                    loading: false,
                    move_selection: true,
                    statusHandled: false,
                    failed: true,
                    levelUp: false,
                    completed: false,
                    levelUp: false
                })
            }
            else{
                return({...state, 
                    prompt: "",
                    loading: false,
                    move_selection: true,
                    statusHandled: false,
                    failed: false,
                    levelUp: false,
                    completed: false,
                    levelUp: true
                })
            }

        // This is mainly a USER STATE action, but we need it to generate a new opponent too
        case('COMPLETE_STAT_UP'):
            return({...state, 
                opp: {...state.opp, created: false},
                levelUp: false,
                completed: false
        })

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
            pendingMoves: [null],
            selectNewMoves: false,
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
            if (figure.name == "" || figure.name == null){
                figure.name = "player1"
            }
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

    // {type: 'COMPLETE_LEVEL_UP', payload: <level_up_state>, moves: <array of moves> }
        case('COMPLETE_STAT_UP'):
            let newState = {...state, 
                level: state.level + 1,
                hp: (state.hp + (parseInt( (state.hp / 6), 10))), 
                spd: (state.spd + (parseInt( (state.spd / 6), 10))), 
                atk: (state.atk + (parseInt( (state.atk / 6), 10)) + action.payload.atkBoost), 
                def: (state.def + (parseInt( (state.def / 6), 10)) + action.payload.defBoost), 
                sAtk: (state.sAtk + (parseInt( (state.sAtk / 6), 10)) + action.payload.sAtkBoost),
                sDef: (state.sDef + (parseInt( (state.sDef / 6), 10)) + action.payload.sDefBoost),  
                loading: false
            }
            if (state.moves.length == 4){

            }
            else{
                let newMove1 = action.moves[0]
                newMove1 = {...newMove1, tillCooldown: 0, cool: newMove1.cooldown, dmg: newMove1.damage_rating }
                if (action.moves.length > 1){
                    let newMove2 = action.moves[1]
                    newMove2 = {...newMove2, tillCooldown: 0, cool: newMove1.cooldown, dmg: newMove1.damage_rating }
                    newState = {...newState, 
                        moves: [newState.moves[0], newState.moves[1], newMove1, newMove2]   
                    }
                }
                else{
                    newState = {...newState, 
                        moves: [newState.moves[0], newState.moves[1], newMove1]   
                    }
                }
            }
            return newState

        default:
            return state
    }
}
