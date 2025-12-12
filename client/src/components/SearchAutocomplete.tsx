/**
 * A menu that displays autocomplete search suggestions
 */

import { Button } from "@blueprintjs/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { getSimilarPastSearches } from "../data/dataService";
import { AxiosResponse } from "axios";
import { SearchHistory } from "../utils/dataTypes";
import { useNavigate } from "react-router-dom";
import { SearchState } from "./SearchBox";
import { sortSearchSuggestionsByRelevance } from "../utils/dataUtils";

interface Props {
   searchState: SearchState;
   setSearchState: Dispatch<SetStateAction<SearchState>>;
}

interface State {
   suggestionsList: string[];
}

const SearchAutocomplete: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>({
      suggestionsList: []
   });

   const navigate = useNavigate();

   useEffect(() => {
      const getAutocompleteList = async () => {
         await getSimilarPastSearches(props.searchState.query)
         .then((res: AxiosResponse<SearchHistory[]>) => {
            const suggestions = sortSearchSuggestionsByRelevance(res.data,
               props.searchState.query);
            let topSuggestions = suggestions.slice(0, 6);
            const suggestionsList = topSuggestions.map(searchHistory => 
               searchHistory.query);
            setState(prevState => ({ ...prevState, suggestionsList: suggestionsList }));
         })
         .catch((e: Error) => {
            console.log(e);
         });
      }
      getAutocompleteList();
   }, [props.searchState.query]);

   const handleItemClick = (itemText: string) => {
      navigate("/results/search?q=" + encodeURIComponent(itemText));
      props.setSearchState({ ...props.searchState, showAutocomplete: false });
   }

   const autocompleteList = () => {
      const items = state.suggestionsList.map(item => 
         <Button
            key={item}
            className="bp5-minimal"
            alignText="start"
            text={item}
            onClick={() => handleItemClick(item)}
         />
      );

      return items;
   }

   return (
      <div className="Search-autocomplete-menu">
         {autocompleteList()}
      </div>
   );
}

export default SearchAutocomplete;