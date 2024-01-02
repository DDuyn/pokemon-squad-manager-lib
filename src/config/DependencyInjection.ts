import { Container } from "inversify";
import "reflect-metadata";

import sharedModule from "@shared/index";
import { locationModule } from "../modules/location";
import pokemonModule from "../modules/pokemon";

//TODO: Refactor para modularizar la inyección de dependencias
const container = new Container();

container.load(sharedModule);
container.load(pokemonModule);
container.load(locationModule);

export default container;
