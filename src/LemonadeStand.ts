import { DemandCalculator } from "./DemandCalculator";
import { Inventory } from "./Inventory";
import { Recipe } from "./Recipe";
import { SupplyPrices } from "./SupplyPrices";
import { SupplyType } from "./SupplyType";
import { Weather } from "./Weather";

export class LemonadeStand {
  private readonly inventory: Inventory;
  public readonly recipe: Recipe;
  private readonly demandCalculator: DemandCalculator;
  private cash: number;

  constructor(startingCash: number = 30, recipe: Recipe = new Recipe()) {
    this.cash = startingCash;
    this.inventory = new Inventory();
    this.recipe = recipe;
    this.demandCalculator = new DemandCalculator();
  }

  public getCash(): number {
    return this.cash;
  }

  public getInventory(): Inventory {
    return this.inventory;
  }

  public buySupplies(
    purchases: Partial<Record<SupplyType, number>>,
    prices: SupplyPrices,
  ): number {
    let totalCost = 0;

    for (const type of Object.values(SupplyType)) {
      const quantity = purchases[type] ?? 0;

      if (!Number.isInteger(quantity) || quantity < 0) {
        throw new Error(`Invalid purchase quantity for ${type.toLowerCase()}.`);
      }

      const cost = quantity * prices.getPrice(type);
      totalCost += cost;
    }

    if (totalCost > this.cash) {
      throw new Error("You cannot afford those supplies.");
    }

    for (const type of Object.values(SupplyType)) {
      const quantity = purchases[type] ?? 0;
      if (quantity > 0) {
        this.inventory.add(type, quantity);
      }
    }

    this.cash -= totalCost;
    return totalCost;
  }

  public determineSalesPotential(weather: Weather): number {
    const demand = this.demandCalculator.calculateDemand(weather);
    const inventoryLimit = this.inventory.getMaxCupsForRecipe(this.recipe);
    return Math.min(demand, inventoryLimit);
  }

  public sellLemonade(cupsToSell: number): number {
    const safeCupCount = Math.max(0, Math.floor(cupsToSell));
    const inventoryLimit = this.inventory.getMaxCupsForRecipe(this.recipe);
    const actualCupsSold = Math.min(safeCupCount, inventoryLimit);

    if (actualCupsSold <= 0) {
      return 0;
    }

    for (const type of Object.values(SupplyType)) {
      const requiredPerCup = this.recipe.getRequirement(type);
      const totalNeeded = actualCupsSold * requiredPerCup;
      this.inventory.remove(type, totalNeeded);
    }

    this.cash += actualCupsSold * 1.0;
    return actualCupsSold;
  }

  public sellForDay(weather: Weather): {
    demand: number;
    inventoryLimit: number;
    cupsSold: number;
  } {
    const demand = this.demandCalculator.calculateDemand(weather);
    const inventoryLimit = this.inventory.getMaxCupsForRecipe(this.recipe);
    const cupsToSell = Math.min(demand, inventoryLimit);
    const cupsSold = this.sellLemonade(cupsToSell);

    return {
      demand,
      inventoryLimit,
      cupsSold,
    };
  }

  public getState(): Record<string, number | Record<SupplyType, number>> {
    return {
      cash: this.cash,
      inventory: this.inventory.getAll(),
    };
  }
}
