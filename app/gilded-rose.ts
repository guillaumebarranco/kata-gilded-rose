export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    handleQuality() {

        this.decreaseSellIn();

        if(this.quality > 0 && this.sellIn > 0) {
            this.decreaseQuality();

        } else if(this.quality > 0 && this.sellIn === 0) {
            this.multipleDecreaseQuality(2);
        }
    }

    decreaseSellIn() {

        if(this.sellIn > 0) {
            this.sellIn--;   
        }
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

export class ItemBetter extends Item {

    handleQuality() {
        this.decreaseSellIn();
        this.updateQuality();
    }
}

export class ItemBackstage extends Item {

    handleQuality() {

        this.decreaseSellIn();

        if(this.sellIn === 0) {
            this.quality = 0;

        } else if(this.sellIn <= 5) {
            this.multipleUpdateQuality(3);

        } else if(this.sellIn <= 10) {
            this.multipleUpdateQuality(2);
        }
    }

    multipleUpdateQuality(x) {

        for (let i = 0; i < x; ++i) {
            this.updateQuality();
        }
    }
}

export class ItemLegendary extends Item {

    handleQuality() {
        this.quality = 80;
    }
}

export class Shop {
    items: Item[];

    constructor(items = []) {
        this.items = items;
    }

    updateQuality(): Item[] {

        this.items.forEach((element, i) => {
            element.handleQuality();
        });

        return this.items;
    }
}
