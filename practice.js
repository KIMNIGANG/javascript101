class Counter {
  constructor(callback) {
    this.count = 0;
    this.callback = callback;
  }

  increase() {
    this.count++;
    console.log(this.count);
    if (this.count % 5 === 0) {
      this.callback && this.callback(this.count);
    }
  }
}

function printSomethig(num) {
  console.log(`${num}`);
}

const aCounter = new Counter(printSomethig);
aCounter.increase();
aCounter.increase();
aCounter.increase();
aCounter.increase();
aCounter.increase();
aCounter.increase();
