import { FC } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { AppState } from '../utills/DataTypes';

interface Props {
   state: AppState;
   setState: (newState : AppState) => void;
}

const SearchBox: FC<Props> = (props: Props) => {
   return (
      <div className="Search-section">
         <InputGroup
            className="Navbar-search Search-box"
            type="search"
            large placeholder="Search Products" />
         <Button
            className="bp5-minimal Search-btn"
            icon="search" />
      </div>
   );
}

 export default SearchBox;