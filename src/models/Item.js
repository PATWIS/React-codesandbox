export default class Item {
  constructor(item = {}) {
    this.id = item.id || -1;
    this.name = item.name || "";
    this.desc = item.desc || "";
  }
}
