type ProductType = {
  product_name: string;
  product_price: string;
  product_image: string;
  added_to_cart: boolean;
};

let products: ProductType[] = [
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

/***************************  Start Calling Functions *********************/
get_data_from_local_storage();
render_page();
toggle_cart();
/***************************  End Calling Functions *********************/

function render_page() {
  render_products();
  set_cart_count();
  render_cart_items();
  add_products_to_locacal_storage();
}

function toggle_cart() {
  let cart_element = document.querySelector("nav .cart") as HTMLDivElement;

  cart_element.addEventListener("click", () => {
    const drop_down = document.querySelector(
      "nav .drop-down"
    ) as HTMLDivElement;

    drop_down.classList.toggle("active");
  });
}

function add_remove_from_cart(product: ProductType) {
  product.added_to_cart = !product.added_to_cart;
  render_page();
}

function remove_from_cart(product: ProductType) {
  product.added_to_cart = false;
  render_page();
}

function set_cart_count() {
  let number_of_cart_items = document.querySelector(
    "nav .cart .icon span"
  ) as HTMLSpanElement;

  number_of_cart_items.innerHTML = products
    .filter((ele) => ele.added_to_cart)
    .length.toString();
}

function remove_model() {
  let modal = document.querySelector(".modal") as HTMLDivElement;
  let overlay = document.querySelector(".overlay") as HTMLDivElement;

  modal.remove();
  overlay.remove();

  render_page();
  toggle_cart();
}

/************************** Start Render Functions ***********************/

function render_products() {
  let product_list = document.querySelector(
    ".products .products-list"
  ) as HTMLDivElement;

  product_list.innerHTML = "";

  products.forEach((product) => {
    product_list.innerHTML += create_product(product);
  });

  let add_btns = document.querySelectorAll(
    ".products-list .product .btns button.add"
  );

  add_btns.forEach((btn, indx) => {
    btn.addEventListener("click", () => {
      add_remove_from_cart(products[indx]);
    });
  });

  let show_btns = document.querySelectorAll("button.view");

  show_btns.forEach((btn, indx) => {
    btn.addEventListener("click", () => {
      render_modal(products[indx]);
    });
  });
}

function render_cart_items() {
  const drop_down = document.querySelector("nav .drop-down") as HTMLDivElement;

  drop_down.innerHTML = "";

  let cart_items = products.filter((ele) => ele.added_to_cart);

  if (cart_items.length) {
    cart_items.forEach((product) => {
      drop_down.innerHTML += create_cart_item(product);
    });
  } else {
    drop_down.innerHTML = `<div class="no-items">Empty Cart</div>`;
  }

  const remove_btns = document.querySelectorAll(
    "nav .drop-down .item .content button"
  );

  remove_btns.forEach((btn, indx) => {
    btn.addEventListener("click", () => {
      remove_from_cart(cart_items[indx]);
    });
  });
}

function render_modal(product: ProductType) {
  let product_page = document.querySelector(".product-page") as HTMLBodyElement;
  product_page.innerHTML += create_modal(product);

  let close_btn = document.querySelector(".modal .colse") as HTMLDivElement;
  close_btn.addEventListener("click", () => remove_model());

  let remove_btn = document.querySelector(".modal button") as HTMLButtonElement;
  remove_btn.addEventListener("click", () => {
    add_remove_from_cart(product);
    remove_model();
  });
}

/************************** End Render Functions *************************/

/************************** Start Create Functions ***********************/
function create_product(product: ProductType) {
  const { product_name, product_image, product_price, added_to_cart } = product;
  return `
    <div class="product">
      <img src=${product_image} alt=${product_name} />
      <div class="details">
        <div class="name">${product_name}</div>
        <div class="price">$${product_price}</div>
      </div>
      <div class="btns">
        <button class="add">${
          added_to_cart ? "Remove from cart" : "Add to cart"
        }</button>
        <button class="view">view details</button>
      </div>
    </div>
  `;
}

function create_cart_item(product: ProductType) {
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

function create_modal(product: ProductType) {
  const { product_name, product_image, product_price, added_to_cart } = product;
  return `
    <div class="modal">
      <img src=${product_image} alt=${product_name} />
      <div class="desc">
        <div class="name">${product_name}</div>
        <div class="price">$${product_price}</div>
      </div>
      <button>${added_to_cart ? "remove from cart" : "add to cart"}</button>
      <div class="colse">X</div>
    </div>
    <div class="overlay"></div>
  `;
}
/*************************** End Create Functions ************************/

/*************************** Start LocalStorage **************************/
function get_data_from_local_storage() {
  let products_list = localStorage.getItem("products");
  if (products_list) {
    products = JSON.parse(products_list as string);
  }
}

function add_products_to_locacal_storage() {
  localStorage.setItem("products", JSON.stringify(products));
}
/****************************** End LocalStorage *************************/
