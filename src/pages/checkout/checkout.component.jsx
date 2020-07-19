import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCartTotal} from '../../redux/cart/cart.selectors';
import './checkout.styles.scss';
import CartItem from '../../components/cart-item/cart-item.component';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import StripeCheckoutbutton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({cartItems,total}) =>
(
<div className = 'checkout-page'>
    <div className = 'checkout-header'>
        <div className = 'header-block'>
            <span>Product</span>
        </div>
        <div className = 'header-block'>
            <span>Description</span>
        </div>
        <div className = 'header-block'>
            <span>Quantity</span>
        </div>
        <div className = 'header-block'>
            <span>Remove</span>
        </div>
    </div>
    {
        cartItems.map(cartItem =>
            <CheckoutItem key = {cartItem.id} cartItem = {cartItem}/>)
    }
    <div className = 'total'>
        <span>TOTAL ${total}</span>
    </div>
    <div className = 'test-warning'>
        *Please use the following credit card for testing* 4242424242424242 exp:01/21 cvv:123 
    </div>
    <StripeCheckoutbutton price = {total} />

</div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
