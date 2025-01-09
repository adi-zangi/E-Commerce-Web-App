/**
 * A search box that allows to search for store products
 */

import { FC } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useRef } from 'react';
import { AppState, Page } from '../utils/dataTypes';

interface Props {
   state: AppState;
   setState: (newState : AppState) => void;
}

const SearchBox: FC<Props> = (props: Props) => {

   const searchBox = useRef<HTMLInputElement>(null);

   const handleSearchClick = () => {
      const query = searchBox.current?.value;
      if (query != undefined) {
         props.setState({
            ...props.state,
            page: Page.SearchResults,
            searchQuery: query,
            selectedCategory: null,
         });
      }
   }

   return (
      <div className="Search-bar">
         <InputGroup
            large
            className="Navbar-search Search-input"
            type="search"
            placeholder="Search Products"
            inputRef={searchBox} />
         <Button
            className="bp5-minimal"
            icon="search"
            onClick={handleSearchClick} />
      </div>
   );
}

 export default SearchBox;