import { SupplyType } from "./SupplyType";

export class Recipe {
  private readonly requirements: Record<SupplyType, number>;

  constructor(requirements: Partial<Record<SupplyType, number>> = {}) {
    this.requirements = {
      [SupplyType.CUPS]: requirements[SupplyType.CUPS] ?? 1,
      [SupplyType.ICE]: requirements[SupplyType.ICE] ?? 2,
      [SupplyType.LEMONS]: requirements[SupplyType.LEMONS] ?? 1,
      [SupplyType.SUGAR]: requirements[SupplyType.SUGAR] ?? 1,
    };
  }

  public getRequirement(type: SupplyType): number {
    return this.requirements[type];
  }

  public getAllRequirements(): Readonly<Record<SupplyType, number>> {
    return { ...this.requirements };
  }
}
