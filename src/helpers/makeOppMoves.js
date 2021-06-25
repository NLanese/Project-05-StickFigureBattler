import makeMoveObj from "./makeMoveObj";

export default function makeOppMoveArray(json_moves_array){
    return json_moves_array.map(moveObj => makeMoveObj(moveObj) )
}