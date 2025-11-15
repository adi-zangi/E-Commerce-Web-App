/**
 * The main application component
 */

import { FC, useEffect, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import AppNavBar from './AppNavBar';
import { AppState, Page, User } from '../utils/dataTypes';
import SearchResults from './SearchResults';
import TopMenu from './TopMenu';
import LogInPage from './LogInPage';
import { getIdToCategoryMap } from '../utils/dataUtils';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import NoPage from './NoPage';
import CreateUserPage from './CreateUserPage';

/**
 * Returns the value of a page from the Page enum that matches the given pathname
 * @param pathname The pathname of a URL
 * @returns The Page enum value based on the given pathname
 */
const getPageFromPath = (pathname: string): Page => {
   if (pathname === "/") {
      return Page.Home;
   } else if (pathname === "/login") {
      return Page.LogIn;
   } else if (pathname.includes("/results")) {
      return Page.SearchResults;
   }
   return Page.NoPage;
}

const App: FC = () => {
   
   const [state, setState] = useState<AppState>(() => ({
      page: Page.Home,
      user: null,
      loading: true,
      idToCategoryMap: new Map(),
   }));

   const navigate = useNavigate();
   const location = useLocation();

   // Gets the initial state of the app
   useEffect(() => {
      const initState = async () => {
         const user = localStorage.getItem("user") + "";
         const userObj = JSON.parse(user) as User;
         const categoryMap = await getIdToCategoryMap();
         setState({
            user: userObj,
            page: getPageFromPath(location.pathname),
            loading: false,
            idToCategoryMap: categoryMap,
         });
      }
      initState();
      // eslint-disable-next-line
   }, []);

   // Updates the current page type whenever the URL changes
   useEffect(() => {
      if (!state.loading) {
         setState(prevState => ({
            ...prevState,
            page: getPageFromPath(location.pathname),
         }));
      }
   }, [state.loading, location.pathname]);

   const setUser = (user: User) => {
      localStorage.setItem("user", JSON.stringify(user));
      setState({ ...state, user: user });
   }

   const logOutUser = () => {
      localStorage.removeItem("user");
      navigate(0);
      setState({ ...state, user: null, loading: true });
   }
   
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={
               <>
                  <TopMenu state={state} />
                  <AppNavBar state={state} logOutUser={logOutUser} />
                  <HomePage state={state} />
               </>
               }
            />
            <Route path="/login" element={
               <LogInPage state={state} setUser={setUser} />
               }
            />
            <Route path="/signup" element={
               <CreateUserPage state={state} />
               }
            />
            <Route path="/results/all?/search?/:query?/category?/:category?" element={
               <>
                  <TopMenu state={state} />
                  <AppNavBar state={state} logOutUser={logOutUser} />
                  <SearchResults state={state} />
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
