//import cat from '@/app/admin/categories-/components/Cat'
import Link from 'next/link'
import React from 'react'

export default function CategoryData({category}:any) {
  return (
    <Link className='w-full' href={{
      pathname: '/',
      query: { id: category.id },
    }}>
    <div className=' rounded-lg px-2 py-2 w-full primary  uppercase text-slate-700'>{category.name}</div>
    </Link>
  )
}
// bg-[#ff5d00]