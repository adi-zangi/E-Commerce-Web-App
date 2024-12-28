import { FC, useEffect, useRef, useState } from "react";
import { AppState, Product } from "../utils/dataTypes";
import SearchResultsGridView from "./SearchResultsGridView";
import { Button, NumericInput, Spinner } from "@blueprintjs/core";
import { searchForProducts } from "../utils/dataService";

interface Props {
   state: AppState;
   setState: (newState : AppState) => void;
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

/**
 * Returns the number of pages of search results available for the total results
 * @param numberOfResults The number of results
 * @param itemsPerPage The number of items per page
 * @returns The number of pages of search results available
 */
export const getNumberOfPages = (numberOfResults: number, itemsPerPage: number): number => {
   return Math.ceil(numberOfResults / itemsPerPage);
}

/**
 * Returns an array of search results to display for the given page number
 * @param results The results array
 * @param pageNumber The page number
 * @param itemsPerPage The number of items per page
 * @returns An array of search results to display for the given page number
 */
export const getResultsForPage = (results: Array<Product>, pageNumber: number, itemsPerPage: number)
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

   useEffect(() => {
      const initializeData = async () => {
         let results = new Array<Product>();
         await searchForProducts(props.state.searchQuery)
            .then(response => {
               results = response.data;
            })
            .catch((e: Error) => {
               console.error(e);
            });
         const itemsPerPage = 6;
         setState({
            loading: false,
            results: results,
            selectedPage: 1,
            pageData: getResultsForPage(results, 1, itemsPerPage),
            itemsPerPage: itemsPerPage,
            numberOfPages: getNumberOfPages(results.length, itemsPerPage),
         })
      }
      initializeData();
   }, [props]);

   const setPage = (page: number) => {
      setState({
         ...state,
         selectedPage: page,
         pageData: getResultsForPage(state.results, page, state.itemsPerPage)
      })
   }

   if (state.loading) {
      return (
         <div className="Spinner-container">
            <Spinner intent="primary" />
         </div>
      );
   } else if (state.results.length === 0) {
      return (
         <div className="No-results-header">
            No matches found
         </div> 
      );
   } else {
      return (
         <div>
            <SearchResultsGridView
               state={props.state}
               setState={props.setState}
               products={state.pageData}
               numberOfResults={state.results.length} />
            <PagePicker
               numberOfPages={state.numberOfPages}
               selectedPage={state.selectedPage} 
               setPage={setPage} />
         </div>
      );
   }
}

export default SearchResults;
