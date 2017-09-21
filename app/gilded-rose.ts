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
            this.decreaseQuality(2);
        }
    }

    decreaseSellIn() {
        if(this.sellIn > 0) this.sellIn--;
    }

    updateQuality(x = 1): void {
        for (let i = 0; i < x; ++i) if(this.quality < 50) this.quality++;
    }

    decreaseQuality(x = 1) {
        for (let i = 0; i < x; ++i) if(this.quality > 0) this.quality--;
    }
}

export class ItemBetter extends Item {

    handleQuality() {
        this.decreaseSellIn();
        this.updateQuality();
    }
}

export class ItemBackstage extends ItemBetter {

    handleQuality() {

        this.decreaseSellIn();

        if(this.sellIn === 0) {
            this.quality = 0;

        } else if(this.sellIn <= 5) {
            this.updateQuality(3);

        } else if(this.sellIn <= 10) {
            this.updateQuality(2);
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

        this.items.map((element) => element.handleQuality());
        return this.items;
    }
}
