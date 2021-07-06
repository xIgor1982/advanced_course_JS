function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(id_product, product_name, price, image = 'not-img.png') {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.image = image;
    }

    render() {
        return `
		<div class='goods-item'>
			<div class='goods-imgWrap'>
				<img class='goods-img' src='images/featured/${this.image}' alt='${this.product_name}'>
			</div>

			<div class='goods-cardBottom'>
				<h3 class='goods-title'>${this.product_name}</h3>
				<p class='goods-price'>$<span>${this.price}</span></p>
				<button class='goods-btn' data-productId='${this.id_product}'>Добавить</button>
			</div>
		</div>
	`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(url) {
        makeGETRequest(url, (goods) => {
            this.goods = JSON.parse(goods);
            this.render();
            // this.sumAllProducts();
        })
    }

    render() {
        let listHtml = '';
        console.log("render = ", this.goods);
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.image);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    sumAllProducts() {
        return this.goods.reduce((sum, good) => {
            sum += good.price
        }, 0);
    }
}

class Basket {
    constructor() {
        document.querySelector('.cart-iconWrap').insertAdjacentHTML('afterend', this.renderBasket());
        this.basketGoods = {};
    }

    //Функция добавляет продукт в объект basketGoods.
    addProductToObject(productId) {
        console.log('addProductToObject = ' + productId);

        if (!(productId in this.basketGoods)) {
            this.basketGoods[productId] = 1;
        } else {
            this.basketGoods[productId]++;
        }
    }

    //Первая отрисовка корзины
    renderBasket() {
        return `<div class='basket hidden'>
                    <div class='basket-row basket-header'>
                    <div>Название товара</div>
                    <div>Количество</div>
                    <div>Цена за шт.</div>
                    <div>Итого</div>
                </div>

                <div class='basket-total'>
                    Товаров в корзине на сумму: $<span class='basket-total-value'>0</span>
                </div>
        </div>`;
    }

    //Функция отрисовывает новый товар в корзине.
    renderNewProductInBasket(productId) {
        let productRow = `
        <div class="basket-row">
            <div>${this.basketGoods[productId].product_name}</div>
            <div>
                <span class="product-count" data-productId="${productId}">1</span> шт.
            </div>
            <div>$${this.basketGoods[productId].price}</div>
            <div>
                $<span class="product-totalRow" data-productId="${productId}">${this.basketGoods[productId].price}</span>
            </div>
        </div>
    `;
        document.querySelector('.basket-total').insertAdjacentHTML("beforebegin", productRow);
    }

    //Функция срабатывает когда нужно отрисовать продукт в корзине.
    renderProductInBasket(productId) {
        let productExist = document.querySelector(`.product-count[data-productId="${productId}"]`);
        if (productExist) {
            this.increaseProductCount(productId);
            this.recalculateSumForProduct(productId);
        } else {
            this.renderNewProductInBasket(productId);
        }
    }

    //Функция увеличивает счетчик количества товаров рядом с иконкой корзины.
    increaseProductsCount() {
        document.querySelector('.cart-iconWrap span').textContent++;
    }

    //Функция увеличивает количество товаров в строке в корзине.
    increaseProductCount(productId) {
        const productCountEl = document.querySelector(`.product-count[data-productId="${productId}"]`);
        productCountEl.textContent++;
    }

    //Функция пересчитывает стоимость товара умноженное на количество товара в корзине.
    recalculateSumForProduct(productId) {
        const productTotalRowEl = document.querySelector(`.product-totalRow[data-productId="${productId}"]`);
        let totalPriceForRow = (this.basketGoods[productId] * this.basketGoods[productId].price).toFixed(2);
        productTotalRowEl.textContent = totalPriceForRow;
    }

    //Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
    calculateAndRenderTotalBasketSum() {
        let totalSum = 0;
        for (let productId in this.basketGoods) {
            totalSum += this.basketGoods[productId] * this.basketGoods[productId].price;
        }
        document.querySelector('.basket-total-value').textContent = totalSum.toFixed(2);
    }

    // Функция назначает обработку клика на все кнопки "Добавить".
    addEventListenersForAddToCartButtons() {
        const addToCartBtns = document.querySelectorAll('button[data-productId]');
        addToCartBtns.forEach(function (button) {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.getAttribute('data-productId');
                this.run(productId);
                console.log('click');
            });
        })
    }

    //Запуск корзины
    run(productId) {
        this.increaseProductsCount();
        this.addProductToObject(productId);
        this.renderProductInBasket(productId);
        this.calculateAndRenderTotalBasketSum();
    }

    //Функция назначает обработку клика на все кнопки "Добавить".
    addEventListenersForAddToCartButtons() {
        return new Promise((resolve, reject) => {
            const addToCartBtns = document.querySelectorAll('button[data-productId]');
            addToCartBtns.forEach(function (button) {
                button.addEventListener('click', function (event) {
                    const productId = event.currentTarget.getAttribute('data-productId');
                    this.run(productId);
                });
            })
        })
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const list = new GoodsList();
list.fetchGoods(API_URL);

const basket = new Basket();
basket.addEventListenersForAddToCartButtons();

