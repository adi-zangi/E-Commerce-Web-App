import { FC, useRef, useState } from "react";
import { AppState, Product } from "../utills/DataTypes";
import SearchResultsGridView from "./SearchResultsGridView";
import { getDataForPage, getNumberOfPages } from "../utills/MockData";
import { Button, NumericInput } from "@blueprintjs/core";

interface Props {
   state: AppState;
   setState: (newState : AppState) => void;
}

interface PagePickerProps {
   numberOfPages: number;
   selectedPage: number;
   setPage: (page : number) => void;
}

type State = {
   itemsPerPage: number,
   numberOfPages: number,
   selectedPage: number,
   pageData: Array<Product>,
}

/**
 * Gets the search results for a given search query and page number from the
 * database
 * @param query The search query
 * @param page The page number
 * @param itemsPerPage The number of items per page
 * @returns Array of products
 */
const getResultsForPage = (query: string, page: number, itemsPerPage: number): Array<Product> => {
   return getDataForPage(query, page, itemsPerPage);
}

const PagePicker: FC<PagePickerProps> = (props: PagePickerProps) => {

   const pageInputField = useRef<HTMLInputElement>(null);

   const setPage = (page: number) => {
      props.setPage(page);
      if (pageInputField.current) {
         pageInputField.current.value = page.toString();
      }
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
      itemsPerPage: 10,
      numberOfPages: getNumberOfPages(props.state.searchQuery, 10),
      selectedPage: 1,
      pageData: getResultsForPage(props.state.searchQuery, 1, 10),
   });

   const setPage = (page: number) => {
      setState({
         ...state,
         selectedPage: page,
         pageData: getResultsForPage(props.state.searchQuery, page, state.itemsPerPage)
      })
   }

   return (
      <div className="Search-results">
         <SearchResultsGridView products={state.pageData} />
         <PagePicker
            numberOfPages={state.numberOfPages}
            selectedPage={state.selectedPage} 
            setPage={setPage} />
      </div>
   );
}

export default SearchResults;