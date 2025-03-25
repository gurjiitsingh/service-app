import { z } from "zod";



export type couponType = {
  id: string | undefined;
  name: string;
  price: string;
  minSpend: string;
  couponDesc: string;
  productCat: string;
  image: string;
  isFeatured: boolean;
  purchaseSession: string | null;
  quantity: number | null;
  status: string | null;
};



// const couponSchema = z.object({
//   // id: z.number().optional(),
//   name: z
//     .string()
//     .trim()
//     .min(2, { message: "coupon name is very short" })
//     .max(30, { message: "coupon name is very long" }),
//   price: z
//     .string()
//     .refine((value) => /^\d+$/.test(value), "Invalid coupon price"), // Refinement
//   productCat: z.string().min(1, { message: "Please select category" }),

//   couponDesc: z.string().min(1, { message: "Please select category" }),
//   company: z.string().optional(),
//   featured: z.string().optional(),
//   image: typeof window === "undefined" ? z.any() : z.any(),
//   minSpend: z.string().optional(),
//   // image:z.object({
//   //   size: z.number(),
//   // type: z.string(),
//   // name: z.string(),
//   // lastModified: z.number(),
//   //  }),
// });
// export type TcouponSchema = z.infer<typeof couponSchema>;

// export type TcouponSchemaArr = TcouponSchema[];

export const couponSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: "coupon name is required" }),
  price: z
    .string(),
   // .refine((value) => /^\d+$/.test(value), "Invalid coupon price"), // Refinement
  productCat: z.string().min(1, { message: "Please select category" }),
  couponDesc: z
    .string().optional(),
   // .min(2, { message: "coupon description is required" }),
  minSpend: z.string().optional(),
  //  offerType: z.string().min(1, { message: "Please select category" }),
  //  dimensions:z.string().optional(),
  //weight:z.string().optional(),
  isFeatured: z.boolean().optional(),

  //image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
  image: z.any().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TcouponSchema = z.infer<typeof couponSchema>;


export type ShowPorductT = {
  id: string;
  name: string;
  price: string;
  Desc: string;
  productCat: string;
  couponDesc: string;
  isFeatured: boolean;
  image: string;
};

export const editCouponSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: "coupon name is required" }),
  price: z
    .string()
    .refine((value) => /^\d+$/.test(value), "Invalid coupon price"), // Refinement
  productCat: z.string().min(1, { message: "Please select category" }),
  couponDesc: z
    .string()
    .min(2, { message: "coupon description is required" }),
  // offerType: z.string().optional(),
  // dimensions:z.string().optional(),
  // weight:z.string().optional(),
  isFeatured: z.boolean().optional(),
  minSpend: z.string().optional(),
  image: z.any().optional(),
  oldImgageUrl: z.string().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TeditcouponSchema = z.infer<typeof editCouponSchema>;

//export default couponSchema;

export type Tcoupon = {
  name: string;
  id: string;
  image: string;
  category: string;
};
