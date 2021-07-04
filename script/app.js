class GoodsItem {
	constructor(id, title , price, image='not-img.png') {
		this.id = id;
		this.title = title;
		this.price = price;
		this.image = image;
	}

	render() {
		return `
			<div class='goods-item'>
				<div class='goods-imgWrap'>
					<img class='goods-img' src='images/featured/${this.image}' alt='${this.title}'>
					<div class='goods-bgDark'></div>
				</div>
		
				<div class='goods-cardBottom'>
						<h3 class='goods-title'>${this.title}</h3>
						<p class='goods-price'>$<span>${this.price}</span></p>
						<button class='goods-btn' data-productId='${this.id}'>Добавить</button>
				</div>
				
			</div>
	`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}
	fetchGoods() {
		this.goods = [
			{ id: 0, title: '1.Men\'s jacket', price: 135.22, image: '0.jpg' },
			{ id: 1, title: '2.Women\'s costume', price: 141.99, image: '1.jpg' },
			{ id: 2, title: '3.Women\'s shirt', price: 152.45, image: '2.jpg' },
			{ id: 3, title: '4.Men\'s sweater', price: 145.33, image: '3.jpg' },
			{ id: 4, title: '5.Women\'s jeans', price: 137.55, image: '4.jpg' },
			{ id: 5, title: '6.Women\'s jacket', price: 142.99, image: '5.jpg' },
			{ id: 6, title: '7.Women\'s jacket', price: 145.99},
			{ id: 7, title: '8.Women\'s jacket', price: 149.99},
			{ id: 8, title: '9.Women\'s jacket', price: 139.99},
		];
	}
	render() {
		let listHtml = '';
		this.goods.forEach(good => {
			const goodItem = new GoodsItem(good.id, good.title, good.price, good.image);
			listHtml += goodItem.render();
		});
		document.querySelector('.goods-list').innerHTML = listHtml;
	}

	sumAllProducts(){
		return this.goods.reduce((sum, good) => sum += good.price, 0);
	}
}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log('Сумма все продуктов = ' + list.sumAllProducts());

class Basket {
	constructor() {}

	/**
	 * Добавляет продукт
	 */
	addProductBasket() {}

	/**
	 * Обновление содержимого корзины
	 */
	updateProductBasket(){}

	/**
	 * Отрисовывание продукт в корзине.
	 */
	render() {}
}














// const pathImages = 'images';
// const pathFeatured = `${pathImages}/featured`;
// const featuredItemsEl = document.querySelector('.goods-list');

// /**
//  * Эта функция принимает один из объектов из массива products в файле productsArray.js.
//  * @param {ProductDTO} product объект с информацией о продукте.
//  * @returns {string} html-разметка карточки товара.
//  */
// function getProduct(product) {
// 	return `
// 	<div class='goods-item'>
// 		<div class='goods-imgWrap'>
// 			<img class='goods-img' src='${pathFeatured}/${product.image}' alt='${product.title}'>
// 			<div class='goods-bgDark'></div>
// 		</div>
//
// 		<div class='goods-cardBottom'>
// 				<h3 class='goods-title'>${product.title}</h3>
// 				<p class='goods-price'>$<span>${product.price}</span></p>
// 				<button class='goods-btn' data-productId='${product.id}'>Добавить</button>
// 		</div>
//
// 	</div>
// 	`;
// }

// /**
//  * Функция вставляет карточки товаров в страницу.
//  * @param {ProductDTO[]} products массив товаров из файла productsArray.js
//  * @param {HTMLDivElement} featuredItemsEl элемент с классом .goods-list
//  */
// function insertProductsIntoPage(products, featuredItemsEl) {
// 	let productsMarkup = '';
// 	for (let product of products) {
// 		productsMarkup += getProduct(product);
// 	}
// 	featuredItemsEl.insertAdjacentHTML('afterbegin', productsMarkup);
// }

// /**
//  * Функция назначает обработку клика на все кнопки "Добавить".
//  */
// function addEventListenersForAddToCartButtons() {
// 	const addToCartBtns = document.querySelectorAll('button[data-productId]');
// 	addToCartBtns.forEach(function (button) {
// 		button.addEventListener('click', addedProductHandler);
// 	})
// }

// /**
//  * Функция-обработчик события клика по кнопке "Добавить".
//  * @param {MouseEvent} event
//  */
// function addedProductHandler(event) {
// 	const productId = event.currentTarget.getAttribute('data-productId');
// 	addProductIntoBasket(productId);
// }

// insertProductsIntoPage(products, featuredItemsEl);
// addEventListenersForAddToCartButtons();




// const openBasketBtn = document.querySelector('.cart-iconWrap');
// const basketEl = document.querySelector('.basket');
// const basketCounterEl = document.querySelector('.cart-iconWrap span');
// const basketTotalEl = document.querySelector('.basket-total');
// const basketTotalValueEl = document.querySelector('.basket-total-value');

// /**
//  * Появление, скрытие окна списка товаров в корзине
//  */
// openBasketBtn.addEventListener('click', function () {
// 	console.log('click' + basketEl);
// 	basketEl.classList.toggle('hidden');
// });

// /**
//  * В корзине хранится количество каждого товара
//  * Ключ это id продукта, значение это количество товаров в корзине, например:
//  {
//     1: 10,
//     3: 2
//  }
//  */
// let basket = {};

// /**basket
//  * Функция добавляет продукт в объект basket.
//  * @param {number} productId
//  */
// function addProductToObject(productId) {
// 	if (!(productId in basket)) {
// 		basket[productId] = 1;
// 	} else {
// 		basket[productId]++;
// 	}
// }

// /**
//  * Функция срабатывает когда нужно отрисовать продукт в корзине.
//  * @param {number} productId
//  */
// function renderProductInBasket(productId) {
// 	let productExist = document.querySelector(`.product-count[data-productId="${productId}"]`);
// 	if (productExist) {
// 		increaseProductCount(productId);
// 		recalculateSumForProduct(productId);
// 	} else {
// 		renderNewProductInBasket(productId);
// 	}
// }
//
// /**
//  * Функция отрисовывает новый товар в корзине.
//  * @param {number} productId
//  */
// function renderNewProductInBasket(productId) {
// 	// console.log('productId = ' + productId);
//
// 	let productRow = `
//         <div class="basket-row">
//             <div>${products[productId].title}</div>
//             <div>
//                 <span class="product-count" data-productId="${productId}">1</span> шт.
//             </div>
//             <div>$${products[productId].price}</div>
//             <div>
//                 $<span class="product-totalRow" data-productId="${productId}">${products[productId].price}</span>
//             </div>
//         </div>
//     `;
// 	basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
// }
//
// /**
//  * Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
//  */
// function increaseProductsCount() {
// 	basketCounterEl.textContent++;
// }
//
// /**
//  * Функция увеличивает количество товаров в строке в корзине.
//  * @param {number} productId
//  */
// function increaseProductCount(productId) {
// 	const productCountEl = document.querySelector(`.product-count[data-productId="${productId}"]`);
// 	productCountEl.textContent++;
// }
//
// /**
//  * Функция пересчитывает стоимость товара умноженное на количество товара
//  * в корзине.
//  * @param {number} productId
//  */
// function recalculateSumForProduct(productId) {
// 	const productTotalRowEl = document.querySelector(`.product-totalRow[data-productId="${productId}"]`);
// 	let totalPriceForRow = (basket[productId] * products[productId].price).toFixed(2);
// 	productTotalRowEl.textContent = totalPriceForRow;
// }
//
// /**
//  * Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
//  */
// function calculateAndRenderTotalBasketSum() {
// 	let totalSum = 0;
// 	for (let productId in basket) {
// 		totalSum += basket[productId] * products[productId].price;
// 	}
// 	basketTotalValueEl.textContent = totalSum.toFixed(2);
// }

// /**
//  * Эта функция срабатывает когда добавляют новый товар в корзину.
//  * @param {number} productId
//  */
// function addProductIntoBasket(productId) {
// 	increaseProductsCount();
// 	addProductToObject(productId);
// 	renderProductInBasket(productId);
// 	calculateAndRenderTotalBasketSum();
// }