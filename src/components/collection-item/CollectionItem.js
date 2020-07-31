import React from 'react';
import { connect } from 'react-redux';
import { CustomButton } from '../custom-button/CustomButton';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, add }) => {
  
  const { name, imageUrl, price } = item;
  
  return (
    <div className="collection-item">
      <div className="image" style={{
      backgroundImage: `url(${imageUrl})`
    }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton onClick={() => add(item)} inverted>
        {" "}
        Add to Cart{" "}
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  add: item => {
    return dispatch(addItem(item));
  }
});

export default connect(null, mapDispatchToProps)(CollectionItem);