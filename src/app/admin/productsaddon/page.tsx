import React, { Suspense } from 'react'
import FormCom from './form/componets/FormCom'

export default function Page() {
  return (
    <Suspense>
      <FormCom />
    </Suspense>
  )
}
