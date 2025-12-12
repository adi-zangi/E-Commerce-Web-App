/**
 * A card that displays a single store product in a grid view
 */

import { FC } from 'react';

interface Props {
   name: string;
   price: string;
   image: string;
}

export const imageStyle = {
   width: 180,
   height: 180,
}

export const gridItemStyle = {
   width: 370,
   height: 245,
   borderThickness: 1,
}

const GridItem: FC<Props> = (props: Props) => {
   return (
      <div className="Item-card" style={gridItemStyle}>
         <a className="Item-link" href={window.location.href}>
            <img src={props.image} style={imageStyle} alt="" />
            <div className="Item-desc">
               <div className="Item-price">{"$" + props.price}</div>
               <div className="Item-name">{props.name}</div>
            </div>
         </a>
      </div>
   );
}

 export default GridItem;