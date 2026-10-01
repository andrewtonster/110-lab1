import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export class InputHandler {
  private readonly rl: Awaited<ReturnType<typeof createInterface>>;

  constructor() {
    this.rl = createInterface({
      input,
      output,
    });
  }

  public async askInteger(
    prompt: string,
    minimum: number = 0,
  ): Promise<number> {
    while (true) {
      const answer = await this.rl.question(prompt);
      const parsed = Number(answer.trim());

      if (Number.isInteger(parsed) && parsed >= minimum) {
        return parsed;
      }

      console.log(
        `Please enter a whole number greater than or equal to ${minimum}.`,
      );
    }
  }

  public async askYesNo(prompt: string): Promise<boolean> {
    while (true) {
      const answer = await this.rl.question(prompt);
      const normalized = answer.trim().toLowerCase();

      if (normalized === "y" || normalized === "yes") {
        return true;
      }

      if (normalized === "n" || normalized === "no") {
        return false;
      }

      console.log("Please answer yes or no.");
    }
  }

  public close(): void {
    this.rl.close();
  }
}
