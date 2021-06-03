const GlobalQueue = {
  component: null,
  id: 0,
  getNextId() {
    return ++this.id;
  },
  resetId() {
    this.id = 0;
  },

  methods: [],
  block: false,
  call(method, next = false) {
    if (!next) this.methods.push(method);
    else this.methods = [method, ...this.methods];
    this.next();
  },
  next() {
    if (this.block || !this.methods.length) return;
    this.block = true;
    const method = this.methods.pop();
    method();
    this.block = false;
    this.next();
  },
};

export default GlobalQueue;
