/**
 * Displays search results and allows to navigate between pages of search
 * results
 */

import { FC, useEffect, useRef, useState } from "react";
import { AppState, Product, SortOption } from "../utils/dataTypes";
import SearchResultsGrid from "./SearchResultsGrid";
import { Button, Spinner } from "@blueprintjs/core";
import { getProductsByCategory, searchForProducts, updateSearchHistory } from "../data/dataService";
import { AxiosResponse } from "axios";
import { sortProductsByRelevance } from "../utils/dataUtils";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchResultsOptionsMenu from "./SearchResultsOptionsMenu";

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
   query: string | null;
   categoryId: number | null;
   sortBy: string;
}

interface Params {
   query: string | null;
   categoryId: number | null;
   sortBy: string;
}

/**
 * Gets the search results from the database based on the current query or
 * selected shop category
 * @param params Search parameters from the current url
 */
const getSearchResults = (params: Params) : Promise<AxiosResponse<Product[]>> => {
   const sortOption = params.sortBy ? params.sortBy : SortOption.Relevance;
   if (params.query) {
      return searchForProducts(params.query, sortOption);
   } else if (params.categoryId) {
      return getProductsByCategory(params.categoryId, sortOption);
   } else {
      return searchForProducts("", sortOption);
   }
}

/**
 * Sorts the search results
 * @param results The search results
 * @param params Search parameters from the current url
 * @param idToCategoryMap A map of category id's and names
 * @returns The sorted search results
 */
const sortResults = (results: Product[], params: Params, idToCategoryMap: Map<number, string>) : Product[] => {
   let query = params.query;
   if (query && (params.sortBy === SortOption.Relevance)) {
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
      await updateSearchHistory(query)
         .catch((e: Error) => {
            console.error(e);
         });
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

   const pageNumber = useRef<HTMLParagraphElement>(null);

   const setPageField = (page: number) => {
      if (pageNumber.current) {
         pageNumber.current.textContent = `Page ${page} of ${props.numberOfPages}`;
      }
   }

   const setPage = (page: number) => {
      props.setPage(page);
      setPageField(page);
   }

   const handlePageUpClick = () => {
      if (props.selectedPage < props.numberOfPages) {
         setPage(props.selectedPage + 1);
      }
   }

   const handlePageDownClick = () => {
      if (props.selectedPage > 1) {
         setPage(props.selectedPage - 1);
      }
   }

   return (
      <div className="Page-picker">
         <Button
            className="Page-down-btn bp5-minimal"
            icon="chevron-left"
            onClick={handlePageDownClick}
         />
         <p className="Page-text">
            Page {props.selectedPage} / {props.numberOfPages}
         </p>
         <Button
            className="Page-up-btn bp5-minimal"
            icon="chevron-right"
            onClick={handlePageUpClick}
         />
      </div>
   );
}

const SearchResultsPage: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>({
      loading: true,
      results: [],
      selectedPage: 0,
      pageData: [],
      itemsPerPage: 0,
      numberOfPages: 0,
      query: null,
      categoryId: null,
      sortBy: "",
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
            .then((res: AxiosResponse<Product[]>) => {
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
            query: params.query,
            categoryId: params.categoryId,
            sortBy: params.sortBy,
         });
      }
      initializeData();
   }, [location, props.state.idToCategoryMap]);

   /**
    * Returns an object containing search parameters from the given URLSearchParams
    * @param params The search parameters as URLSearchParams 
    * @param idToCategoryMap A map of category id's and names
    * @returns An object containing search parameters
    */
   const parseSearchParams = (params: URLSearchParams, idToCategoryMap: Map<number, string>) : Params => {
      let query = params.get("q");
      let category = params.get("c");
      let sortBy = params.get("sort");
      let categoryId = null;
      
      if (category) {
         idToCategoryMap.forEach((val, key) => {
            if (val === category) {
               categoryId = key;
            }
         });
      }
      
      if (!sortBy) {
         sortBy = SortOption.Relevance;
      } else if ((state.query && (query !== state.query)) ||
                  (state.categoryId && (categoryId !== state.categoryId))) {
         sortBy = SortOption.Relevance;
      }
      
      return {query: query, categoryId: categoryId, sortBy: sortBy};
   }

   const setPage = (page: number) => {
      setState({
         ...state,
         selectedPage: page,
         pageData: getResultsForPage(state.results, page, state.itemsPerPage)
      })
   }

   return (
      <div className="Results-container">
         { state.loading && 
               <div className="Spinner-container">
                  <Spinner intent="primary" />
               </div>
         }
         { !state.loading &&
               <SearchResultsOptionsMenu
                  sortByOption={state.sortBy}
                  numberOfResults={state.results.length} />
         }
         { !state.loading && (state.results.length > 0) && 
               <SearchResultsGrid
                  state={props.state}
                  products={state.pageData} />
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

export default SearchResultsPage;
