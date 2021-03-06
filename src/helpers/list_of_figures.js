import base_stats from "./starting_stats_for_each_class"
import getImage from "./getImage"

const imageObject = (figure) =>  {return {image: figure}}
let knightStats = base_stats.knight
let scientistStats = base_stats.madScientist
let martianStats = base_stats.martian
let pirateStats = base_stats.pirateGuy
let robotStats = base_stats.robot
let secretStats = base_stats.secretService
const figures = {
    knight: {
        name: "Knight",
        bio: "A slow but otherwise well balanced Stick figure. The Knight has good all-round stats but a very limited selection of moves",
        class_type: "weaponry",
        stats: knightStats,
        image: getImage(imageObject("Knight")),
        moves: [null, null, null, null]
    },
    madScientist: {
        name: "Mad Scientist",
        bio: "With somewhat weak physical stats and fairly strong special stats, the Scientist also uses his knowledge and gadgetry to compile a wide variety of status-enducing moves",
        class_type: "tech",
        stats: scientistStats,
        image: getImage(imageObject("Mad Scientist")),
        moves: [null, null, null, null]
    },
    martian: {
        name: "Martian",
        bio: "A devastating special attacker with a lot of healing moves, the Martian needs to heal and protect to cover up its low defense",
        class_type: "supernatural, tech",
        stats: martianStats,
        image: getImage(imageObject("Martian")),
        moves: [null, null, null, null]
    },
    pirateGuy: {
        name: "Pirate",
        bio: "A well-balanced attacker with low defense both special and phsyical, the pirate has a variety of devatating attacks to end battles early",
        class_type: "weaponry, stealth",
        stats: pirateStats,
        image: getImage(imageObject("Pirate")),
        moves: [null, null, null, null]
    },
    robot: {
        name: "Robot",
        bio: "A high-defense low attack unit with a wide variety of both damaging and status effecting moves",
        class_type: "tech, weaponry",
        stats: robotStats,
        image: getImage(imageObject("Robot")),
        moves: [null, null, null, null]
    },
    secretService: {
        name: "SecretService",
        bio: "The most balanced Stick Figure of all, the Secret Service guy has no true weakness, but no great strength. His moves are well balanced as well",
        class_type: "weaponry, athletics",
        stats: secretStats,
        image: getImage(imageObject("Secret Service")),
        moves: [null, null, null, null]
    }
}

export default figures