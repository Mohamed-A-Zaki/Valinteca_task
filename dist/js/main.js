"use strict";
const products = [
    {
        product_name: "accent chair",
        product_price: "25999",
        product_image: "https://images2.imgbox.com/38/85/iuYyO9RP_o.jpeg",
        added_to_cart: false,
    },
    {
        product_name: "albany sectional",
        product_price: "109999",
        product_image: "https://images2.imgbox.com/36/c5/mgSP2SV2_o.jpeg",
        added_to_cart: false,
    },
    {
        product_name: "armchair",
        product_price: "12599",
        product_image: "https://images2.imgbox.com/7a/8e/4iSgp3eg_o.jpeg",
        added_to_cart: false,
    },
    {
        product_name: "dining table",
        product_price: "42999",
        product_image: "https://images2.imgbox.com/45/1a/IhY9dl95_o.jpeg",
        added_to_cart: false,
    },
    {
        product_name: "high-back bench",
        product_price: "20099",
        product_image: "https://images2.imgbox.com/b4/3d/2jm4sPHs_o.jpeg",
        added_to_cart: false,
    },
    {
        product_name: "leather chair",
        product_price: "39999",
        product_image: "https://images2.imgbox.com/fa/23/Pqoxb7z6_o.jpeg",
        added_to_cart: false,
    },
];
render_products();
set_cart_count();
function render_products() {
    let product_list = document.querySelector(".products .products-list");
    product_list.innerHTML = "";
    products.forEach((product) => {
        product_list.innerHTML += create_product(product);
    });
    let add_btns = document.querySelectorAll(".products-list .product .btns button.add");
    add_btns.forEach((btn, indx) => {
        btn.addEventListener("click", () => {
            handle_add_to_cart(products[indx]);
        });
    });
}
function set_cart_count() {
    let number_of_cart_items = document.querySelector("nav .cart .icon span");
    number_of_cart_items.innerHTML = products
        .filter((ele) => ele.added_to_cart)
        .length.toString();
}
function handle_add_to_cart(product) {
    product.added_to_cart = !product.added_to_cart;
    render_products();
    set_cart_count();
}
function create_product(product) {
    const { product_name, product_image, product_price, added_to_cart } = product;
    return `
    <div class="product">
      <img src=${product_image} alt=${product_name} />
      <div class="details">
        <div class="name">${product_name}</div>
        <div class="price">$${product_price}</div>
      </div>
      <div class="btns">
        <button class="add">${added_to_cart ? "Remove from cart" : "Add to cart"}</button>
        <button class="view">view details</button>
      </div>
    </div>
  `;
}
//# sourceMappingURL=main.js.map