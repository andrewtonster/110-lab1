import { Day } from "./Day";
import { SupplyPrices } from "./SupplyPrices";
import { SupplyType } from "./SupplyType";
import { Weather } from "./Weather";

export class Display {
  public showWelcome(): void {
    console.log("========================================");
    console.log("Lemonade Stand Simulation");
    console.log("========================================");
  }

  public showDayStart(day: Day): void {
    console.log(`\n--- Day ${day.dayNumber} ---`);
    console.log(`Weather: ${this.formatWeather(day.weather)}`);
    this.showSupplyPrices(day.supplyPrices);
  }

  public showSupplyPrices(prices: SupplyPrices): void {
    console.log("Supply prices:");
    console.log(`  Cups: $${prices.getPrice(SupplyType.CUPS).toFixed(2)}`);
    console.log(`  Ice: $${prices.getPrice(SupplyType.ICE).toFixed(2)}`);
    console.log(`  Lemons: $${prices.getPrice(SupplyType.LEMONS).toFixed(2)}`);
    console.log(`  Sugar: $${prices.getPrice(SupplyType.SUGAR).toFixed(2)}`);
  }

  public showPurchasePrompt(type: SupplyType): string {
    const label = this.formatSupplyName(type);
    return `How many ${label} would you like to buy? `;
  }

  public showPurchaseSummary(totalCost: number): void {
    console.log(`Total purchase cost: $${totalCost.toFixed(2)}`);
  }

  public showDayResults(
    cupsSold: number,
    remainingInventory: Record<SupplyType, number>,
    cash: number,
  ): void {
    console.log("\nEnd of day summary:");
    console.log(`  Cups sold: ${cupsSold}`);
    console.log(`  Remaining cups: ${remainingInventory[SupplyType.CUPS]}`);
    console.log(`  Remaining ice: ${remainingInventory[SupplyType.ICE]}`);
    console.log(`  Remaining lemons: ${remainingInventory[SupplyType.LEMONS]}`);
    console.log(`  Remaining sugar: ${remainingInventory[SupplyType.SUGAR]}`);
    console.log(`  Cash balance: $${cash.toFixed(2)}`);
  }

  public showError(message: string): void {
    console.log(`Error: ${message}`);
  }

  public showGoodbye(): void {
    console.log("\nThanks for running the stand. See you next summer!");
  }

  private formatWeather(weather: Weather): string {
    const labels: Record<Weather, string> = {
      [Weather.COOL]: "Cool",
      [Weather.MILD]: "Mild",
      [Weather.HOT]: "Hot",
      [Weather.VERY_HOT]: "Very Hot",
    };

    return labels[weather];
  }

  private formatSupplyName(type: SupplyType): string {
    const names: Record<SupplyType, string> = {
      [SupplyType.CUPS]: "cups",
      [SupplyType.ICE]: "ice",
      [SupplyType.LEMONS]: "lemons",
      [SupplyType.SUGAR]: "sugar",
    };

    return names[type];
  }
}
