import { SupplyType } from "./SupplyType";

export class SupplyPrices {
  private readonly prices: Record<SupplyType, number>;

  constructor(prices: Partial<Record<SupplyType, number>> = {}) {
    this.prices = {
      [SupplyType.CUPS]: prices[SupplyType.CUPS] ?? 0.5,
      [SupplyType.ICE]: prices[SupplyType.ICE] ?? 0.25,
      [SupplyType.LEMONS]: prices[SupplyType.LEMONS] ?? 0.75,
      [SupplyType.SUGAR]: prices[SupplyType.SUGAR] ?? 0.5,
    };
  }

  public getPrice(type: SupplyType): number {
    return this.prices[type];
  }

  public getAll(): Readonly<Record<SupplyType, number>> {
    return { ...this.prices };
  }
}
