import { SupplyPrices } from "./SupplyPrices";
import { Weather } from "./Weather";

export class Day {
  public readonly dayNumber: number;
  public readonly weather: Weather;
  public readonly supplyPrices: SupplyPrices;

  constructor(dayNumber: number, weather: Weather, supplyPrices: SupplyPrices) {
    this.dayNumber = dayNumber;
    this.weather = weather;
    this.supplyPrices = supplyPrices;
  }
}
