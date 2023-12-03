import { Character } from "./character/character";
import { writeToLog } from "./logger";

console.log("hello");

const iterations = 4;

for (const _ of Array(iterations)) {
  Character.generateCharacter();
}

const logData = {
  level: "info",
  message: "Este es un mensaje de información",
  timestamp: new Date().toISOString(),
};

writeToLog(logData);
