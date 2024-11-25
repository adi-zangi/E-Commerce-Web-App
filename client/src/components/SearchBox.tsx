import { Button, InputGroup } from '@blueprintjs/core';
import React from 'react';

class SearchBox extends React.Component {
   render() {
      return (
      <div className="Search-section">
         <InputGroup className="Navbar-search Search-box" type="search" large placeholder="Search Products" />
         <Button className="bp5-minimal Search-btn" icon="search" />
      </div>
      );
   }
}

 export default SearchBox;