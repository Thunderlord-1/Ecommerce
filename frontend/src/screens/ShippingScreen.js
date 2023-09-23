import { getShipping, setShipping } from "../localStorage.js";

const ShippingScreen = {
    after_render: () => {
      document
        .getElementById('shipping-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          setShipping({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            Cellphone: document.getElementById('Cellphone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            ZIP: document.getElementById('ZIP').value,
            country: document.getElementById('country').value,
          });
          document.location.hash = '/payment';
        });
    },
    render: () => {
     
      const { name, email, Cellphone, address, city, ZIP, country } = getShipping();
      return `
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
            <li>
              <h1>Shipping</h1>
            </li>
            <li>
              <label for="name">Full Name<span class="required">*</span></label>
              <input type="text" name="name" id="name" value="${name}" required >
            </li>
            <li>
              <label for="email">Email<span class="required">*</span></label>
              <input type="text" name="email" id="email" value="${email}" required >
            </li>
            <li>
              <label for="Cellphone">Cellphone<span class="required">*</span></label>
              <input type="text" name="Cellphone" id="Cellphone" value="${Cellphone}" required >
            </li>
            <li>
              <label for="address">Shipping address<span class="required">*</span></label>
              <input type="text" name="address" id="address" value="${address}" required >
            </li>
            
            <li>
              <label for="country">Country<span class="required">*</span></label>
              <input type="text" name="country" id="country" value="${country}" required>
            </li>
            <li>
              <label for="city">City<span class="required">*</span></label>
              <input type="text" name="city" id="city" value="${city}" required>
            </li>
            <li>
              <label for="ZIP">ZIP Code<span class="required">*</span></label>
              <input type="text" name="ZIP" id="ZIP" value="${ZIP}" required>
            </li>
            <li>
                    <span class="required">*Required fields</span>
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
  export default ShippingScreen;
  