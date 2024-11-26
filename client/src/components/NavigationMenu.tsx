import React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';

class NavigationMenu extends React.Component {
   render() {
      return (
      <div>
         <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
               <Button className="Logo-btn bp5-large" />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
               <Button className="bp5-minimal" icon="user" text="Sign In" />
               <Button className="bp5-minimal" icon="shopping-cart" text="Cart" />
            </Navbar.Group>
         </Navbar>
      </div>
      );
   }
}

 export default NavigationMenu;