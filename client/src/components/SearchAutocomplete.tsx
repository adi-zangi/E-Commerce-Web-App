/**
 * A menu that displays autocomplete search suggestions
 */

import { Button } from "@blueprintjs/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { getAutocompleteSearchList } from "../utils/dataService";
import { AxiosResponse } from "axios";
import { Category } from "../utils/dataTypes";
import { useNavigate } from "react-router-dom";
import { SearchState } from "./SearchBox";

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
         await getAutocompleteSearchList(props.searchState.query)
         .then((res: AxiosResponse<Array<Category>>) => {
            const suggestionsList = res.data.map(category => 
               category.category_name.toLowerCase());
            setState(prevState => ({ ...prevState, suggestionsList: suggestionsList }));
         })
         .catch((e: Error) => {
            console.log(e);
         });
      }
      getAutocompleteList();
   }, [props.searchState.query]);

   const handleItemClick = (itemText: string) => {
      navigate("/results/search/?q=" + itemText.replaceAll(/\s/g, "+"));
      props.setSearchState({ ...props.searchState, showAutocomplete: false });
   }

   const autocompleteList = () => {
      const items = state.suggestionsList.map(item => 
         <Button
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