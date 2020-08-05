import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

export const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <CustomButtonContainer
    className={`${inverted ? 'inverted' : ''} ${
      isGoogleSignIn ? 'google-sign-in' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </CustomButtonContainer>
);