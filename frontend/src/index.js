
import HomeScreen from './screens/HomeScreen.js';
import { hideLoading, parseRequestUrl, showLoading } from './util.js';
import Error404Screen from './screens/Error404Screen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceorderScreen.js';
import PrivacyPolicyScreen from './screens/PriviacyPolicyScreen.js';
import ContactUsScreen from './screens/ContactUsScreen.js';
import AboutUsScreen from './screens/AboutUsScreen.js';
import MoneyBackScreen from './screens/MoneyBackScreen.js';
import StepsScreen from './screens/StepsScreen.js';
import FaqScreen from './screens/FaqScreen.js';


const routes ={
    "/": HomeScreen,
    "/product/:id": ProductScreen, 
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
    "/shipping": ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
    '/privacy-policy': PrivacyPolicyScreen,
    "/contact-us": ContactUsScreen,
    "/about-us":AboutUsScreen,
    "/moneyback":MoneyBackScreen,
    "/steps": StepsScreen,
    "/faq": FaqScreen,
}
const router = async () =>{
    showLoading();
    const request =parseRequestUrl();
    const parseUrl =
     (request.resource ? `/${request.resource}` : '/') +
    (request.id? `/:id` : '') + (request.action? `/${request.action}`: '');
     
    const screen = routes[parseUrl]? routes[parseUrl] : Error404Screen;
    const main=document.getElementById('main-container');
    main.innerHTML  = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};
window.addEventListener('load',router);
window.addEventListener('hashchange',router);