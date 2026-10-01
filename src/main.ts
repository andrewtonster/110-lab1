import { Display } from "./Display";
import { Game } from "./Game";
import { InputHandler } from "./InputHandler";
import { LemonadeStand } from "./LemonadeStand";

async function main(): Promise<void> {
  const stand = new LemonadeStand(30);
  const inputHandler = new InputHandler();
  const display = new Display();
  const game = new Game(inputHandler, display, stand);

  await game.run();
}

main().catch((error: unknown) => {
  console.error("Game crashed:", error);
  process.exit(1);
});
