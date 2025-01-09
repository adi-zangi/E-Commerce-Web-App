/**
 * A navigation bar that contains the app logo and buttons for the main app 
 * actions
 */

import { FC } from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { AppState, Page } from '../utils/dataTypes';
import SearchBox from './SearchBox';

interface Props {
   state: AppState;
   setState: (newState : AppState) => void;
}

const AppNavBar: FC<Props> = (props: Props) => {

   const handleLogoClick = () => {
      window.location.reload();
   }

   const handleSignInClick = () => {
      props.setState({...props.state, page: Page.LogIn});
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
         <SearchBox state={props.state} setState={props.setState} />
      </Navbar>
   );
}

 export default AppNavBar;