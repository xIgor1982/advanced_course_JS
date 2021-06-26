/**
 * Этот класс хранит в себе информацию о каком-то конкретном товаре.
 */

/**
 * @param {number} id уникальный идентификатор каждого товара
 * @param {string} title название товара
 * @param {number} price цена товара
 * @param {string} image название файла с картинкой, например 0.jpg
 * - если нет фотографии товара вставляет картинку по умолчанию
 */
class ProductDTO {
	constructor(id, title , price, image='not-img.png') {
		this.id = id;
		this.title = title;
		this.price = price;
		this.image = image;
	}
}