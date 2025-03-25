'use client'
import { fetchCategories } from "@/app/action/category/dbOperations";
import React, { useEffect, useState } from "react";
import CategoryData from "./CategoryData";
import { categoryType } from "@/lib/types/categoryType";





export default function SideBarPublic() {
const [categoryData, setCategoryData] = useState<categoryType[]>([]);
    useEffect(() => {
        async function fetchcate() {
          try {
          
          const categories = await fetchCategories()
           // console.log("---------", categories)
            setCategoryData(categories);
          } catch (error) {
            console.log(error);
          }
        }
        fetchcate();
        
      }, []);
  return (
    <div className="py-4 px-3 flex flex-col items-center gap-2 ">
      
              {categoryData.map((category) => {
                return <CategoryData key={category.name} category={category} />;
              })}  

    </div>
  )
}
