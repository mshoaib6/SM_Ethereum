class Simulation {
  readonly staticReward = 2; // 2 ETH
  readonly nephewReward = 1 / 16; // 1/32 of static reward

  protected _alpha = 0;
  protected _gamma = 0;

  protected _publicChainLength = 0;

  protected _poolValidBlocks = 0;
  protected _poolStaleBlocks = 0;

  protected _totalRewards = 0;
  protected _staticRewards = 0;
  protected _uncleRewards = 0;
  protected _nephewRewards = 0;

  protected _uncleRate = 0;
  protected _totalUncles = 0;
  protected _referencedUncles = 0;
  protected _uncles: number[] = [];

  protected _totalNephews = 0;

  protected _revenueRatio = 0;
  protected _apparentHashRate = 0;

  constructor(alpha: number, gamma: number, uncleRate: number) {
    this._alpha = alpha;
    this._gamma = gamma;
    this._uncleRate = uncleRate;
  }

  get publicChainLength(): number {
    return this._publicChainLength;
  }

  get poolValidBlocks(): number {
    return this._poolValidBlocks;
  }

  get poolStaleBlocks(): number {
    return this._poolStaleBlocks;
  }

  get totalRewards(): number {
    return this._totalRewards;
  }

  get staticRewards(): number {
    return this._staticRewards;
  }

  get uncleRewards(): number {
    return this._uncleRewards;
  }

  get nephewRewards(): number {
    return this._nephewRewards;
  }

  get totalUncles(): number {
    return this._totalUncles;
  }

  get uncles(): number[] {
    return this._uncles;
  }

  get totalNephews(): number {
    return this._totalNephews;
  }

  get revenueRatio(): number {
    return this._revenueRatio;
  }

  get apparentHashRate(): number {
    return this._apparentHashRate;
  }

  protected calculateAllRatios() {
    this._revenueRatio = this.calculateRevenueRatio();
    this._apparentHashRate = this.calculateApparentHashRate();
  }

  private calculateApparentHashRate(): number {
    return +(this._poolValidBlocks / this._publicChainLength).toPrecision(4);
  }

  private calculateRevenueRatio(): number {
    return +(
      (this._poolValidBlocks + 2 * this._uncles.length) /
      (this._publicChainLength + this._totalUncles)
    ).toPrecision(2);
  }

  private calculateTotalUncleRewards(): number {
    return this._uncles.reduce((a, b) => a + b, 0);
  }

  protected calculateAllRewards() {
    this._staticRewards = this.staticReward * this._poolValidBlocks;
    this._uncleRewards = this.calculateTotalUncleRewards();
    this._nephewRewards = this.nephewReward * this._totalNephews;
    this._totalRewards = this._staticRewards + this._uncleRewards + this._nephewRewards;
  }

  protected calculateUncleReward(distance: number): number {
    return distance >= 1 && distance <= 6 ? (this.staticReward * (8 - distance)) / 8 : 0;
  }
}

export { Simulation };
