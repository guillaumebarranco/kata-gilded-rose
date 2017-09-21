export class Item {
    name: string;
    sellIn: number;
    quality: number;
    getBetter: boolean;

    constructor(name, sellIn, quality, getBetter = false) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
        this.getBetter = getBetter;
    }

    updateQuality() {

        if(this.quality < 50) {
            this.quality++;
        }
    }

    decreaseQuality() {

        if(this.quality > 0) {
            this.quality--;
        }
    }
}

export class Shop {
    items: Item[];

    constructor(items = []) {
        this.items = items;
    }

    updateQuality(): Item[] {

        this.items.forEach((element, i) => {

            if(element.name === "Sulfuras") {
                element.quality = 80;
                return;
            }

            if(element.sellIn > 0) {
                element.sellIn--;   
            }

            const fuckingItem = [
                "Backstage"
            ];

            if(element.getBetter) {

                element.updateQuality();

                // handle fucking item

                if(fuckingItem.indexOf(element.name) !== -1 && element.sellIn === 0) {

                    element.quality = 0;

                } else if(fuckingItem.indexOf(element.name) !== -1 && element.sellIn <= 5) {

                    element.updateQuality();
                    element.updateQuality();

                } else if(fuckingItem.indexOf(element.name) !== -1 && element.sellIn <= 10) {
                    element.updateQuality();
                }

            } else {

                if(element.quality > 0 && element.sellIn > 0) {
                    element.decreaseQuality();

                } else if(element.quality > 0 && element.sellIn === 0) {
                    element.decreaseQuality();
                    element.decreaseQuality();
                }
            }
        });

        return this.items;
    }
}
