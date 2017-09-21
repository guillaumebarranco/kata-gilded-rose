import { expect } from "chai";
import { Item, ItemBackstage, Shop } from "../app/gilded-rose";

describe("Gilded Rose", () => {

    let items: Item[];

    beforeEach(() => {
        items = [];
    });

    it("decreases by 1 quality and remaining sellIn days of regular item", () => {

        // Given
        items.push(new Item("Dexterity Vest", 10, 20));
        items.push(new Item("Conjured Mana Cake", 3, 6));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 9,
            quality: 19
        }, {
            sellIn: 2,
            quality: 5
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it('increases the quality by 1 of the products that get better as they age', () => {

        // Given
        items.push(new Item("Aged Brie", 20, 30, true));
        items.push(new Item('Backstage', 20, 30, true));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 19,
            quality: 31
        }, {
            sellIn: 19,
            quality: 31
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it('increases the quality by 2 of the products that get better as they age when there is less than 10 days', () => {

        // Given
        items.push(new Item('Backstage', 8, 30, true));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 7,
            quality: 32
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it('increases the quality by 3 of the products that get better as they age when there is less than 5 days', () => {

        // Given
        items.push(new ItemBackstage('Backstage', 4, 30, true));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 3,
            quality: 33
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it('backstage should have 0 quality as there is no day left', () => {

        // Given
        items.push(new Item('Backstage', 0, 30, true));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 0,
            quality: 0
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it('decreases quality but never under 0', () => {

        // Given
        items.push(new Item("Dexterity Vest", 10, 0));
        items.push(new Item("Conjured Mana Cake", 3, 0));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 9,
            quality: 0
        }, {
            sellIn: 2,
            quality: 0
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it('increases quality bu never more than 50', () => {

        // Given
        items.push(new Item("Aged Brie", 20, 50, true));
        items.push(new Item('Backstage', 20, 50, true));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 19,
            quality: 50
        }, {
            sellIn: 19,
            quality: 50
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it('Sulfuras product should not lose any days to sale nor quality', () => {

        // Given
        items.push(new Item("Sulfuras", 10, 50, false, true));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 10,
            quality: 80
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });

    it("decreases by 2 quality of items which have not days left", () => {

        // Given
        items.push(new Item("Dexterity Vest", 0, 20));
        items.push(new Item("Conjured Mana Cake", 0, 6));

        // When
        items = new Shop(items).updateQuality();

        // Then
        const expected = [{
            sellIn: 0,
            quality: 18
        }, {
            sellIn: 0,
            quality: 4
        }];

        expected.forEach((testCase, i) => {
            expect(items[i].quality).to.equal(testCase.quality);
            expect(items[i].sellIn).to.equal(testCase.sellIn);
        });
    });
});
