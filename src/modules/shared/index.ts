import { ContainerModule, interfaces } from "inversify";
import { SHARED_DI_TYPES } from "./config/DependencyInjection";
import { FileLogger } from "./services/logger/FileLogger";
import { Logger } from "./services/logger/interfaces/Logger";
import { JsonReader } from "./services/reader/JsonReader";
import { Reader } from "./services/reader/Reader";

const sharedModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Logger>(SHARED_DI_TYPES.Logger).to(FileLogger);
  bind<Reader>(SHARED_DI_TYPES.Reader).to(JsonReader);
});

export default sharedModule;
