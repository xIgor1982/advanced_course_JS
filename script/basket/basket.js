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

/**
 * Функция добавляет продукт в объект basket.
 * @param {number} productId
 */
function addProductToObject(productId) {
	if (!(productId in basket)) {
		basket[productId] = 1;
	} else {
		basket[productId]++;
	}
}

/**
 * Функция срабатывает когда нужно отрисовать продукт в корзине.
 * @param {number} productId
 */
function renderProductInBasket(productId) {
	let productExist = document.querySelector(`.product-count[data-productId="${productId}"]`);
	if (productExist) {
		increaseProductCount(productId);
		recalculateSumForProduct(productId);
	} else {
		renderNewProductInBasket(productId);
	}
}

/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId
 */
function renderNewProductInBasket(productId) {
	// console.log('productId = ' + productId);

	let productRow = `
        <div class="basket-row">
            <div>${products[productId].title}</div>
            <div>
                <span class="product-count" data-productId="${productId}">1</span> шт.
            </div>
            <div>$${products[productId].price}</div>
            <div>
                $<span class="product-totalRow" data-productId="${productId}">${products[productId].price}</span>
            </div>
        </div>
    `;
	basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

/**
 * Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
 */
function increaseProductsCount() {
	basketCounterEl.textContent++;
}

/**
 * Функция увеличивает количество товаров в строке в корзине.
 * @param {number} productId
 */
function increaseProductCount(productId) {
	const productCountEl = document.querySelector(`.product-count[data-productId="${productId}"]`);
	productCountEl.textContent++;
}

/**
 * Функция пересчитывает стоимость товара умноженное на количество товара
 * в корзине.
 * @param {number} productId
 */
function recalculateSumForProduct(productId) {
	const productTotalRowEl = document.querySelector(`.product-totalRow[data-productId="${productId}"]`);
	let totalPriceForRow = (basket[productId] * products[productId].price).toFixed(2);
	productTotalRowEl.textContent = totalPriceForRow;
}

/**
 * Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
 */
function calculateAndRenderTotalBasketSum() {
	let totalSum = 0;
	for (let productId in basket) {
		totalSum += basket[productId] * products[productId].price;
	}
	basketTotalValueEl.textContent = totalSum.toFixed(2);
}

/**
 * Эта функция срабатывает когда добавляют новый товар в корзину.
 * @param {number} productId
 */
function addProductIntoBasket(productId) {
	increaseProductsCount();
	addProductToObject(productId);
	renderProductInBasket(productId);
	calculateAndRenderTotalBasketSum();
}