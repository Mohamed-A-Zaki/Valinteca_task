"use strict";
let products = [
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
        product_image: "https://images2.imgbox.com/0f/f0/5OTgCNyH_o.jpeg",
        added_to_cart: false,
    },
    {
        product_name: "leather chair",
        product_price: "39999",
        product_image: "https://images2.imgbox.com/25/f2/Ce0d8fue_o.jpeg",
        added_to_cart: false,
    },
];
get_data_from_local_storage();
render_products();
render_cart_items();
set_cart_count();
/********************** Start Toogle Dropdown Menu *********************/
let cart_element = document.querySelector("nav .cart");
cart_element.addEventListener("click", function () {
    const drop_down = document.querySelector("nav .drop-down");
    drop_down.classList.toggle("active");
});
/*********************** End Toogle Dropdown Menu ***********************/
/***************************** Start Functions **************************/
function handle_add_to_cart(product) {
    product.added_to_cart = !product.added_to_cart;
    rerender_products();
}
function handle_remove_from_cart(product) {
    product.added_to_cart = false;
    rerender_products();
}
function rerender_products() {
    render_products();
    set_cart_count();
    render_cart_items();
    add_products_to_locacal_storage();
}
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
function render_cart_items() {
    const drop_down = document.querySelector("nav .drop-down");
    drop_down.innerHTML = "";
    let cart_items = products.filter((ele) => ele.added_to_cart);
    if (cart_items.length) {
        cart_items.forEach((product) => {
            drop_down.innerHTML += create_cart_item(product);
        });
    }
    else {
        drop_down.innerHTML = `<div class="no-items">Empty Cart</div>`;
    }
    const remove_btns = document.querySelectorAll("nav .drop-down .item .content button");
    remove_btns.forEach((btn, indx) => {
        btn.addEventListener("click", () => {
            handle_remove_from_cart(cart_items[indx]);
        });
    });
}
function set_cart_count() {
    let number_of_cart_items = document.querySelector("nav .cart .icon span");
    number_of_cart_items.innerHTML = products
        .filter((ele) => ele.added_to_cart)
        .length.toString();
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
function create_cart_item(product) {
    const { product_name, product_image, product_price } = product;
    return `
  <div class="item">
    <img src=${product_image} alt="img" />
    <div class="content">
      <div class="details">
        <div class="name">${product_name}</div>
        <div class="price">$${product_price}</div>
      </div>
      <button>Remove From Cart</button>
    </div>
  </div>
  `;
}
/*************************** Start LocalStorage **************************/
function get_data_from_local_storage() {
    let products_list = localStorage.getItem("products");
    if (products_list) {
        products = JSON.parse(products_list);
    }
}
function add_products_to_locacal_storage() {
    localStorage.setItem("products", JSON.stringify(products));
}
/****************************** End LocalStorage *************************/
/******************************* End Functions ***************************/
//# sourceMappingURL=main.js.map