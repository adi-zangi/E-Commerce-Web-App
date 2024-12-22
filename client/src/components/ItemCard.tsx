import { FC } from 'react';

interface Props {
   name: string
   image: string
}

export const imageStyle = {
   width: 200,
   height: 200,
}

export const cardStyle = {
   width: imageStyle.width,
   height: 235,
   borderThickness: 1,
}

const ItemCard: FC<Props> = (props: Props) => {
   return (
      <div className="Item-card" style={cardStyle}>
         <a className="Item-link">
            <img src={props.image} style={imageStyle} alt="logo" />
            <p>{props.name}</p>
         </a>
      </div>
   );
}

 export default ItemCard;