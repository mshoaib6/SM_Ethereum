import { Simulation } from './simulation';

class HonestMining extends Simulation {
  private blocksToMine = 0;

  constructor(blocksToMine: number, alpha: number, gamma: number, uncleRate: number) {
    super(alpha, gamma, uncleRate);
    this.blocksToMine = blocksToMine;
  }

  simulate() {
    while (this._publicChainLength < this.blocksToMine) {
      this._publicChainLength++;

      // uncle rate is around 6.7% - https://hedgetrade.com/what-is-ethereums-uncle-rate/
      const newUncle = Math.random() < this._uncleRate;
      if (newUncle) {
        this._totalUncles++;
        // for simplicity
        const distance = 1 + (Math.floor(10 * Math.random()) % 6);
        const uncleReward = this.calculateUncleReward(distance);

        // for simplicity
        const isPoolUncle = Math.random() < 0.2;
        if (isPoolUncle) {
          this._uncles.push(uncleReward);
          this._totalNephews++;
        }
      }

      const minePoolBlock = Math.random();
      if (minePoolBlock < this._alpha) {
        this._poolValidBlocks++;
      }
    }

    this.calculateAllRatios();
    this.calculateAllRewards();
  }
}

export { HonestMining };
