import { cart,addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHtml = '';

products.forEach((value) => {
  productsHtml += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${value.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${value.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${value.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${value.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(value.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class = "js-quantity-selector-${value.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart js-added-to-cart-${value.id}">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${value.id}">
    Add to Cart
  </button>
</div>
  `
});

let productContainer = document.querySelector('.js-product-grid');
productContainer.innerHTML = productsHtml;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  //addedMessageId
  let addedMessageTimeoutId;

  button.addEventListener('click', () => {
    let productId = button.dataset.productId;

    let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(quantitySelector.value);

    addToCart(productId, quantity);

    updateCartQuantity();

    // added to cart
    let addedToCart = document.querySelector('.js-added-to-cart-' + productId);
    addedToCart.classList.add('added-to-cart-visible');

    if (addedMessageTimeoutId) {
      clearTimeout(addedMessageTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedToCart.classList.remove('added-to-cart-visible');
    }, 2000);

    // Save the timeoutId so we can stop it later.
    addedMessageTimeoutId = timeoutId;
  });
});

