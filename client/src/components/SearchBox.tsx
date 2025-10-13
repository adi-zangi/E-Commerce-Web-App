/**
 * A search box that allows to search for store products
 */

import { FC, useEffect } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useRef } from 'react';
import { AppState } from '../utils/dataTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
   state: AppState;
}

const SearchBox: FC<Props> = (props: Props) => {

   const navigate = useNavigate();

   const [searchParams] = useSearchParams();

   const searchBox = useRef<HTMLInputElement>(null);

   const handleSearchClick = () => {
      const query = searchBox.current?.value;
      if (query !== undefined) {
         if (query.length > 0) {
            navigate("/results/search/?q=" + query.replaceAll(/\s/g, "+"));
         } else {
            navigate("/results/all");
         }
      }
   }

   useEffect(() => {
      if (searchBox.current) {
         let query = "";
         if (searchParams.has("q")) {
            query = searchParams.get("q") + "";
            query = query.replaceAll("+", " ");
         }
         if (searchBox.current && (searchBox.current.value !== query)) {
            searchBox.current.value = query;
         }
      }
   }, [searchParams]);

   return (
      <div className="Search-bar">
         <InputGroup
            id="searchInput"
            className="Navbar-search Search-input bp5-large"
            type="search"
            placeholder="Search Products"
            inputRef={searchBox} />
         <Button
            id="searchBtn"
            className="bp5-minimal"
            icon="search"
            onClick={handleSearchClick} />
      </div>
   );
}

 export default SearchBox;