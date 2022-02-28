export class MathUtils {

  public static roundDown(number: number, precision: number) {
    let returnValue = 0;
    if (precision < 0) {
      let factor = Math.pow(10, precision);
      returnValue = Math.floor(number * factor) / factor;
    }
    else
      returnValue = +(Math.floor(Number(number + "e+" + precision)) +
        "e-" + precision);
    return Number.isNaN(returnValue) ? 0 : returnValue;
  }
}
