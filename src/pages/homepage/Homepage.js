import React from 'react';
import Directory from '../../components/directory/Directory';

import './homepage.styles.scss';

export const Homepage = props => {
  console.log(props);
  
  return ( 
    <div className="homepage">
      <Directory />
    </div>
  );
};