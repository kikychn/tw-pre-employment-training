const database = require("../main/datbase");

function selectedItemsInfo(inputs) {
    let allItems = database.loadAllItems();
    let formatItems = [];
    inputs.forEach(selectedItem => {
        selectedItem = selectedItem.split("-");
        let selectedItemBarcode = selectedItem[0];
        let selectedItemCount = 1;
        if (selectedItem.length > 1) {
            selectedItemCount = selectedItem[1];
        }
        let itemAlreadyExisted = false;
        formatItems.forEach(formatItem => {
            if (formatItem.barcode == selectedItemBarcode) {
                formatItem.count += 1;
                itemAlreadyExisted = true;
            }
        });
        if (itemAlreadyExisted == false) {
            allItems.forEach(item => {
                if (item.barcode == selectedItemBarcode) {
                    formatItems.push({
                        barcode: selectedItemBarcode,
                        name: item.name,
                        unitPirce: item.price.toFixed(2),
                        count: selectedItemCount,
                        freeCount: 0,
                        unit: item.unit,
                    });
                }
            });
        }
    });
    return formatItems;
}

function calDiscount(formatItems) {
    let promotions = database.loadPromotions();
    formatItems.forEach(selectItem => {
        promotions[0].barcodes.forEach(barcode => {
            if (barcode == selectItem.barcode) {
                selectItem.freeCount = 1;
            }
        });
        selectItem.price = selectItem.unitPirce * (selectItem.count - selectItem.freeCount);
        selectItem.price = selectItem.price.toFixed(2);
    });
    return formatItems;
}

function printShoppingList(formatItems) {
    let selectItemString = "";
    let giftsString = "";
    let totalPrice = 0;
    let saving = 0;
    formatItems.forEach(selectedItem => {
        selectItemString += "名称：" + selectedItem.name + "，数量："
            + selectedItem.count + selectedItem.unit + "，单价："
            + selectedItem.unitPirce + "(元)，小计："
            + selectedItem.price + "(元)\n";
        if (selectedItem.freeCount > 0) {
            giftsString += "名称：" + selectedItem.name + "，数量："
                + selectedItem.freeCount + selectedItem.unit + "\n";
        }
        totalPrice += selectedItem.unitPirce * (selectedItem.count - selectedItem.freeCount);
        saving += selectedItem.unitPirce * selectedItem.freeCount;
    });
    let totalPriceString = "总计：" + totalPrice.toFixed(2) + "(元)\n";
    let savingString = "节省：" + saving.toFixed(2) + "(元)\n";

    let shoppingListString = '***<没钱赚商店>购物清单***\n' +
        selectItemString +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        giftsString +
        '----------------------\n' +
        totalPriceString +
        savingString +
        '**********************';
    return shoppingListString;
}

module.exports = function printInventory(inputs) {
    let formatItems = selectedItemsInfo(inputs);
    formatItems = calDiscount(formatItems);
    let shoppingListString = printShoppingList(formatItems);
    console.log(shoppingListString);

    return 'Hello World!';
};