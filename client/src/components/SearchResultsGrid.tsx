/**
 * Displays a list of products as a grid that adjusts to the window size
 */

import { FC, useEffect, useState } from 'react';
import { AppState, Product } from '../utils/dataTypes';
import GridItem, { gridItemStyle } from './GridItem';

interface Props {
   state: AppState;
   products: Array<Product>;
}

interface GridProps {
   products: Array<Product>;
}

interface State {
   windowWidth: number;
}

const styles = {
   gridContainerStyle: {},
   gridStyle: {},
}

/**
 * Sets the CSS style objects for the grid and grid container based on how many
 * items can fit on the screen
 * @param windowWidth The current window's width
 * @param windowHeight The current window's height
 */
const setGridDimensions = (windowWidth: number) => {
   const cellWidth = gridItemStyle.width + (2 * gridItemStyle.borderThickness);
   const cellGap = 6;
   const widthFactor = 0.9;
   const itemsPerRow = Math.floor((windowWidth * widthFactor) / (cellWidth + cellGap));
   const containerWidth = itemsPerRow * (cellWidth + cellGap) - cellGap;

   styles.gridContainerStyle = {
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

const GridView: FC<GridProps> = (props: GridProps) => {
   const gridCells = props.products.map(item =>
      <GridItem
         key={item.product_id}
         name={item.product_name}
         price={item.price}
         image={item.image_link} />
   );
   
   return (
      <div style={styles.gridStyle}>
         {gridCells}
      </div>
   );
}

const SearchResultsGrid: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>({ 
      windowWidth: window.innerWidth,
   });

   useEffect(() => {
      const handleResize = () => {
         setState({
            windowWidth: window.innerWidth,
         })
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      }
   }, [props.state.page]);

   setGridDimensions(state.windowWidth);

   return (
      <div className="Grid-container" style={styles.gridContainerStyle}>
         <GridView products={props.products} />
      </div>
   );
}

export default SearchResultsGrid;