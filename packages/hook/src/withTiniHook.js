import LifeCircle from './LifeCircle';
import Component from './Component';
import GlobalQueue from './GlobalQueue';

class WithTiniHook {
  constructor(callback, options = {}, deepCompare) {
    this.store = {};
    this.lifeCircle = new LifeCircle(options);
    this.options = options;
    this.callback = callback;
    this.deepCompare = deepCompare;
    this.init();
  }
  init() {
    GlobalQueue.call(() => {
      GlobalQueue.resetId();
      GlobalQueue.component = this;

      const [state, methods] = this.callback.call(
        { props: this.options.props },
        this.options.props,
      );
      this.lifeCircle.setData(state);
      this.lifeCircle.setMethods(methods);

      const that = this;
      this.lifeCircle.onDidMount(function () {
        new Component(this, that.callback, { ...that.store }, that.deepCompare);
      });
    });
  }
  getOptions() {
    return this.lifeCircle.options;
  }
}

/**
 *
 * @param {() => [Record<string, any>, Record<string, Function>]} callback
 * @param {boolean || (prevState, nextState, prevMethods, nextMethod) => boolean} deepCompare return equal
 * @returns
 */
function withTiniHook(callback, deepCompare = false) {
  return function (options = {}) {
    return new WithTiniHook(callback, options, deepCompare).getOptions();
  };
}

export default withTiniHook;
