import LifeCircle from "./LifeCircle";
import GlobalQueue from "./GlobalQueue";
import deepCompare from "./utils/deepCompare";

export default class Component {
    constructor(element, callback, store, deepCompare) {
        this.element = element;
        this.lifeCircle = new LifeCircle(null, element);
        this.callback = callback;
        this.store = { ...store };
        this.deepCompare = deepCompare;
        this.init();
    }

    init() {
        this.triggerChange(false);
        this.lifeCircle.onStateChange(() => {
            this.triggerChange(false);
        });
        this.lifeCircle.onPropsChange(() => {
            this.triggerChange(false);
        });
    }

    triggerChange(isNext = false) {
        GlobalQueue.call(() => {
            GlobalQueue.resetId();
            GlobalQueue.component = this;

            const [state, methods] = this.callback.call(this.element, this.element.props);
            // setup state
            const stateChanged = {};
            for (const key in state) {
                if (this.element.data[key] !== state[key]) stateChanged[key] = state[key];
            }
            if (Object.keys(stateChanged).length > 0) {
                this.element.setData(stateChanged);
            }
            // setup methods
            const methodsChanged = {};
            for (const key in methods) {
                if (this.element[key] !== methods[key]) methodsChanged[key] = methods[key];
            }
            if (Object.keys(methodsChanged).length > 0) {
                this.lifeCircle.setMethods(methodsChanged);
                this.triggerChange(true);
            }
        }, isNext);
    }
}
