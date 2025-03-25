"use server";


import { db } from "@/lib/firebaseConfig";
import {  addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "@firebase/firestore";
import { addUserDirect } from "../user/dbOperation";
import { addCustomerAddressDirect } from "../address/dbOperations";
import {  TOrderMaster, orderMasterDataT } from "@/lib/types/orderMasterType";
import { orderProductsT } from "@/lib/types/orderType";
import {   purchaseDataT } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";

 

export async function createNewOrder(purchaseData:purchaseDataT) {
  //  console.log("--------------------- cart data in cart save draft  ",purchaseData)
  //1. user id
  //2. user address
  //3. cart data

  const email = purchaseData.address.email;
  const lastName = purchaseData.address.lastName;
  const firstName = purchaseData.address.firstName;
  const total = purchaseData.total;
  const totalDiscountG = purchaseData.totalDiscountG;
  //const userId = purchaseData.address.userId;
 // const password = purchaseData.address.password;
 const password = "123456";
  const username = firstName + "" + lastName;
  //if(purchaseData.userId === undefined){
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirmPassword", password);
  // const result = await addUser(formData);
  const UserAddedId = await addUserDirect(formData) as string;

  // Now check address or add new address
  const formDataAdd = new FormData();
  formDataAdd.append("firstName", purchaseData.address.firstName);
  formDataAdd.append("lastName", purchaseData.address.lastName);
 formDataAdd.append("userId", UserAddedId);
  formDataAdd.append("email", purchaseData.address.email);
  formDataAdd.append("mobNo", purchaseData.address.mobNo);
  formDataAdd.append("password", "123456");
  formDataAdd.append("addressLine1", purchaseData.address.addressLine1!);
  formDataAdd.append("addressLine2", purchaseData.address.addressLine2!);
  formDataAdd.append("city", purchaseData.address.city);
  formDataAdd.append("state", purchaseData.address.state);
  formDataAdd.append("zipCode", purchaseData.address.zipCode);

  const addressAddedId = await addCustomerAddressDirect(formDataAdd);
  // enter data in order master

  const customerName = firstName + " " + lastName;
  //const now = new Date();
  // const now_india = now.toLocaleString("en-IN", {
  //   dateStyle: "medium",
  //   timeStyle: "medium",
  //   timeZone: "Asia/Kolkata",
  // });

//"de-DE"
  const now_german = new Date().toLocaleString("en-DE", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Europe/Berlin",
  });

 // const order = await fetchOrdersMaster()

 const collectionRef = collection(db, 'orderMaster')
    
 const targetQuery = query(collectionRef, orderBy("srno", "desc"), limit(1));
 const querySnapshot = await getDocs(targetQuery)

//  const q = query(collectionRef);
//  const querySnapshot = await getDocs(q);
let new_srno =1;
const orderData = [] as orderMasterDataT[];
  querySnapshot.forEach((doc) => {
     const  data = doc.data() as orderMasterDataT;
    //   console.log("last order ----------", data)
       orderData.push(data)
     });
 
   
   if(orderData[0]?.srno !== undefined){
     new_srno =orderData[0].srno + 1;
   }
 //  console.log("sr No ----------", new_srno)

 // const timeId = new Date().toISOString();
  const orderMasterData = {
    // also add auto increment to order,
    customerName,
    userId: UserAddedId,
    addressId: addressAddedId,
    total:total,
    status:"pending",
    totalDiscountG,
    time: now_german,
    srno:new_srno,
   
  } as orderMasterDataT; 

  
const orderMasterId = await addOrderToMaster(orderMasterData) as string;

  // add product to productOrder

  // unique id ->   purchaseSession: '1737704030168',
  const purchaseProducts = purchaseData.cartData as ProductType[];

  purchaseProducts.forEach((element) => {
    addProductDraft(element, UserAddedId, orderMasterId);
  });

  //  const toBeDeleted = cartData[0].purchaseSession;
  //  console.log(toBeDeleted)
  //  await deleteDoc(doc(db, "orderProducts", toBeDeleted));
} //end of cart to orderProduct


export async function addProductDraft(element:ProductType, UserAddedId:string, orderMasterId:string) {
   
  const product = {
    id: element.id,
    name: element.name,
    price: element.price,
    quantity: element.quantity,
    orderMasterId,
    //purchaseSession: element.purchaseSession,
    userId: UserAddedId,
    status: element.status,
  };
 // console.log("UserAddedId in add products ----",  product)
  try {
    const docRef = await addDoc(collection(db, "orderProducts"), product);
    console.log("purchased product document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}




export async function addOrderToMaster(element:orderMasterDataT) {
  let userDocRef = "" as string;
  let recordId = undefined;
 try {
      userDocRef = (await addDoc(collection(db, "orderMaster"), element)).id ;
      recordId = userDocRef;
      return userDocRef;
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  
    // try {
    //   const docRef = await addDoc(collection(db, "orderMaster"), element1);
    //   console.log("Document written with ID: ", docRef.id);
    //   return docRef.id;
    //   // Clear the form
    // } catch (e) { 
    //   console.error("Error adding document: ", e);
    // }
  }


  export async function fetchOrdersMaster():Promise<orderMasterDataT[]>{


const data = [] as orderMasterDataT[];
  //  const q = query(collection(db, "orderMaster"));
  //  const querySnapshot = await getDocs(q);

    const collectionRef = collection(db, 'orderMaster')
    
    const targetQuery = query(collectionRef, orderBy("srno", "desc"), limit(10));
    const querySnapshot = await getDocs(targetQuery)


    querySnapshot.forEach((doc) => {

      const pData = { id: doc.id, ...doc.data() } as orderMasterDataT;
      data.push(pData);
    });
    return data;

   }


   

   export async function fetchOrdersMasterByUserId(userId:string):Promise<Array<TOrderMaster>>{


    //  const q = query(collection(db, "orderMaster"), where("userId", "==", userId));
    // const querySnapshot = await getDocs(q);
    //  let data = [];
    //  querySnapshot.forEach((doc) => {
    //    data.push({id:doc.id, ...doc.data()});
    //  });
    //  return data;

    let data = [] as orderMasterDataT[];
    
      const q = query(collection(db, "orderMaster"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data = doc.data() as orderMasterDataT[];
      });
      return data;
   
   }   


// export async function addOrder(element) {
//   try {
//     const docRef = await addDoc(collection(db, "orderProducts"), element);
//     console.log("Document written with ID: ", docRef.id);
//     // Clear the form
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }



// export async function fetchOrders(){

//  // const result = await db.select().from(product);
//   const result = await getDocs(collection(db, "product"))
// //  console.log(result.docs)
   
// let data; 
// data = [];
//   result.forEach((doc) => {
//     data.push({id:doc.id, ...doc.data()});
//   });
//  // console.log(data)
//   return data;
// }

export async function fetchOrderMasterById(id:string){
  console.log("Document data:--------");
    const docRef = doc(db, "orderMaster", id);
    const docSnap = await getDoc(docRef);
    let productData = {} as orderMasterDataT;
    if (docSnap.exists()) {
     console.log("Document data:", docSnap.data());
    } else {
      //   docSnap.data() //will be undefined in this case
      console.log("No such document!");
    }
    productData = docSnap.data() as orderMasterDataT;
    return productData;
  
}


/***************** Order detail  **************************/



export async function fetchOrderProductsByOrderMasterId(OrderMasterId:string){
 
  //console.log("---------- inside order -----------", OrderMasterId)
  const data = [] as orderProductsT[];
  const q = query(collection(db, "orderProducts"), where("orderMasterId", "==", OrderMasterId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
   const orderData = doc.data() as orderProductsT;
   data.push(orderData)
  });
 // console.log(data)
  return data;

}   