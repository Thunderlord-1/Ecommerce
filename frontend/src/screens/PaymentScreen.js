import { setPayment } from "../localStorage.js";

const PaymentScreen = {
    after_render: () => {
      document
        .getElementById('payment-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
          setPayment({ paymentMethod });
          document.location.hash = '/placeorder';
        });
    },
    render: () => {
     
   
      return `
      <div class="form-container">
        <form id="payment-form">
          <ul class="form-items">
            <li>
              <h1>Payment</h1>
            </li>
            <li>
                <div>
                    <input type="radio" name="payment-method" id="paypal" value="Paypal" checked>
                    <label for="paypal">Paypal</label>
                </div>
                <div>
                    <input type="radio" name="payment-method" id="stripe" value="Stripe" >
                    <label for="stripe">Stripe</label>
                </div>
                <div>
                    <input type="radio" name="payment-method" id="master-card" value="master-card" >
                    <label for="master-card">Master card</label>
                </div>
                <div>
                    <input type="radio" name="payment-method" id="american-express" value="american-express" >
                    <label for="american-express">American express</label>
                </div>
            </li>
            <li>
              <button type="submit" class="primary">Continue</button>
            </li>        
          </ul>
        </form>
      </div>
      `;
    },
  };
  export default PaymentScreen;
  