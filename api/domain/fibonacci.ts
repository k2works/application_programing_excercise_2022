export class Fibonacci {
  calc(number: number): number {
    if (number === 0) return 0;
    if (number === 1) return 1;
    return this.calc(number - 1) + this.calc(number - 2);
  }
}
