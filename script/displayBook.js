import {displayQuantity, addToCart, addMessage} from '../data/product.js';
import {bookProduct1, bookProduct2, bookProduct3, bookProduct4} from '../data/bookProduct.js';


function displayProduct(productContainer){
    let htmlBook = '';
    productContainer.forEach((product) =>{
        htmlBook += `
            <div class="book">
                <div class="picture">
                    <img src="${product.image}">
                </div>
                <div class="info"> 
                    <p class="book-name">${product.name}</p>
                    <p class="book-price">${(product.price/1000).toFixed(3)}VND</p>
                    <div class="added-to-cart js-added-to-cart-${product.id}">Đã thêm vào giỏ</div>
                    <button class="addToCart-btn js-add-to-cart" data-product-id=${product.id}>Thêm Vào Giỏ</button>
                </div>
            </div>
        `
    });
    return htmlBook;
}

document.querySelector('.js-book-product1').innerHTML = displayProduct(bookProduct1)
document.querySelector('.js-book-product2').innerHTML = displayProduct(bookProduct2)
document.querySelector('.js-book-product3').innerHTML = displayProduct(bookProduct3)
document.querySelector('.js-book-product4').innerHTML = displayProduct(bookProduct4)

displayQuantity();
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        addMessage(productId);
        displayQuantity();
    });
});

