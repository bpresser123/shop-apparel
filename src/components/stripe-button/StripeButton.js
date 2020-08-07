import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publichablekey = 'pk_test_51HApPiA1KjHK3z6zkcosjhI1Nr0XymIygnFC386wZRG0LlotpgISoO6iBwhy4meOF4tMIsr3lDvcviPPRRz4b2qy00Dgae1amQ'
  const onToken = token => {
    console.log(token)
    alert("Payment Successful!")
  }

  return (
    <StripeCheckout 
      label='Pay with 💳'
      name='CRWN clothing Ltd'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publichablekey}
    />
  )
} 

export default StripeCheckoutButton;