import movesList from '../../helpers/when_moves_can_be_learned'

export default function confirm(figureObj){
    let moves = [null, null, null, null]
    let name = figureObj.name
    moves = movesList[figureObj.title.tr(" ", "")]
    return (dispatch) => {
        let figure = figureObj
        dispatch({type: 'LOAD_FIGURE'})
        let movesLen = moves.length // Going to be either 2 or 3
        if (movesLen == 2){
            let move1 = null
            let move2 = null
            console.log(moves[0])
            fetch(`http://localhost:3000/moves/${moves[0]}`)   // Generate first move
                .then(resp => {
                    return resp.json()
                })
                .then(json => {
                    return move1 = makeMoveObj(json)
                }) 
                .then( () => fetch(`http://localhost:3000/moves/${moves[1]}`)) 
                    .then(resp => {
                        return resp.json()
                    })
                    .then(json => {
                       return move2 = makeMoveObj(json)
                    })
                    .then( () => {
                        let payloadMoves = [move1, move2]
                        figure.moves = payloadMoves
                        dispatch({type: 'CREATE_USER_FIGURE', payload: figure})
                    })
        }
        else{
            let move1 = null
            let move2 = null
            let move3 = null
            fetch(`http://localhost:3000/moves/${moves[0]}`)   // Generate first move
                .then(resp => {
                    return resp.json()
                })
                .then(json => {
                    return move1 = makeMoveObj(json)
                }) 
                .then( () => fetch(`http://localhost:3000/moves/${moves[1]}`)) 
                    .then(resp => {
                        return resp.json()
                    })
                    .then(json => {
                       return move2 = makeMoveObj(json)
                    })
                    .then( () => fetch(`http://localhost:3000/moves/${moves[2]}`)) 
                        .then(resp => {
                            return resp.json()
                        })
                        .then(json => {
                            return move3 = makeMoveObj(json)
                        })
                            .then( () => {
                                let payloadMoves = [move1, move2, move3]
                                figure.moves = payloadMoves
                                dispatch({type: 'CREATE_USER_FIGURE', payload: figure})
                            })
        }
    }
}