const pathImages = 'images';
const pathFeatured = `${pathImages}/featured`;
const featuredItemsEl= document.querySelector('.goods-list');

/**
 * Эта функция принимает один из объектов из массива products в файле productsArray.js.
 * @param {ProductDTO} product объект с информацией о продукте.
 * @returns {string} html-разметка карточки товара.
 */
function getProduct(product) {
	return `
	<div class='goods-item'>
		<div class='goods-imgWrap'>
			<img class='goods-img' src='${pathFeatured}/${product.image}' alt='${product.title}'>
				<div class='doods-bgDark'></div>
		</div>

		<h3 class='goods-title'>${product.title}</h3>
		<p class='goods-price'>${product.price}</p>
		<button class='goods-btn' data-productId="${product.id}">Добавить</button>
	</div>
	`;
}

/**
 * Функция вставляет карточки товаров в страницу.
 * @param {ProductDTO[]} products массив товаров из файла productsArray.js
 * @param {HTMLDivElement} featuredItemsEl элемент с классом .goods-list
 */
function insertProductsIntoPage(products, featuredItemsEl) {
	let productsMarkup = '';
	for (let product of products) {
		productsMarkup += getProduct(product);
	}
	featuredItemsEl.insertAdjacentHTML('afterbegin', productsMarkup);
}

/**
 * Функция назначает обработку клика на все кнопки "Добавить".
 */
function addEventListenersForAddToCartButtons() {
	const addToCartBtns = document.querySelectorAll('button[data-productId]');
	addToCartBtns.forEach(function (button) {
		button.addEventListener('click', addedProductHandler);
	})
}

/**
 * Функция-обработчик события клика по кнопке "Добавить".
 * @param {MouseEvent} event
 */
function addedProductHandler(event) {
	const productId = event.currentTarget.getAttribute('data-productId');
	addProductIntoBasket(productId);
}

insertProductsIntoPage(products, featuredItemsEl);
addEventListenersForAddToCartButtons();