import { FC, useEffect, useState } from 'react';
import { AppState } from '../utills/DataTypes';
import ItemCard, { cardStyle } from './ItemCard';
import { getPage } from '../utills/MockData';

interface Props {
   state: AppState;
   setState: (newState : AppState) => void;
}

const itemsPerPage  = 10;
let containerStyle = {};
let gridStyle = {};

/**
 * Sets the css style objects for the grid and grid container based on how many
 * items can fit on the screen
 */
const setGridDimensions = (windowWidth: number, windowHeight: number) => {
   const cellWidth = cardStyle.width + (2 * cardStyle.borderThickness);
   const cellHeight = cardStyle.height + (2 * cardStyle.borderThickness);
   const cellGap = 6;

   const itemsPerRow = Math.floor(windowWidth / (cellWidth + cellGap));
   const itemsPerCol = Math.floor(windowHeight / (cellHeight + cellGap));

   const containerWidth = itemsPerRow * (cellWidth + cellGap) - cellGap;
   const containerHeight = itemsPerCol * (cellHeight + cellGap) - cellGap;

   containerStyle = {
      width: containerWidth,
      height: containerHeight,
   }

   gridStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, " + cellWidth + "px)",
      gridAutoFlow: "row",
      columnGap: cellGap,
      rowGap: cellGap,
   }
}

const SearchResultsPagePicker: FC = () => {
   const pageItems = getPage(1,itemsPerPage);
   const gridCells = pageItems.map((item) => <ItemCard name={item.name} image={item.image}/>);
   
   return (
      <div style={gridStyle}>
         {gridCells}
      </div>
   );
}

const SearchResults: FC<Props> = (props: Props) => {
   const [windowSize, setWindowSize] = useState({ 
      width: window.innerWidth,
      height: window.innerHeight
   });

   useEffect(() => {
      const handleResize = () => {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
         })
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      }
   })

   setGridDimensions(windowSize.width, windowSize.height);

   return (
      <div className="Items-container" style={containerStyle}>
         <SearchResultsPagePicker/>
      </div>
   );
}

 export default SearchResults;