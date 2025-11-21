/**
 * A container that displays search results and allows to navigate between
 * pages of search results
 */

import { FC, useEffect, useRef, useState } from "react";
import { AppState, Product } from "../utils/dataTypes";
import SearchResultsGridView from "./SearchResultsGridView";
import { Button, NumericInput, Spinner } from "@blueprintjs/core";
import { getProductsByCategory, searchForProducts } from "../utils/dataService";
import { AxiosResponse } from "axios";
import { recordSearch, sortProductsByRelevance } from "../utils/dataUtils";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
   state: AppState;
}

interface PagePickerProps {
   numberOfPages: number;
   selectedPage: number;
   setPage: (page : number) => void;
}

interface State {
   loading: boolean;
   results: Array<Product>;
   selectedPage: number;
   pageData: Array<Product>;
   itemsPerPage: number;
   numberOfPages: number;
}

interface Params {
   query: string | null;
   categoryId: number | null;
}

export const styleVars = {
   widthFactor: 0.9
}

const containerStyle = {
   width: styleVars.widthFactor * 100 + 'vw'
}

/**
 * Returns an object containing search parameters from the given URLSearchParams
 * @param params The search parameters as URLSearchParams 
 * @param idToCategoryMap A map of category id's and names
 * @returns An object containing search parameters
 */
const parseSearchParams = (params: URLSearchParams, idToCategoryMap: Map<number, string>) : Params => {
   let query = params.get("q");
   let category = params.get("c");
   let categoryId = null;
   
   if (category) {
      idToCategoryMap.forEach((val, key) => {
         if (val === category) {
            categoryId = key;
         }
      });
   }
   
   return {query: query, categoryId: categoryId};
}

/**
 * Gets the search results from the database based on the current query or
 * selected shop category
 * @param params Search parameters from the current url
 */
const getSearchResults = (params: Params) : Promise<AxiosResponse<any, any>> => {
   if (params.query) {
      return searchForProducts(params.query);
   } else if (params.categoryId) {
      return getProductsByCategory(params.categoryId);
   } else {
      return searchForProducts("");
   }
}

/**
 * Sorts the search results by relevance
 * @param results The search results
 * @param params Search parameters from the current url
 * @param idToCategoryMap A map of category id's and names
 */
const sortResults = (results: Product[], params: Params, idToCategoryMap: Map<number, string>) : Product[] => {
   let query = params.query;
   if (query) {
      return sortProductsByRelevance(results, query, idToCategoryMap);
   }
   return results;
}

/**
 * Records the current search to the search history
 * @param params Search parameters from the current url
 */
const addSearchToHistory = async (params: Params) => {
   let query = params.query;
   if (query) {
      await recordSearch(query);
   }
}

/**
 * Returns the number of pages of search results available for the total results
 * @param numberOfResults The number of results
 * @param itemsPerPage The number of items per page
 * @returns The number of pages of search results available
 */
const getNumberOfPages = (numberOfResults: number, itemsPerPage: number): number => {
   return Math.ceil(numberOfResults / itemsPerPage);
}

/**
 * Returns an array of search results to display for the given page number
 * @param results The results array
 * @param pageNumber The page number
 * @param itemsPerPage The number of items per page
 * @returns An array of search results to display for the given page number
 */
const getResultsForPage = (results: Array<Product>, pageNumber: number, itemsPerPage: number)
      : Array<Product> => {
   const startIndex = (pageNumber - 1) * itemsPerPage;
   let endIndex = startIndex + itemsPerPage;
   endIndex = endIndex < results.length ? endIndex : results.length;
   return results.slice(startIndex, endIndex);
}

const PagePicker: FC<PagePickerProps> = (props: PagePickerProps) => {

   const pageInputField = useRef<HTMLInputElement>(null);

   const setPageField = (page: number) => {
      if (pageInputField.current) {
         pageInputField.current.value = page.toString();
      }
   }

   const setPage = (page: number) => {
      props.setPage(page);
      setPageField(page);
   }

   const handlePageUpClick = () => {
      if (pageInputField.current?.value !== props.selectedPage.toString()) {
         handlePageInputChange();
      } else if (props.selectedPage < props.numberOfPages) {
         setPage(props.selectedPage + 1);
      }
   }

   const handlePageDownClick = () => {
      if (pageInputField.current?.value !== props.selectedPage.toString()) {
         handlePageInputChange();
      } else if (props.selectedPage > 1) {
         setPage(props.selectedPage - 1);
      }
   }

   const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         handlePageInputChange();
      }
   }

   const handlePageInputChange = () => {
      if (pageInputField.current) {
         const pageInput = Number(pageInputField.current.value);
         if ((pageInput >= 1) && (pageInput <= props.numberOfPages)) {
            setPage(pageInput);
         }
      }
   }

   setPageField(props.selectedPage);

   return (
      <div className="Page-picker">
         <Button
            className="Page-down-btn bp5-minimal"
            icon="chevron-left"
            onClick={handlePageDownClick}
         />
         {"Page"}
         <NumericInput
            inputRef={pageInputField}
            inputClassName="Page-input"
            buttonPosition="none"
            selectAllOnFocus
            defaultValue={props.selectedPage}
            onKeyDown={handleKeyDown}
         />
         {"of " + props.numberOfPages}
         <Button
            className="Page-up-btn bp5-minimal"
            icon="chevron-right"
            onClick={handlePageUpClick}
         />
      </div>
   );
}

const SearchResults: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>({
      loading: true,
      results: [],
      selectedPage: 0,
      pageData: [],
      itemsPerPage: 0,
      numberOfPages: 0,
   });

   const [searchParams] = useSearchParams();
   const location = useLocation();

   useEffect(() => {
      const initializeData = async () => {
         if (props.state.idToCategoryMap.size === 0) {
            return;
         }
         let results = new Array<Product>();
         const params = parseSearchParams(searchParams, props.state.idToCategoryMap);
         await getSearchResults(params)
            .then((res: any) => {
               results = res.data;
            })
            .catch((e: Error) => {
               console.error(e);
            });
         results = sortResults(results, params, props.state.idToCategoryMap);
         const itemsPerPage = 6;
         if (results.length > 0) {
            await addSearchToHistory(params);
         }
         setState({
            loading: false,
            results: results,
            selectedPage: 1,
            pageData: getResultsForPage(results, 1, itemsPerPage),
            itemsPerPage: itemsPerPage,
            numberOfPages: getNumberOfPages(results.length, itemsPerPage),
         });
      }
      initializeData();
   }, [location, props.state.idToCategoryMap]);

   const setPage = (page: number) => {
      setState({
         ...state,
         selectedPage: page,
         pageData: getResultsForPage(state.results, page, state.itemsPerPage)
      })
   }

   return (
      <div className="Results-container" style={containerStyle}>
         { state.loading && 
               <div className="Spinner-container">
                  <Spinner intent="primary" />
               </div>
         }
         { !state.loading && (state.results.length === 0) &&
               <div className="No-results-header">
                  No matches found
               </div>
         }
         { !state.loading && (state.results.length > 0) && 
               <SearchResultsGridView
                  state={props.state}
                  products={state.pageData}
                  numberOfResults={state.results.length} />
         }
         { !state.loading && (state.results.length > 0) && 
               <PagePicker
                  numberOfPages={state.numberOfPages}
                  selectedPage={state.selectedPage} 
                  setPage={setPage} />
         }
      </div>
   );
}

export default SearchResults;
