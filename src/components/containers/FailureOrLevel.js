import Failure from '../functional/Failure';
import LevelUp from '../dispatchers/LevelUp';

export const FailureOrLevel = (props) => {
    if (props.user.created === true){
        if (props.battle.failed == true){
          return(
            <div className="FailBox">
              <Failure />
            </div>
          )
        }
        else if (props.battle.levelUp === true){
            return(
            <div className="LevelBox">
                <LevelUp user={props.user}/>
            </div>
            )}
        }
}