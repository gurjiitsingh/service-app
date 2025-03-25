import {
 // Table,
  // TableBody,
  TableCell,
 // TableHead,
 // TableHeader,
  TableRow,
//  TableCaption,
} from "@/components/ui/table";
import { orderMasterDataT } from "@/lib/types/orderMasterType";

import Link from "next/link";
function TableRows({ order }:{order:orderMasterDataT}){

  

  return (
    <TableRow className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
       <TableCell>#{order.srno}</TableCell>
       <TableCell>{order.customerName}</TableCell>
      <TableCell>{order.time}</TableCell>
      <TableCell>{order.status}</TableCell>
        <TableCell>&#8364;{order.total}</TableCell>
        <TableCell>{order.totalDiscountG}%</TableCell>
      <TableCell><Link href={
        {
           pathname: `/admin/orders/order-detail`,
         query: { masterId: order.id, userId: order.userId,addressId:order.addressId 

         } }}>Detail</Link></TableCell>
     </TableRow>
  );
};

export default TableRows;
