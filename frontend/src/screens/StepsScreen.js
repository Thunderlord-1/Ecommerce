const StepsScreen ={
    render:()=>
    {
         return `
                    <h2><u>Steps to place an order</u> :-</h2>
                    <ul class="box">
                    <li>
                        1. Select the product you want to buy
                    </li>
                    <li>
                        2. Add the selected product to cart
                    </li>
                    <li>
                        3. Do the same for other product you want to buy.
                    </li>
                    <li>
                        4. Click on <strong>Proceed to checkout</strong> Button
                    </li>
                    <li>
                        5. Enter information regarding shipping
                    </li>
                    <li>
                        6. Click on <strong>Continue</strong> button
                    </li>
                    <li>
                        7. Select payment method And click on <strong>Continue</strong> button
                    </li>
                    <li>
                        8. Check the information you have entered is correct or not And click on  <strong>Place Order</strong> Button
                    </li>
                    <li>
                        9. Once your order is placed we will contact you for payment.
                    </li>
                    </ul>

                `;
    },
};
export default StepsScreen;
