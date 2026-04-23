import { connectDB } from '@/lib/config/db'
import order from '@/lib/models/OrderSchema'
import { notFound } from 'next/navigation'
import React from 'react'
import { ekate, magdaLig } from '@/lib/font'
import Link from 'next/link'
import Image from 'next/image'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    await connectDB()
    const data = await order.findById(id)

    if (!data) return notFound()

    return (
        <main className="bg-white min-h-screen py-16 px-6">
            <div className="max-w-4xl mx-auto">
                
                <div className="text-center mb-15">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                        Thank You
                    </h1>
                    <p className={`${magdaLig.className} text-zinc-500 text-sm`}>
                        Order Identity: <span className="text-black font-bold uppercase">{data.orderId.split('-')[0]}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left: Summary */}
                    <div className="lg:col-span-7 space-y-12">
                        <section>
                            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-8 pb-4 border-b border-zinc-100">Your Selection</h2>
                            <div className="space-y-6">
                                {data.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-6 items-center">
                                        <div className="relative w-20 h-24 bg-zinc-50 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                                                {item.selectedSize} ml — Qty: {item.quantity}
                                            </p>
                                            {item.personlized && (
                                                <p className="text-[9px] italic text-red-600 mt-2 uppercase tracking-tighter">
                                                    Engraved: &quot;{item.personlized}&quot;
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold">Rs. {item.price.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-zinc-50 p-8">
                             <h2 className="text-[10px] font-bold uppercase tracking-widest mb-6">Logistics Detail</h2>
                             <div className={`${magdaLig.className} text-sm space-y-2 text-zinc-600`}>
                                <p className="text-black font-bold uppercase">{data.userDetails.fullName}</p>
                                <p>{data.shippingAddress.address}</p>
                                <p>{data.shippingAddress.city}, {data.shippingAddress.postalCode}</p>
                                <p className="pt-4 text-[10px] tracking-widest">{data.userDetails.phone}</p>
                             </div>
                        </section>
                    </div>

                    {/* Right: Totals & Next Steps */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="border border-zinc-200 p-8">
                            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-8">Financial Overview</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400 uppercase text-[10px] tracking-widest">Payment Method</span>
                                    <span className="font-bold uppercase tracking-tighter">{data.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between border-t border-zinc-100 pt-4 mt-4">
                                    <span className="text-zinc-400 uppercase text-[10px] tracking-widest">Total Amount</span>
                                    <span className="text-xl font-black">Rs. {data.totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link href="/" className="w-full block bg-black text-white text-center py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-stone-800 transition-colors">
                                Return to Home
                            </Link>
                            <p className={`${magdaLig.className} text-[10px] text-center text-zinc-400 uppercase tracking-widest`}>
                                A confirmation email has been dispatched.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Page