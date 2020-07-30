import React from 'react';
import Directory from '../../components/Directory/Directory';

import './homepage.styles.scss';

export const Homepage = props => {
  console.log(props);
  
  return ( 
    <div className="homepage">
      <Directory />
    </div>
  );
};