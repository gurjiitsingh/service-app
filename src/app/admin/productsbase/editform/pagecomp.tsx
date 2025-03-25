"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

//import Description from "./componets/Description";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPorductSchema, TeditProductSchema } from "@/lib/types/productType";
//import { Images } from "lucide-react";
// import { fetchCategories } from "@/app/action/category/dbOperations";
//import { fetchbrands } from "@/app/action/brads/dbOperations";
import {
  editProduct,
  fetchProductById,
} from "@/app/action/productsbase/dbOperation";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCategories } from "@/app/action/category/dbOperations";
import { categoryType } from "@/lib/types/categoryType";

const PageComp = () => {
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const router = useRouter();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    // setError,
  } = useForm<TeditProductSchema>({
    resolver: zodResolver(editPorductSchema),
  });
  useEffect(() => {
    let productData;
    async function prefetch() {
      productData = await fetchProductById(id);
      console.log("productData ----", productData);
      const priceS = productData.price.toString().replace(/\./g, ',');
      setValue("id", id);
      setValue("name", productData.name);
      setValue("productDesc", productData.productDesc);
     // setValue("categoryId", "yishiwe");
      setValue("oldImgageUrl", productData.image);
      setValue("price", priceS);
      setValue("sortOrder", productData.sortOrder!.toString());
      setValue("categoryId", productData.categoryId!);
      setValue("isFeatured", productData.isFeatured);
    }

    prefetch();
  }, []);

   
    useEffect(() => {
      async function prefetch() {
        const categoriesData = await fetchCategories();
        // console.log("cat id --------", categoriesData)
        //   const brandData = await fetchbrands();
        setCategoryData(categoriesData);
        // setBrand(brandData);
      }
      prefetch();
    }, []);

  async function onsubmit(data: TeditProductSchema) {
    const formData = new FormData();
    //console.log("---------",formData);
    // let CatId;
    // if(data.categoryId === "0"){
    //  CatId = data.categoryIdOld as string; 
    // }else{
    //  CatId = data.categoryId as string;  
    // }

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("categoryId", data.categoryId!);
    formData.append("sortOrder", data.sortOrder);
    formData.append("productDesc", data.productDesc);
    formData.append("image", data.image[0]);
    formData.append("oldImgageUrl", data.oldImgageUrl!);
    // formData.append("isFeatured",data.isFeatured)
    formData.append("id", data.id!);

    const result = await editProduct(formData);

    if (!result?.errors) {
      router.push("/admin/productsbase");
    } else {
      alert("Some thing went wrong");
    }

    // if (result.errors) {
    //   // not network error but data validation error
    //   const errors:Terror = result.errors;

    //   if (errors.name) {
    //     setError("name", {
    //       type: "server",
    //       message: errors.name,
    //     });
    //   } else if (errors.price) {
    //     setError("price", {
    //       type: "server",
    //       message: errors.price,
    //     });
    //   } else if (errors.productCat) {
    //     setError("productCat", {
    //       type: "server",
    //       message: errors.productCat, 
    //     });
    //   }
    //   if (errors.productDesc) {
    //     setError("productDesc", {
    //       type: "server",
    //       message: errors.productDesc,
    //     });
    //   }
    //   if (errors.image) {
    //     setError("image", {
    //       type: "server",
    //       message: errors.image,
    //     });
    //   }

    //    else {
    //   //  alert("Something went wrong");
    //   }
    // }

    // console.log(result);
  }
  //   function setSelectedIndex(s, i){
  // s.options[i-1].selected = true;
  // return;
  // }
  //setSelectedIndex(document.getElementById("ddl_example3"),5);

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flexflex flex-col gap-4 p-5">
          <h1>Edit Product</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-2">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Product</h1>
                <div className="flex w-full flex-col gap-2  my-2 ">
                  <input {...register("id")} hidden />
                
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Product Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input {...register("name")} className="input-style" />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.name?.message && (
                        <span>{errors.name?.message}</span>
                      )}
                    </span>
                  </div>
                  <input {...register("categoryIdOld")} hidden />
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Category<span className="text-red-500">*</span>{" "}
                    </label>
                    <select {...register("categoryId")} className="input-style">
                      <option key="wer" value="0">
                        Do not change Category
                      </option>
                      {categoryData.map(
                        (category: { name: string; id: string }, i: number) => {
                         // console.log("cat id -------", category.id);
                          return (
                            <option key={i} value={category.id}>
                              {category.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.categoryId?.message && (
                        <p>{errors.categoryId?.message}</p>
                      )}
                    </span>
                  </div>
                 
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Price Details</h1>
                <div className="flex w-full flex-col gap-2  my-2 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Price<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("price")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.price?.message && (
                        <span>{errors.price?.message}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* End of left box */}
            <input {...register("oldImgageUrl")} hidden />
            <div className="flex-1 flex flex-col gap-5 h-full">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Pictures</h1>
                <div className="flex flex-col gap-1">
                  <label className="label-style">Product Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="input-image-style"
                  />

                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.image && <span>Select product image</span>}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">General Detail</h1>

                <div className="flex flex-col gap-1">
                  <label className="label-style">Product description</label>

                  <textarea
                    {...register("productDesc"
                    //   , {
                    //   validate: {
                    //     pattern: (value: string) => !/[!]/.test(value),
                    //   },
                    // }
                  )}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.productDesc && (
                      <span>Product description is required</span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="label-style">Sort Order</label>
                  <input {...register("sortOrder")} className="input-style" />
                  <span className="text-[0.8rem] font-medium text-destructive">
                    {errors.sortOrder?.message && (
                      <span>{errors.sortOrder?.message}</span>
                    )}
                  </span>
                </div>

                <div className="flex    items-center gap-4">
                  <label className="label-style">Featured Product</label>
                  <input {...register("isFeatured")} type="checkbox" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.isFeatured?.message && (
                      <p>{errors.isFeatured?.message}</p>
                    )}
                  </p>
                </div>

                <Button className="bg-red-500" type="submit">
                  Edit Product{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PageComp;
