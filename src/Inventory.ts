import { Recipe } from "./Recipe";
import { SupplyType } from "./SupplyType";

export class Inventory {
  private readonly quantities: Record<SupplyType, number>;

  constructor(initialQuantities: Partial<Record<SupplyType, number>> = {}) {
    this.quantities = {
      [SupplyType.CUPS]: initialQuantities[SupplyType.CUPS] ?? 0,
      [SupplyType.ICE]: initialQuantities[SupplyType.ICE] ?? 0,
      [SupplyType.LEMONS]: initialQuantities[SupplyType.LEMONS] ?? 0,
      [SupplyType.SUGAR]: initialQuantities[SupplyType.SUGAR] ?? 0,
    };
  }

  public add(type: SupplyType, quantity: number): void {
    this.validateNonNegativeQuantity(
      quantity,
      `Cannot add a negative quantity of ${type}.`,
    );
    this.quantities[type] += quantity;
  }

  public remove(type: SupplyType, quantity: number): void {
    this.validateNonNegativeQuantity(
      quantity,
      `Cannot remove a negative quantity of ${type}.`,
    );

    if (!this.hasAtLeast(type, quantity)) {
      throw new Error(
        `Not enough ${type.toLowerCase()} available. Requested ${quantity}, available ${this.quantities[type]}.`,
      );
    }

    this.quantities[type] -= quantity;
  }

  public hasAtLeast(type: SupplyType, quantity: number): boolean {
    this.validateNonNegativeQuantity(
      quantity,
      `Quantity cannot be negative for ${type}.`,
    );
    return this.quantities[type] >= quantity;
  }

  public getAmount(type: SupplyType): number {
    return this.quantities[type];
  }

  public getAll(): Readonly<Record<SupplyType, number>> {
    return { ...this.quantities };
  }

  public getMaxCupsForRecipe(recipe: Recipe): number {
    let maxPossibleCups = Number.POSITIVE_INFINITY;

    for (const type of Object.values(SupplyType)) {
      const requiredPerCup = recipe.getRequirement(type);
      if (requiredPerCup <= 0) {
        continue;
      }

      const possibleCups = Math.floor(this.quantities[type] / requiredPerCup);
      maxPossibleCups = Math.min(maxPossibleCups, possibleCups);
    }

    return Number.isFinite(maxPossibleCups) ? maxPossibleCups : 0;
  }

  private validateNonNegativeQuantity(quantity: number, message: string): void {
    if (!Number.isFinite(quantity) || quantity < 0) {
      throw new Error(message);
    }
  }
}
