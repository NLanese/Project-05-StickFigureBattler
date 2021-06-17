const rootReducer = combineReducers({
    battle: manageBattle,
    user: manageUser,
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
    action,
    state=
        {
            user ={
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
                moves: [null]                   // Sets an empty array for the moves and setting that up is gonna suck so I'm avoinding it
            },
            opp ={
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
            current_battler: null
        }
){
    switch (action.type) {
        case 'NEW_BATTLE':
        // FETCH NEW BATTLE JSON
        return { ...state, bands: [...state.bands, band] }
        case 'CHANGE_USER_HP':
            // action = {type: "CHANGE_USER_HP" payload: {Number generated in Event Listener inside of Moves} }
            return {...state, user: {...state.user, hp: state.user.hp + action.paylod} }
        case 'CHANGE_OPP_HP':
            // action = {type: "CHANGE_USER_HP" payload: {Number generated in Event Listener inside of Moves} }
            return {...state, opp: {...state.opp, hp: state.opp.hp + action.paylod} }
        case 'COMPLETE_BATTLE':
            // CHANGE PROMPT, RESET USER HP, LEVEL UP
        default:
        return state;
    }
};

function manageUser(
    action, 
    state= 
        {
            name: null,
            level: 1,
            class: null,
            movesList: [],
            hp: null
        }
){
    switch(action.type){
        case 'CREATE_USER':
        return { 
            name: action.name,
            level: 1,
            class: action.class,
            movesList: action.movesList,
            hp: action.health
        }
    }
}