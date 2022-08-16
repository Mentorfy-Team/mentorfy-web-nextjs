
export class AppUtil {

  private static callbacks: Array<Function> = [ ];

  public static isClientSide() {
    return typeof window !== 'undefined';
  }

  public static onLoad(callback: Function) {
    if(!this.isClientSide()) return;
    this.callbacks.push(callback);
    window.onload = () => {
      this.callbacks.forEach(c => c());
    };
  }

}
