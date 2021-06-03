export default class LifeCircle {
  constructor(options, element = null) {
    this.options = options;
    this.element = element;
  }

  setData(value) {
    if (!this.element) {
      this.options.data = { ...this.options.data, ...value };
    } else {
      this.element.setData({ value });
    }
  }

  onStateChange(callback) {
    if (!this.element) return;
    const setData = this.element.setData;
    this.element.setData = (state) => {
      setData(state);
      callback.call(this);
    };
  }

  onPropsChange(callback) {
    const element = this.element || this.options;
    const deriveDataFromProps = element.deriveDataFromProps;
    element.deriveDataFromProps = function (nextProps) {
      deriveDataFromProps && deriveDataFromProps(nextProps);
      callback.call(this);
    };
  }

  setMethod(name, method) {
    if (typeof name !== 'string' && typeof method !== 'function') {
      throw new Error(`Method name is not string or method value is not function!`);
    }
    const element = this.element || this.options;
    element.methods = element.methods || {};
    element[name] = method;
    if (name.startsWith('on')) element.methods[name] = element[name];
  }

  setMethods(methods) {
    for (const name in methods) {
      this.setMethod(name, methods[name]);
    }
  }

  onDidMount(callback) {
    const element = this.element || this.options;
    const _onInit = element.onInit;
    element.onInit = function (...args) {
      _onInit && _onInit.call(this, ...args);
      callback.call(this);
    };

    const _onLoad = element.onLoad;
    element.onLoad = function (...args) {
      _onLoad && _onLoad.call(this, ...args);
      callback.call(this);
    };
  }

  onWillUnmount(callback) {
    const element = this.element || this.options;
    const _didUnmount = element.didUnmount;
    element.didUnmount = function (...args) {
      _didUnmount && _didUnmount(...args);
      callback.call(this);
    };

    const _onUnload = element.onUnload;
    element.onUnload = function (...args) {
      _onUnload && _onUnload(...args);
      callback.call(this);
    };
  }
}
