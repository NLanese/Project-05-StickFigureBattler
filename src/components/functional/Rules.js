import React from 'react';

const Rules = () => {
    return(
        <div>
            <h1>Welcome To Stick Figure Combat!</h1>
            <h2>This is a turn based combat system</h2>
            <p>
                This means that you will have a selection of up to 
                4 moves, and upon selecting a move, your opponent will 
                also have a move selected. DEPENDING ON WHO HAS A HIGHER SPD RATING,
                one figure will go first. 
            </p>
            <p>
                Each move will have a TYPE, ACCuracy, and POWER. Higher accuracy (max of 100)
                will have higher odds of hitting the opponent. Depending on the attack's 
                DAMAGE TYPE, that attack's POWER will be combined with the attacker's ATTACK or
                SPECIAL ATTACK and the opponent's DEFENSE or SPECIAL DEFENSE to determine damage done.
                The Battle will go until someone's Healh is 0 or less
            </p>
            <h2>Some Moves have special effects!</h2>
            <p>
                Some moves will have special effects. These can vary-- some moves will let you 
                move first, some others will lower an opponent's accuracy or even leave them with 
                an effect that will damage them every turn!
            </p>
            <h2>Level up after battles!</h2>
            <p>
                After a battle, each figure will gain stat points. You can also assign bonus increase
                points to your liking.s
            </p>
        </div>
    )
}

export default Rules