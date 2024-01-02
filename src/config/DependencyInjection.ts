import { Container } from "inversify";
import "reflect-metadata";

import sharedModule from "@shared/index";
import { locationModule } from "../modules/location";
import pokemonModule from "../modules/pokemon";

const container = new Container();

container.load(sharedModule);
container.load(pokemonModule);
container.load(locationModule);

export default container;
