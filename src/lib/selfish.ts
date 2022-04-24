import { Simulation } from './simulation';

class SelfishMining extends Simulation {
  private _cycles = 0;
  private _currentCycle = 0;

  private _selfishChainLength = 0;

  private _honestChainlength = 0;
  private _honestValidBlocks = 0;
  private _honestStaleBlocks = 0;

  constructor(cycles: number, alpha: number, gamma: number, uncleRate: number) {
    super(alpha, gamma, uncleRate);
    this._cycles = cycles;
  }

  simulate() {
    while (this._currentCycle < this._cycles) {
      const isSelfish = Math.random() < this._alpha;

      if (isSelfish) {
        this._selfishChainLength++;
      } else {
        this.mineOnPublicChain(this._uncleRate);
      }
    }

    this._publicChainLength = this._honestValidBlocks + this._poolValidBlocks;
    this.calculateAllRatios();
    this.calculateAllRewards();
  }

  private referenceUncle(isSelfish: boolean) {
    if (this._referencedUncles < this._totalUncles) {
      this._referencedUncles++;
      // for simplicity
      const distance = 1 + (Math.floor(10 * Math.random()) % 6);
      const uncleReward = this.calculateUncleReward(distance);
      if (isSelfish) {
        this._uncles.push(uncleReward);
        this._totalNephews++;
      }
    }
  }

  private mineOnPublicChain(uncleRate: number) {
    this._honestChainlength++;

    // uncle rate is around 6.7% - https://hedgetrade.com/what-is-ethereums-uncle-rate/
    const randUncle = Math.random();
    if (randUncle < uncleRate) {
      this._totalUncles++;
    }

    const delta = this._selfishChainLength - this._honestChainlength;

    if (delta < 0) {
      // selfish pool adopts honest chain
      this._honestValidBlocks++;
      this._selfishChainLength = 0;
      this._honestChainlength = 0;
      this.referenceUncle(false);
    } else if (delta === 0) {
      // publish selfish chain
      this._currentCycle++;

      const rand = Math.random();

      const ratioMiningSelfishBlock = this._alpha + this._gamma * (1 - this._alpha);
      if (rand < ratioMiningSelfishBlock) {
        this._poolValidBlocks++;
        this._honestStaleBlocks++;
        this.referenceUncle(true);
      } else {
        this._honestValidBlocks++;
        this._poolStaleBlocks++;
        this.referenceUncle(false);
      }

      this._selfishChainLength = 0;
      this._honestChainlength = 0;
    } else if (delta === 1) {
      // publish selfish block
      this._poolValidBlocks++;
      this._selfishChainLength = 0;
      this._honestStaleBlocks += this._honestChainlength;
      this._honestChainlength = 0;
      this._currentCycle++;
      this.referenceUncle(true);
    } else if (delta >= 2) {
      // publish last selfish block
      this._selfishChainLength--;
      this._poolValidBlocks++;
      this.referenceUncle(true);
    }
  }
}

export { SelfishMining };
