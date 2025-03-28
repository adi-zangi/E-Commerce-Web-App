/**
 * A menu that allows to select shop departments
 */

import { FC, useEffect, useState } from 'react';
import '../styles/App.css';
import { AppState, Category, Department } from '../utils/dataTypes';
import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core';
import { getAllDepartments, getCategoriesInDepartment } from '../utils/dataService';
import { useNavigate } from 'react-router-dom';

interface Props {
   state: AppState;
}

interface DepartmentProps {
   department: Department;
   categories: Array<Category>;
   handleClick: (category: Category) => void;
}

interface State {
   departments: Array<Department>;  // The shop departments
   categories: Array<Array<Category>>;  // The list of categories for each department
}

const DepartmentDropDownMenu: FC<DepartmentProps> = (props: DepartmentProps) => {
   const menuItems : any = [];
   props.categories?.forEach(category => {
      menuItems.push(
         <MenuItem
            key={category.category_id}
            text={category.category_name}
            onClick={() => props.handleClick(category)} />)
   });

   const dropdownMenu =
      <Menu>
         {menuItems}
      </Menu>;

   return (
      <Popover minimal content={dropdownMenu} placement="bottom">
            <Button
               className="bp5-minimal bp5-small"
               alignText="left"
               rightIcon="caret-down"
               text={props.department.department_name} />
      </Popover>
   );
}

const TopMenu: FC<Props> = (props: Props) => {
   const [state, setState] = useState<State>({
      departments: [],
      categories: [],
   });

   const navigate = useNavigate();

   // Gets a list of departments from the database
   useEffect(() => {
      const getData = async () => {
         await getAllDepartments()
         .then((res: any) => {
            setState({ ...state, departments: res.data });
         })
         .catch((e: Error) => {
            console.log(e);
         });
      }
      getData();
   }, []);

   // Gets a list of categories for each departments from the database
   useEffect(() => {
      const getData = async () => {
         const categories = new Array<Array<Category>>();
         for (const department of state.departments) {
            await getCategoriesInDepartment(department.department_id)
               .then((res: any) => {
                  categories.push(res.data);
               })
               .catch((e: Error) => {
                  console.log(e);
               });
         }
         if (categories.length > 0) {
            setState({ ...state, categories: categories });
         }
      }
      getData();
   }, [state.departments]);

   const handleMenuItemClick = async (category: Category) => {
      navigate("/results/category/?c=" + category.category_name.replaceAll(/\s/g, "+"));
   }

   const menuItems = state.departments.map((department, index) => 
      <DepartmentDropDownMenu
         key={department.department_id}
         department={department}
         categories={state.categories[index]}
         handleClick={handleMenuItemClick} />
   );

   return (
      <div className="Top-menu">
         {menuItems}
      </div>
   );
}

 export default TopMenu;