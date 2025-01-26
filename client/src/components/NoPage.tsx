/**
 * An error page that shows for URLs that are not found
 */

import { FC } from "react";

const NoPage: FC = () => {
   return (
      <div>
         <h1>404</h1>
         <p>Oops... page not found</p>
      </div>
   );
}

 export default NoPage;