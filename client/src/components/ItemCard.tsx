import { FC } from 'react';
import { Product } from '../utills/DataTypes';

export const imageStyle = {
   width: 190,
   height: 190,
}

export const cardStyle = {
   width: imageStyle.width + 20,
   height: 235,
   borderThickness: 1,
}

const ItemCard: FC<Product> = (props: Product) => {
   return (
      <div className="Item-card" style={cardStyle}>
         <a className="Item-link">
            <img src={props.image} style={imageStyle} alt="logo" />
            <div className="Item-desc">
               <div className="Item-name">{props.name}</div>
               <div className="Item-price">{"$" + props.price.toFixed(2)}</div>
            </div>
         </a>
      </div>
   );
}

 export default ItemCard;