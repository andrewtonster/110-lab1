import { Weather } from "./Weather";

export class DemandCalculator {
  public calculateDemand(weather: Weather): number {
    switch (weather) {
      case Weather.COOL:
        return 12;
      case Weather.MILD:
        return 22;
      case Weather.HOT:
        return 32;
      case Weather.VERY_HOT:
        return 42;
      default:
        return 0;
    }
  }
}
