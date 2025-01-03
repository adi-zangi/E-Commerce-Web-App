import { FC } from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { AppState } from '../utils/dataTypes';
import SearchBox from './SearchBox';

interface Props {
   state: AppState;
   setState: (newState : AppState) => void;
}

const NavigationMenu: FC<Props> = (props: Props) => {

   const handleLogoClick = () => {
      window.location.reload();
   }

   return (
      <Navbar>
         <Navbar.Group align={Alignment.LEFT}>
            <Button className="Logo-btn bp5-large" onClick={handleLogoClick} />
         </Navbar.Group>
         <Navbar.Group align={Alignment.RIGHT}>
            <Button className="bp5-minimal" icon="user" text="Sign In" />
            <Button className="bp5-minimal" icon="shopping-cart" text="Cart" />
         </Navbar.Group>
         <SearchBox state={props.state} setState={props.setState} />
      </Navbar>
   );
}

 export default NavigationMenu;