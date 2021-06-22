import knight from '../images/Knight.jpg'
import scientist from '../images/MadScientist.jpg'
import martian from '../images/Martian.jpg'
import pirate from '../images/PirateGuy.jpg'
import robot from '../images/Robot.jpg'
import secretSer from '../images/SecretServiceGuy.jpg'
import superhero from '../images/SuperHero.jpg'
import dark from '../images/DarkFigure.jpg'

export default function getImage(name){
//  THE PROPS WILL BE AN ENTIRE FIGURE OBJECT
    switch(name){
        case("Knight"):
            return(< img src={knight} />)
        case("Mad Scientist"):
            return(< img src={scientist} />)
        case("Martian"):
            return(< img src={martian} />)
        case("Pirate"):
            return(< img src={pirate} />)
        case("Robot"):
            return(< img src={robot} />)
        case("SecretService"):
            return(< img src={secretSer} />)
        case("Superhero"):
            return(< img src={superhero} />)
        case("DarkFigure"):
            return(< img src={dark} />)
        default:
            return "Image not found"
    }
}