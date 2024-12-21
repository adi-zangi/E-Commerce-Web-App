import { FC, useEffect, useState } from 'react';
import { Product } from '../utills/DataTypes';
import ItemCard, { cardStyle } from './ItemCard';

interface Props {
   products: Array<Product>;
}

interface State {
   windowWidth: number;
   windowHeight: number;
}

const styles = {
   containerStyle: {},
   gridStyle: {},
}

/**
 * Sets the CSS style objects for the grid and grid container based on how many
 * items can fit on the screen
 * @param windowWidth The current window's width
 * @param windowHeight The current window's height
 */
const setGridDimensions = (windowWidth: number, windowHeight: number) => {
   const cellWidth = cardStyle.width + (2 * cardStyle.borderThickness);
   const cellHeight = cardStyle.height + (2 * cardStyle.borderThickness);
   const cellGap = 6;

   const itemsPerRow = Math.floor(windowWidth / (cellWidth + cellGap));
   const itemsPerCol = Math.floor(windowHeight / (cellHeight + cellGap));

   const containerWidth = itemsPerRow * (cellWidth + cellGap) - cellGap;
   const containerHeight = itemsPerCol * (cellHeight + cellGap) - cellGap;

   styles.containerStyle = {
      width: containerWidth
   }

   styles.gridStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, " + cellWidth + "px)",
      gridAutoFlow: "row",
      columnGap: cellGap,
      rowGap: cellGap,
   }
}

const SearchResultsGrid: FC<Props> = (props: Props) => {
   const gridCells = props.products.map((item) =>
      <ItemCard key={item.name} name={item.name} image={item.image}/>
   );
   
   return (
      <div style={styles.gridStyle}>
         {gridCells}
      </div>
   );
}

const SearchResultsGridView: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>({ 
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
   });

   useEffect(() => {
      const handleResize = () => {
         setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
         })
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      }
   })

   setGridDimensions(state.windowWidth, state.windowHeight);

   return (
      <div className="Items-container" style={styles.containerStyle}>
         <SearchResultsGrid products={props.products} />
      </div>
   );
}

export default SearchResultsGridView;