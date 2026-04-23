import { connectDB } from '@/lib/config/db'
import order from '@/lib/models/OrderSchema'
import React from 'react'

const page = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params

    await connectDB()

    const data = await order.findById({id})
  return (
    <div>
      
    </div>
  )
}

export default page
