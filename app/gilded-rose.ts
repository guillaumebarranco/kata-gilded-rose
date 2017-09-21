export class Item {
    name: string;
    sellIn: number;
    quality: number;
    getBetter: boolean;
    legendary: boolean;

    constructor(name, sellIn, quality, getBetter = false, legendary = false) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
        this.getBetter = getBetter;
        this.legendary = legendary;
    }

    updateQuality(): void {

        if(this.quality < 50) {
            this.quality++;
        }
    }

    decreaseQuality() {

        if(this.quality > 0) {
            this.quality--;
        }
    }

    multipleDecreaseQuality(x) {

        for (let i = 0; i < x; ++i) {
            this.decreaseQuality();
        }
    }
}

export class ItemBackstage extends Item {

    multipleUpdateQuality(x) {

        for (let i = 0; i < x; ++i) {
            this.updateQuality();
        }
    }
}

export class Shop {
    items: Item[];

    constructor(items = []) {
        this.items = items;
    }

    handleFuckingSpecialItem(element) {

        const fuckingItem = [
            "Backstage"
        ];

        if(fuckingItem.indexOf(element.name) !== -1 && element.sellIn === 0) {
            element.quality = 0;

        } else if(fuckingItem.indexOf(element.name) !== -1 && element.sellIn <= 5) {
            element.multipleUpdateQuality(2);

        } else if(fuckingItem.indexOf(element.name) !== -1 && element.sellIn <= 10) {
            element.updateQuality();
        }
    }

    updateQuality(): Item[] {

        this.items.forEach((element, i) => {

            if(element.legendary) {
                element.quality = 80;
                return;
            }

            if(element.sellIn > 0) {
                element.sellIn--;   
            }

            if(element.getBetter) {

                element.updateQuality();
                this.handleFuckingSpecialItem(element);

            // Normal element
            } else {

                if(element.quality > 0 && element.sellIn > 0) {
                    element.decreaseQuality();

                } else if(element.quality > 0 && element.sellIn === 0) {
                    element.multipleDecreaseQuality(2);
                }
            }
        });

        return this.items;
    }
}
