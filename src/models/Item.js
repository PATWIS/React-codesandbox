export default class Item {
  constructor(item = {}) {
    this.id = item.id || null;
    this.name = item.name || "";
    this.desc = item.desc || "";
  }
}
