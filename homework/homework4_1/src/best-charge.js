const loadAllItems = require("../src/items.js");
const loadPromotions = require("../src/promotions.js");

function selectedItemsInfo(selectedItems) {
  let allItems = loadAllItems();
  let formatItems = [];
  selectedItems.forEach(selectedItem => {
    selectedItem = selectedItem.split(" x ");
    let selectedItemId = selectedItem[0];
    let selectedItemCount = selectedItem[1];
    allItems.forEach(item => {
      if (item.id == selectedItemId) {
        formatItems.push({
          id: selectedItemId,
          name: item.name,
          price: item.price * selectedItemCount,
          count: selectedItemCount,
          discountRatio: 1,
        });
      }
    });
  });
  return formatItems;
}

function calDiscount(formatItems, totalPrice) {
  let promotions = loadPromotions();
  let totalPriceWithPromotion1 = totalPrice
  if (totalPrice >= 30) {
    totalPriceWithPromotion1 = totalPrice - 6;
  }

  let totalPriceWithPromotion2 = 0
  let discountDish = [];
  formatItems.forEach(selectItem => {
    promotions[1].items.forEach(discountItemId => {
      if (selectItem.id == discountItemId) {
        discountDish.push(selectItem.name);
        selectItem.discountRatio = 0.5;
      }
    });
    totalPriceWithPromotion2 += selectItem.price * selectItem.discountRatio;
  });

  let saving1 = totalPrice - totalPriceWithPromotion1;
  let saving2 = totalPrice - totalPriceWithPromotion2;
  let finalPrice = totalPrice;
  if (saving1 == 0 && saving2 == 0) {
    savingInfo = "";
  } else if (saving2 > saving1) {
    discountDish = discountDish.join("，");
    savingInfo = promotions[1].type + "(" + discountDish + ")" + "，省" + saving2 + "元\n";
    finalPrice = totalPriceWithPromotion2;
  } else {
    savingInfo = promotions[0].type + "，省6元\n";
    finalPrice = totalPriceWithPromotion1;
  }
  return {savingInfo, finalPrice};
}

function printSummary(selectItemList, savingInfo, finalPrice) {
  if (savingInfo == "") {
    discountList = "";
  } else {
    discountList = "使用优惠:\n" + savingInfo +
      "-----------------------------------\n";
  }
  summary = "============= 订餐明细 =============\n" +
    selectItemList +
    "-----------------------------------\n" +
    discountList +
    "总计：" + finalPrice + "元\n" +
    "===================================";
  return summary;
}

function bestCharge(selectedItems) {
  var formatItems = selectedItemsInfo(selectedItems);
  var totalPrice = 0;
  var selectItemString = "";
  formatItems.forEach(selectItem => {
    totalPrice += selectItem.price;
    selectItemString += selectItem.name + " x " + selectItem.count + " = " + selectItem.price + "元\n";
  });

  var {savingInfo, finalPrice} = calDiscount(formatItems, totalPrice);
  var summary = printSummary(selectItemString, savingInfo, finalPrice);
  return summary;
}

module.exports = bestCharge;
