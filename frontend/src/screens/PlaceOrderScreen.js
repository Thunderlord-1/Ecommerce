import { createOrder } from "../api.js";
import { getCartItems,getShipping,getPayment, cleanCart } from "../localStorage.js"
import { hideLoading, showLoading, showMessage } from "../util.js";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length == 0)
    {
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if(!shipping.address){
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if(!payment.paymentMethod)
    {
        document.location.hash ='/payment';
    }
    const itemsPrice = orderItems.reduce((a,c) => a + c.price* c.qty,0);
    const totalPrice = itemsPrice;
    return{
        orderItems,
        shipping,
        payment,
        itemsPrice,
        totalPrice
    }
};
const PlaceOrderScreen = {
 after_render: async () => {
    document.getElementById('placeOrderButton').addEventListener('click',async()=>{
        const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
            if(data.error)
            {
                showMessage(data.error);
            }else
            {
                cleanCart();
                showMessage("your order is placed");
                document.location.hash = "/";
            };
    });
    
 },
 render : () => {
    const {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    totalPrice} = convertCartToOrder();
    return `
    <div>
        <div class="order">
            <div class="order-info">
                <div>
                    <h2>Shipping</h2>
                    <div>
                        Adress:${shipping.address}, City:${shipping.city}, ZIP:${shipping.ZIP}, Country:${shipping.country}
                    </div>
                </div>
                <div>
                    <h2>Payment</h2>
                    <div>
                        Payment Method : ${payment.paymentMethod}
                    </div>
                </div>
            <div>
                <ul class="cart-list-container">
                    <li>
                        <h2>Shipping Cart</h2>
                        <div>Price</div>
                    </li>
                    ${
                        orderItems.map((item) => `
                        <li>
                            <div class="cart-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                                <div class="cart-name">
                                <div>
                                    <a href="/#/product/${item.product}">${item.name}</a>
                                </div>
                                <div> Qty: ${item.qty} </div>
                            </div>
                            <div class="cart-price">$${item.price}</div>
                        </li>
                        `          
                    )}
                </ul>
            </div>
        </div>
        <div class="order-action">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li><div>Items</div><div>$${itemsPrice}</div></li>
                            <li><div>Shipping</div><div>  </div></li>
                            <li><div>Tax</div><div>  </div></li>
                            <li class="total"><div>Order Total</div><div>$${totalPrice}</div></li>
                            <li>
                            <button class="primary fw" id="placeOrderButton">
                            Place Order
                            </button>
                            </li>
                        </ul>
        </div>
    </div>
</div>
    `;
 },
};
export default PlaceOrderScreen;