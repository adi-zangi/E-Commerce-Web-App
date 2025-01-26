/**
 * The main application component
 */

import { FC, useEffect, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import AppNavBar from './AppNavBar';
import { AppState, Page } from '../utils/dataTypes';
import SearchResults from './SearchResults';
import TopMenu from './TopMenu';
import LogInPage from './LogInPage';
import { getIdToCategoryMap } from '../utils/dataUtils';
import { Routes, Route, useLocation } from "react-router-dom";
import NoPage from './NoPage';

const App: FC = () => {
   
   const [state, setState] = useState<AppState>({
      user: null,
      idToCategoryMap: new Map(),
   });

   const [page, setPage] = useState<Page>(Page.Home);

   const location = useLocation();

   const getPage = (pathname: string): Page => {
      if (pathname === "/") {
         return Page.Home;
      } else if (pathname === "/login") {
         return Page.LogIn;
      } else if (pathname.includes("/results")) {
         return Page.SearchResults;
      }
      return Page.NoPage;
   }

   useEffect(() => {
      const getCategoryMap = async () => {
         const categoryMap = await getIdToCategoryMap();
         setState({
            ...state,
            idToCategoryMap: categoryMap,
         });
      }
      getCategoryMap();
   }, []);

   useEffect(() => {
      setPage(getPage(location.pathname));
   }, [location]);
   
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={
               <>
                  <TopMenu
                     page={page}
                     state={state}
                     setState={setState} />
                  <AppNavBar
                     page={page}
                     state={state}
                     setState={setState} />
                  <HomePage
                     page={page}
                     state={state}
                     setState={setState} />
               </>
               }
            />
            <Route path="/login" element={
               <LogInPage
                  page={page}
                  state={state}
                  setState={setState} />
               }
            />
            <Route path="/results/all?/search?/:query?/category?/:category?" element={
               <>
                  <TopMenu
                     page={page}
                     state={state}
                     setState={setState} />
                  <AppNavBar
                     page={page}
                     state={state}
                     setState={setState} />
                  <SearchResults
                     page={page}
                     state={state}
                     setState={setState} />
               </>
               }
            />
            <Route path="*" element={
                  <NoPage />
               }
            />
         </Routes>
      </div>
   );
}

export default App;
