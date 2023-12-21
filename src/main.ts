import "reflect-metadata";

import * as readline from "readline";
import { CapturePokemon } from "./features/CapturePokemon";
import { GetWildPokemon } from "./features/GetWildPokemon";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const catchService = new CapturePokemon();
const e = new GetWildPokemon();

async function main() {
  let keepGoing = true;
  const askAndCatchPokemon = async () => {
    try {
      const location = await askQuestion("Introduce la localización: ");
      const route = await askQuestion("Introduce la ruta: ");

      const c = await e.execute(location, route);
      const cp = {
        ...c,
        ...{ currentHealth: 2, status: "none" },
        isWild: true,
      };
      const result = (await catchService.execute(cp))
        ? `${c.basic.name} captured`
        : `${c.basic.name} escaped`;
      console.log(c);
      console.log(result);
      const answer = await askQuestion(
        "¿Quieres capturar otro Pokémon? (s/n): "
      );
      if (answer.toLowerCase() !== "s") {
        keepGoing = false;
        rl.close();
        process.exit(0);
      } else {
        await askAndCatchPokemon();
      }
    } catch (error) {
      console.error(`Se produjo un error: ${error}`);
      rl.close();
      process.exit(1);
    }
  };
  if (keepGoing) {
    await askAndCatchPokemon();
  }
}

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

main();
