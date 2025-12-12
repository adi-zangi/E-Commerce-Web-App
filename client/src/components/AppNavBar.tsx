/**
 * A navigation bar that contains the app logo and buttons for the main app 
 * actions
 */

import { FC } from 'react';
import { Alignment, Button, Menu, MenuItem, Navbar, Popover } from '@blueprintjs/core';
import { AppState, Page } from '../utils/dataTypes';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

interface Props {
   state: AppState;
   logOutUser: () => void;
}

const ProfileButton: FC<Props> = (props: Props) => {
   
   const handleSignOutClick = () => {
      props.logOutUser();
   }

   const dropdownMenu =
      <Menu size="small">
         <MenuItem
            text="Sign Out" 
            icon="log-out"
            onClick={handleSignOutClick}
            />
      </Menu>
   
   return (
      <Popover minimal content={dropdownMenu} placement="bottom">
         <Button 
            variant="minimal"
            text={`Hello, ${props.state.user?.first_name} ${props.state.user?.last_name}`}
         />
      </Popover>
   );
}

const AppNavBar: FC<Props> = (props: Props) => {

   const navigate = useNavigate();

   const handleLogoClick = () => {
      if (props.state.page === Page.Home) {
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
         <Navbar.Group align={Alignment.START}>
            <Button
               id="logoBtn"
               className="Logo-btn bp5-large"
               onClick={handleLogoClick} />
         </Navbar.Group>
         <Navbar.Group align={Alignment.END}>
            { props.state.user === null ?
               <Button
                  id="logInBtn"
                  className="bp5-minimal"
                  icon="user"
                  text="Sign In"
                  loading={props.state.loading}
                  onClick={handleSignInClick} />
               :
               <ProfileButton state={props.state} logOutUser={props.logOutUser} />
            }
            <Button
               className="bp5-minimal"
               icon="shopping-cart"
               text="Cart" />
         </Navbar.Group>
         <SearchBox state={props.state} />
      </Navbar>
   );
}

 export default AppNavBar;