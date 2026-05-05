/**
 * The contents of the home page of the app
 */

import { FC } from 'react';
import '../styles/App.css';
import { AppState } from '../utils/dataTypes';
import { Link } from 'react-router-dom';

interface Props {
   state: AppState;
}

const HomePage: FC<Props> = (props: Props) => {
   return (
      <div className="Homepage">
         <div className="hero">
            <div className="hero-text">
               <div className="hero-badge">Back to school 2026</div>
               <h1>Everything your classroom needs, in one place</h1>
               <p>From notebooks to art supplies — shop by grade, subject, or teacher's list.</p>
            </div>
            <div className="hero-visual">
               <div className="pencil yellow-pencil"></div>
               <div className="pencil green-pencil"></div>
               <div className="pencil pink-pencil"></div>
               <div className="pencil blue-pencil"></div>
               <div className="pencil purple-pencil"></div>
               <div className="pencil orange-pencil"></div>
            </div>
         </div>

         <p className="section-label">Shop by category</p>
         <div className="categories">
            <div className="cat-card">
               <Link to="/results/category?c=Notebooks">
                  <div className="cat-icon" style={{ background:"#EAF3DE" }}>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round"><path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14"/><path d="M4 19h16"/><path d="M8 7h8M8 11h5"/></svg>
                  </div>
                  <h3>Notebooks</h3>
               </Link>
            </div>
            <div className="cat-card">
               <Link to="/results/category?c=Writing">
                  <div className="cat-icon" style={{ background:"#FAEEDA" }}>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="1.5" strokeLinecap="round"><path d="M17 3l4 4-9.5 9.5-4.5 1 1-4.5L17 3z"/><path d="M15 5l4 4"/></svg>
                  </div>
                  <h3>Writing</h3>
               </Link>
            </div>
            <div className="cat-card">
               <a href="/results/category?c=Organization">
                  <div className="cat-icon" style={{ background:"#E6F1FB" }}>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                  </div>
                  <h3>Organization</h3>
               </a>
            </div>
            <div className="cat-card">
               <Link to="/results/category?c=Art supplies">
                  <div className="cat-icon" style={{ background:"#FBEAF0" }}>
                     <svg width="22" height="22" viewBox="0 0 22 22" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="16,2 19,5 8,16 5,13" fill="#F4C0D1" stroke="#993556" strokeWidth="0.7"/>
                        <polygon points="17,1 20,4 18.5,5.5 15.5,2.5" fill="#72243E" stroke="none"/>
                        <polygon points="8,16 5,13 3.5,14.5 6.5,17.5" fill="#C07090" stroke="#993556" strokeWidth="0.6"/>
                        <polygon points="6.5,17.5 3.5,14.5 2,20" fill="#D4537E" stroke="#993556" strokeWidth="0.6"/>
                     </svg>
                  </div>
                  <h3>Art supplies</h3>
               </Link>
            </div>
         </div>

         <div className="banner">
            <div className="banner-text">
               <h2>Free delivery on orders over $25</h2>
               <p>Standard 3-5 day shipping · Express available at checkout</p>
            </div>
            <div className="banner-pills">
               <span className="pill">Fast shipping</span>
               <span className="pill">Easy returns</span>
               <span className="pill">School billing</span>
            </div>
         </div>
      </div>
   );
}

 export default HomePage;