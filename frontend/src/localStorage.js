
export  const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[];
    return cartItems;
}
export const setCartItems =(cartItems) =>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
}

export const getShipping = () => {
    const shipping = localStorage.getItem('shipping')?
    JSON.parse(localStorage.getItem('shipping')):
    {
        name:'',
        email:'',
        Cellphone:'',
        address:'',
        city:'',
        ZIP:'',
        country:'',
    };
    return shipping;
};
export  const setShipping = ({
        name ='',
        email='',
        Cellphone='',
        address='',
        city='',
        ZIP='',
        country='',
}) => {
    localStorage.setItem('shipping',JSON.stringify({name,email,Cellphone,address,city,ZIP,country}));
};
export const getPayment = () => {
    const payment = localStorage.getItem('payment')?
    JSON.parse(localStorage.getItem('payment')):
    {
        paymentMethod: 'paypal',
    };
    return payment;
};
export  const setPayment = ({
        paymentMethod = 'paypal',
}) => {
    localStorage.setItem('payment',JSON.stringify({paymentMethod}));
};
export const cleanCart = () => {
    localStorage.removeItem('cartItems');
}