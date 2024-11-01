import { bookProduct1, bookProduct2, bookProduct3, bookProduct4 } from '../data/bookProduct.js';
import { removeFromCart, saveToStorage } from '../data/product.js';
import { products} from '../data/product.js';

function generateHtmlCart(bookProducts) {
    let htmlCart = '';
    
    products.forEach((item) => {
        const productId = item.productId;
        const matchingProduct = bookProducts.find(product => product.id === productId);
        
        if (matchingProduct) {
            htmlCart += `
            <div class="product-info js-product-info js-book-container-${matchingProduct.id}">
                <div class="book-detail">
                    <img class="book-picture" src="${matchingProduct.image}">
                    <div class="book-info">
                        <p class="book-name">${matchingProduct.name}</p>
                        <p class="book-price">Giá Tiền: ${(matchingProduct.price / 1000).toFixed(3)} VND</p>
                        <div class="interactive">
                            <p class="quantity">Số Lượng: ${item.quantity}</p>
                            <span class="update-quantity js-update-quantity" data-product-id="${matchingProduct.id}">Thêm</span>
                            <span class="delete-quantity js-delete-quantity" data-product-id="${matchingProduct.id}">Xóa</span>
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <p class="delivery-tag">Phương Thức Vận Chuyển</p>
                    <div>
                        <div class="fast-delivery">
                            <input type="radio" name="deliveryOption-${matchingProduct.id}" value="1">
                            <p class="delivery-choice">Vận Chuyển Nhanh</p>
                        </div>
                        <p class="delivery-cost">10000 VND</p>
                    </div>
                    <div>
                        <div class="fast-delivery">
                            <input type="radio" name="deliveryOption-${matchingProduct.id}" value="2">
                            <p class="delivery-choice">Vận Chuyển Hỏa Tốc</p>
                        </div>
                        <p class="delivery-cost">20000 VND</p>
                    </div>
                </div>
            </div>
            `;
        }
    });

    return htmlCart;
}
    document.querySelector('.js-book-info1').innerHTML = generateHtmlCart(bookProduct1);
    document.querySelector('.js-book-info2').innerHTML = generateHtmlCart(bookProduct2);
    document.querySelector('.js-book-info3').innerHTML = generateHtmlCart(bookProduct3);
    document.querySelector('.js-book-info4').innerHTML = generateHtmlCart(bookProduct4);

document.querySelectorAll('.js-delete-quantity').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-book-container-${productId}`);
        container.remove();
                calculateBill([...bookProduct1, ...bookProduct2, ...bookProduct3, ...bookProduct4]);
    })
})
document.querySelectorAll('.js-update-quantity').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const product = products.find(item => item.productId === productId);
        if (product) {
            product.quantity += 1;
            saveToStorage();
            const quantityElement = link.closest('.product-info').querySelector('.quantity');
            quantityElement.textContent = `Số Lượng: ${product.quantity}`;
        }
    });
});
function calculateBill(bookProducts) {
    let totalPrice = 0;
    let totalQuantity = 0;
    let shippingCost = 0;

    products.forEach((item) => {
        const productId = item.productId;
        const matchingProduct = bookProducts.find(product => product.id === productId);

        if (matchingProduct) {
            totalPrice += matchingProduct.price * item.quantity;
            totalQuantity += item.quantity;

            const deliveryOption = document.querySelector(`input[name="deliveryOption-${matchingProduct.id}"]:checked`);
            if (deliveryOption) {
                shippingCost += deliveryOption.value === '1' ? 10000 : 20000;
            }
        }   
    });

    document.querySelector('.js-cost-total').textContent = `${(totalPrice / 1000).toFixed(3)} VND`;
    document.querySelector('.js-number-product').textContent = totalQuantity;
    document.querySelector('.js-cost-delivery-total').textContent = `${shippingCost} VND`;
    document.querySelector('.js-total-cost-book').textContent = `${((totalPrice + shippingCost) / 1000).toFixed(3)} VND`;
}
calculateBill([...bookProduct1, ...bookProduct2, ...bookProduct3, ...bookProduct4]);

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
        calculateBill([...bookProduct1, ...bookProduct2, ...bookProduct3, ...bookProduct4]);
    });
});

document.querySelectorAll('.js-update-quantity').forEach((btn) => {
    btn.addEventListener('click', () => {
        calculateBill([...bookProduct1, ...bookProduct2, ...bookProduct3, ...bookProduct4]);
    });
});
document.querySelector('.payment-btn').addEventListener('click', () => {
        window.location.href = 'payment.html';
});

