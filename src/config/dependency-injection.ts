import { Container } from "inversify";
import { CharacterFactory } from "../core/character/character-factory";
import { FileLogger } from "../core/logger/file-logger";
import { Logger } from "../core/logger/interfaces/logger";
import { TYPES } from "./types";

const container = new Container();
container.bind<Logger>(TYPES.Logger).to(FileLogger);
container.bind<CharacterFactory>(TYPES.CharacterFactory).to(CharacterFactory);

export default container;
