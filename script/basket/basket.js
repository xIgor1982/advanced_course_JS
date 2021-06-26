const openBasketBtn = document.querySelector('.cart-iconWrap');
const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cart-iconWrap span');
const basketTotalEl = document.querySelector('.basket-total');
const basketTotalValueEl = document.querySelector('.basket-total-value');

/**
 * Появленление, скрытие окна списка товаров в корзине
 */
openBasketBtn.addEventListener('click', function () {
	console.log('click' + basketEl);
	basketEl.classList.toggle('hidden');
});

/**
 * В корзине хранится количество каждого товара
 * Ключ это id продукта, значение это количество товаров в корзине, например:
 {
    1: 10,
    3: 2
 }
 */
let basket = {};