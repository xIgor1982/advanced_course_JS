const pathFeatured = 'images/featured/';

document
	.querySelector('.goods-list')
	.insertAdjacentHTML('beforeend', '<div class="container goods-wrapper"></div>');

const renderGoodsList = (list) => {
	list.map(item => {
		document
			.querySelector('.goods-list .container')
			.insertAdjacentHTML('beforeend', renderGoodsItem(item.title, item.price, item.img));
	});
};


console.log(window.innerHeight);

/*pull request lesson_1*/
