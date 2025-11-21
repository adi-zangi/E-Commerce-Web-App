/**
 * A menu that has display options for search results
 */

import { Button } from "@blueprintjs/core";
import { FC } from "react";

interface Props {
   numberOfResults: number;
}

const SearchResultsOptionsMenu: FC<Props> = (props: Props) => {

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
            <Button
               className="Sort-btn"
               alignText="start"
               endIcon="caret-down"
               text="Sort by" />
         </div>
      );
   }

   return (
      <>
         { !props.numberOfResults &&
              <NoMatchesFound />
         }
         { props.numberOfResults && 
            <ResultsMenu />
         }
      </>
   );
}

export default SearchResultsOptionsMenu;