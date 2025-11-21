/**
 * A menu that has display options for search results
 */

import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { FC } from "react";
import { SortOption } from "../utils/dataTypes";
import { useSearchParams } from "react-router-dom";

interface Props {
   sortByOption: string;
   numberOfResults: number;
}

const sortByOptions = [SortOption.Relevance, SortOption.AscendingPrice, SortOption.DescendingPrice];

const SearchResultsOptionsMenu: FC<Props> = (props: Props) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const handleClick = (index: number) => {
      const sortParam = sortByOptions[index];
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("sort", sortParam);
      setSearchParams(newSearchParams);
   }

   const SortByDropdownMenu = () => {
      const menuItems : any = [];
      sortByOptions.forEach((option, index) => {
         menuItems.push(
            <MenuItem 
               key={index} 
               text={option}
               onClick={() => handleClick(index)}
            />)
      });

      const dropdownMenu =
         <Menu>
            {menuItems}
         </Menu>;

      return (
         <Popover
            minimal
            className="Sort-btn-container"
            content={dropdownMenu}
            placement="bottom">
            <Button
               id="sortBtn"
               className="Sort-btn"
               variant="outlined"
               alignText="start"
               endIcon="caret-down"
               text={"Sort by: " + props.sortByOption}>
            </Button>
         </Popover>
      )
   }

   const NoMatchesFound = () => {
      return (
         <div className="No-results-header">
            No matches found
         </div>
      );
   }

   const ResultsMenu = () => {
      return (
         <div className="Results-header">
            <p className="Results-title">
               Found {props.numberOfResults} products
            </p>
            <SortByDropdownMenu />
         </div>
      );
   }

   return (
      <>
         { props.numberOfResults === 0 &&
              <NoMatchesFound />
         }
         { props.numberOfResults > 0 && 
            <ResultsMenu />
         }
      </>
   );
}

export default SearchResultsOptionsMenu;