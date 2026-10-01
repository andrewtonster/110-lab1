import { Day } from "./Day";
import { Display } from "./Display";
import { InputHandler } from "./InputHandler";
import { LemonadeStand } from "./LemonadeStand";
import { SupplyPrices } from "./SupplyPrices";
import { SUPPLY_TYPES, SupplyType } from "./SupplyType";
import { WEATHER_VALUES } from "./Weather";

export class Game {
  private readonly stand: LemonadeStand;
  private readonly inputHandler: InputHandler;
  private readonly display: Display;

  constructor(
    inputHandler: InputHandler,
    display: Display,
    stand: LemonadeStand,
  ) {
    this.inputHandler = inputHandler;
    this.display = display;
    this.stand = stand;
  }

  public async run(): Promise<void> {
    this.display.showWelcome();

    let dayNumber = 1;

    while (true) {
      const day = this.createDay(dayNumber);
      this.display.showDayStart(day);

      const purchases = await this.promptForPurchases();

      try {
        const totalCost = this.stand.buySupplies(purchases, day.supplyPrices);
        this.display.showPurchaseSummary(totalCost);
      } catch (error) {
        while (true) {
          this.display.showError((error as Error).message);
          const retryPurchases = await this.promptForPurchases();

          try {
            const retryCost = this.stand.buySupplies(
              retryPurchases,
              day.supplyPrices,
            );
            this.display.showPurchaseSummary(retryCost);
            break;
          } catch (retryError) {
            error = retryError as Error;
          }
        }
      }

      const result = this.stand.sellForDay(day.weather);
      const inventory = this.stand.getInventory().getAll();
      const cash = this.stand.getCash();

      this.display.showDayResults(result.cupsSold, inventory, cash);

      const shouldContinue = await this.inputHandler.askYesNo(
        "Would you like to play another day? (y/n): ",
      );
      if (!shouldContinue) {
        break;
      }

      dayNumber += 1;
    }

    this.display.showGoodbye();
    this.inputHandler.close();
  }

  private async promptForPurchases(): Promise<
    Partial<Record<SupplyType, number>>
  > {
    const purchases: Partial<Record<SupplyType, number>> = {};

    for (const type of SUPPLY_TYPES) {
      const quantity = await this.inputHandler.askInteger(
        this.display.showPurchasePrompt(type),
        0,
      );
      purchases[type] = quantity;
    }

    return purchases;
  }

  private createDay(dayNumber: number): Day {
    const dayWeather =
      WEATHER_VALUES[Math.floor(Math.random() * WEATHER_VALUES.length)];

    const priceMultiplier = 0.75 + Math.random() * 0.75;
    const supplyPrices = new SupplyPrices({
      [SupplyType.CUPS]: Number((0.55 * priceMultiplier).toFixed(2)),
      [SupplyType.ICE]: Number((0.3 * priceMultiplier).toFixed(2)),
      [SupplyType.LEMONS]: Number((0.8 * priceMultiplier).toFixed(2)),
      [SupplyType.SUGAR]: Number((0.6 * priceMultiplier).toFixed(2)),
    });

    return new Day(dayNumber, dayWeather, supplyPrices);
  }
}
