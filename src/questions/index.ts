import { shuffle } from "lodash";
import { booksAndLiterature } from "./booksAndLiterature";
import { creativityAndImagination } from "./creativityAndImagination";
import { dreamsAndAspirations } from "./dreamsAndAspirations";
import { favouritesAndPreferences } from "./favouritesAndPreferences";
import { foodAndCooking } from "./foodAndCooking";
import { historyAndTimeTravel } from "./historyAndTimeTravel";
import { hobbiesAndLeisure } from "./hobbiesAndLeisure";
import { lifePhilosophy } from "./lifePhilosophy";
import { moviesAndTv } from "./moviesAndTv";
import { musicAndArt } from "./musicAndArt";
import { personalGrowth } from "./personalGrowth";
import { relationships } from "./relationships";
import { scienceAndTechnology } from "./scienceAndTechnology";
import { technologyAndTheFuture } from "./technologyAndTheFuture";
import { travelAndAdventure } from "./travelAndAdventure";
import { videoGames } from "./videoGames";

const allQuestions = [
    ...historyAndTimeTravel,
    ...foodAndCooking,
    ...hobbiesAndLeisure,
    ...musicAndArt,
    ...booksAndLiterature,
    ...scienceAndTechnology,
    ...videoGames,
    ...moviesAndTv,
    ...creativityAndImagination,
    ...favouritesAndPreferences,
    ...travelAndAdventure,
    ...technologyAndTheFuture,
    ...personalGrowth,
    ...dreamsAndAspirations,
    ...relationships,
    ...lifePhilosophy
];

export const questions = shuffle(allQuestions);