
export let products = JSON.parse(localStorage.getItem('products'));
if(!products){
    products = [{
            id:'100a',
            quantity: 1,
        },{
            id:'101a',
            quantity: 1,
    }]
}

export function saveToStorage(){
    localStorage.setItem('products', JSON.stringify(products));
}
export function removeFromCart(productId){
    const newProduct = [];
    products.forEach((productItem)=>{
        if(productItem.productId !== productId){
            newProduct.push(productItem);
        }
    })
    products = newProduct;
    saveToStorage();
}
export function displayQuantity(){
    let cartQuantity = 0;
    products.forEach((productItem) =>{
        cartQuantity += productItem.quantity;
    })
    document.querySelector('.js-quantity-number').innerHTML = cartQuantity;
}
export function addToCart(productId){
    let matchingItem;
    products.forEach((productItem) =>{
        if(productId === productItem.productId){
            matchingItem = productItem;
        } 
    })
    if(matchingItem){
        matchingItem.quantity += 1;
    }else{
        products.push({
            productId :productId,
            quantity: 1,
        })
    }
    saveToStorage()
}



let addedMessageTimeoutId = {};
export function addMessage(productId){
    const addClass = document.querySelector(`.js-added-to-cart-${productId}`)
    addClass.classList.add('js-added-to-cart1');
    if(addedMessageTimeoutId[productId]){
      clearTimeout(addedMessageTimeoutId[productId])
    }
    addedMessageTimeoutId[productId] = setTimeout(() =>{
      addClass.classList.remove('js-added-to-cart1');
    }, 2000)
}
