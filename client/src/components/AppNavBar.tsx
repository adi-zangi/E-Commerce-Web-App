/**
 * A navigation bar that contains the app logo and buttons for the main app 
 * actions
 */

import { FC } from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { AppState, Page } from '../utils/dataTypes';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

interface Props {
   page: Page;
   state: AppState;
   setState: (newState : AppState) => void;
}

const AppNavBar: FC<Props> = (props: Props) => {

   const navigate = useNavigate();

   const handleLogoClick = () => {
      if (props.page === Page.Home) {
         navigate(0);
      } else {
         navigate("/");
      }
   }

   const handleSignInClick = () => {
      navigate("/login");
   }

   return (
      <Navbar>
         <Navbar.Group align={Alignment.LEFT}>
            <Button
               className="Logo-btn bp5-large"
               onClick={handleLogoClick} />
         </Navbar.Group>
         <Navbar.Group align={Alignment.RIGHT}>
            { props.state.user === null ?
               <Button
               className="bp5-minimal"
               icon="user"
               text="Sign In"
               onClick={handleSignInClick} />
               :
               <Button
                  className="bp5-minimal"
                  text={`Hello, ${props.state.user.first_name} ${props.state.user.last_name}`}
               />
            }
            <Button
               className="bp5-minimal"
               icon="shopping-cart"
               text="Cart" />
         </Navbar.Group>
         <SearchBox page={props.page} state={props.state} setState={props.setState} />
      </Navbar>
   );
}

 export default AppNavBar;