/**
 * A search box that allows to search for store products
 */

import { FC, useEffect, useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useRef } from 'react';
import { AppState } from '../utils/dataTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchAutocomplete from './SearchAutocomplete';

interface Props {
   state: AppState;
}

export interface SearchState {
   query: string;
   showAutocomplete: boolean;
}

const SearchBox: FC<Props> = (props: Props) => {
   const [state, setState] = useState<SearchState>({
      query: "",
      showAutocomplete: false,
   });

   const navigate = useNavigate();

   const [searchParams] = useSearchParams();

   const searchContainer = useRef<HTMLDivElement>(null);
   const searchBox = useRef<HTMLInputElement>(null);
   const searchButton = useRef<HTMLButtonElement>(null);

   const handleSearchClick = () => {
      if (state.query.length > 0) {
         navigate("/results/search/?q=" + encodeURIComponent(state.query));
      } else {
         navigate("/results/all");
      }
      setState(({ ...state, showAutocomplete: false }));
   }

   const handleValueChange = (value: string) => {
      setState({
         ...state,
         query: value,
         showAutocomplete: value.length > 0,
      });
   }

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchButton.current) {
         if (event.key === 'Enter') {
            searchButton.current.focus();
            searchButton.current.click();
         }
      }
   }

   /**
    * Checks if any child element of this component is focused
    * If not, hides the autocomplete suggestions
    * @param event the onBlur event on the search input
    */
   const handleFocusOutInput = (event: React.FocusEvent<HTMLInputElement>) => {
      const container = searchContainer.current;
      if (container) {
         if (!container.contains(event.relatedTarget) && state.showAutocomplete) {
            setState(({ ...state, showAutocomplete: false }));
         }
      }
   }

   useEffect(() => {
      if (searchBox.current) {
         let query = "";
         if (searchParams.has("q")) {
            query = searchParams.get("q") + "";
         }
         if (searchBox.current && (searchBox.current.value !== query)) {
            searchBox.current.value = query;
            const showAutocomplete = query === "" ? false : state.showAutocomplete;
            setState({
               ...state,
               query: query,
               showAutocomplete: showAutocomplete,
            });
         }
      }
   }, [searchParams]);

   return (
      <div className="Search-container" ref={searchContainer}>
         <div className="Search-bar">
            <InputGroup
               id="searchInput"
               className="Navbar-search Search-input bp5-large"
               type="search"
               placeholder="Search Products"
               inputRef={searchBox}
               onValueChange={handleValueChange}
               onKeyDown={handleKeyDown}
               onBlur={handleFocusOutInput} />
            <Button
               id="searchBtn"
               className="bp5-minimal"
               icon="search"
               ref={searchButton}
               onClick={handleSearchClick} />
         </div>
         { state.showAutocomplete &&
            <SearchAutocomplete
               searchState={state}
               setSearchState={setState}
            />
         }
      </div>
   );
}

 export default SearchBox;