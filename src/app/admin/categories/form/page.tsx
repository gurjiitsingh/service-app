'use client'
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, TcategorySchema } from "@/lib/types/categoryType";
import { Button } from "@/components/ui/button";
import { addNewCategory } from '@/app/action/category/dbOperations';

const Form = () => {

    const {
      register,
      formState: { errors },
      handleSubmit,
      //reset,
      setValue,
      //getValues,
    //  setError,
    } = useForm<TcategorySchema>({
      resolver: zodResolver(categorySchema),
    });
   // const { isSubmitting } = formState;
    async function onSubmit(data: TcategorySchema) {
      
     console.log("-------------", data);
      //setIsDisabled(true)
      const formData = new FormData();
  
      formData.append("name", data.name);
      formData.append("sortOrder", data.sortOrder!);
      formData.append("desc", data.desc);
    //  formData.append("slug", data.slug!);
      formData.append("image", data.image[0]);
   //const result = 
   await addNewCategory(formData);

  // console.log("cat add ------------", result)
      
      setValue('name', "");
      setValue('desc', "");
      
      //router.push('/admin/categories')
      //router.refresh()
      //location.reload()
     
    }
  


   return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flexflex flex-col gap-4 p-5">
            <h1>Edit Category</h1>
  
            <div className="flex flex-col lg:flex-row gap-5 ">
              {/* left box */}
              <div className="flex-1 flex flex-col gap-y-5">
                <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                  <h1 className="font-semibold">Category</h1>
                  <div className="flex w-full flex-col gap-2  my-2 ">
                
  
                    <div className="flex flex-col gap-1 w-full">
                      <label className="label-style" htmlFor="product-title">
                        Name<span className="text-red-500">*</span>{" "}
                      </label>
                      <input {...register("name")} className="input-style" />
                      <span className="text-[0.8rem] font-medium text-destructive">
                        {errors.name?.message && (
                          <span>{errors.name?.message}</span>
                        )}
                      </span>
                    </div>
  
                    <div className="flex flex-col gap-1 w-full">
                      <label className="label-style" htmlFor="product-title">
                        Sort Order<span className="text-red-500">*</span>{" "}
                      </label>
                      <input {...register("sortOrder")} className="input-style" />
                      <span className="text-[0.8rem] font-medium text-destructive">
                        {errors.sortOrder?.message && (
                          <span>{errors.sortOrder?.message}</span>
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
                    <label className="label-style"> Image</label>
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      className="input-image-style"
                    />
  
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {errors.image && <span>Select category image</span>}
                    </p>
                  </div>
                </div>
  
                <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                  <h1 className="font-semibold">General Detail</h1>
  
                  <div className="flex flex-col gap-1">
                    <label className="label-style">Category description</label>
  
                    <textarea
                      {...register(
                        "desc"
                        //   , {
                        //   validate: {
                        //     pattern: (value: string) => !/[!]/.test(value),
                        //   },
                        // }
                      )}
                      className="textarea-style"
                    />
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {errors.desc && (
                        <span>Category description is required</span>
                      )}
                    </p>
                  </div>
  
                  <div className="flex    items-center gap-4">
                    <label className="label-style">Featured Category</label>
                    <input {...register("isFeatured")} type="checkbox" />
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {errors.isFeatured?.message && (
                        <p>{errors.isFeatured?.message}</p>
                      )}
                    </p>
                  </div>
  
                  <Button
                    className="bg-amber-500 text-amber-900 font-bold"
                    type="submit"
                  >
                    Edit Category{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
}

export default Form