import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutbutton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H6XAfKqHfpSk4ZR4QIC57vZEW7xWZIxPJFnfvknNlqgJ0ldVwoURczCgeWCefehBRYW2mnziieXB1WeqVCeuD9H00xdBPzuK4';

    const onToken = token => {
        console.log (token);
        alert('Payment Successful');
    }
    return(
        <StripeCheckout
        label = 'Pay Now'
        name = 'CRWN CLOTHING'
        billingAddress
        shippingAddress
        image = 'https://svgshare.com/i/CUz.svg'
        description = {`Your Total is $${price}`}
        amount = {priceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}
        />
    )
};

export default StripeCheckoutbutton ;