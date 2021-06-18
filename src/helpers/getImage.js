export default function getImage(props){
//  THE PROPS WILL BE AN ENTIRE FIGURE OBJECT
    let figure = ""
    switch(props.name){
        case("Knight"):
            figure = require('../images/Knight.jpg')
            return(figure)
        case("Mad Scientist"):
            figure = require('../images/MadScientist.jpg')
            return(figure)
        case("Martian"):
            figure = require('../images/Martian.jpg')
            return(figure)
        case("Pirate"):
            figure = require('../images/PirateGuy.jpg')
            return(figure)
        case("Robot"):
            figure = require('../images/Robot.jpg')
            return(figure)
        case("Secret Service"):
            figure = require('../images/SecretServiceGuy.jpg')
            return(figure)
        case("Superhero"):
            figure = require('../images/SuperHero.jpg')
            return(figure)
        case("DarkFigure"):
            figure = require('../images/DarkFigure.jpg')
            return(figure)
    default:
        return "Image not found"
    }
}