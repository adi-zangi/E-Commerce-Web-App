import { FC } from 'react';

interface Props {
   name: string;
   price: string;
   image: string;
}

export const imageStyle = {
   width: 190,
   height: 190,
}

export const cardStyle = {
   width: 370,
   height: 235,
   borderThickness: 1,
}

const ItemCard: FC<Props> = (props: Props) => {
   return (
      <div className="Item-card" style={cardStyle}>
         <a className="Item-link">
            <img src={props.image} style={imageStyle} alt="image" />
            <div className="Item-desc">
               <div className="Item-name">{props.name}</div>
               <div className="Item-price">{"$" + props.price}</div>
            </div>
         </a>
      </div>
   );
}

 export default ItemCard;