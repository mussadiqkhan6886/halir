import type { Metadata } from 'next';
import MainCard from '@/components/main/MainCard'
import { PerfumeType } from '@/type'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { ekate, magdaLig } from '@/lib/font'


export const generateMetadata = (): Metadata => { return {
    title: "Search"
} };

const getData = async (query: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`)
        return res.data.data
    } catch (error) {
        console.error("Search fetch error:", error)
        return []
    }
}

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
    const { q } = await searchParams
    const data = q ? await getData(q) : []

    return (
        <main className='max-w-7xl mx-auto w-full p-6 min-h-screen'>
            {data.length <= 0 ? (
                /* No Results State */
                <section className="flex flex-col items-center justify-center py-10 md:py-15 text-center border-t border-zinc-200">
                    <span className="text-[11px] uppercase tracking-[0.4em] text-zinc-500 mb-6 italic">Zero Matches Found</span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                        No scent <br /> 
                        <span className={`${ekate.className} lowercase font-light text-zinc-600`}>matches &apos;{q}&apos;</span>
                    </h1>
                    
                    <p className={`${magdaLig.className} text-zinc-500 max-w-md mb-12`}>
                        Your search didn&apos;t yield an exact match. Perhaps one of our curated collections might spark an interest?
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/collections/hot-sellers" className="px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
                            Explore Best Sellers
                        </Link>
                        <Link href="/collections/men" className="px-8 py-4 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-colors">
                            Discover for Him
                        </Link>
                    </div>
                </section>
            ) : (
                /* Results State */
                <>
                    <section className="mb-10 border-b border-zinc-200 pb-3 sm:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-black tracking-tighter leading-none">
                                Results for {q}
                            </h1>
                        </div>
                        <p className={`${magdaLig.className} text-sm text-zinc-600 capitalize tracking-widest`}>
                            {data.length} Identifiers Located
                        </p>
                    </section>

                    <div className="flex flex-col gap-4">
                        {data.map((item: PerfumeType, index: number) => (
                            <div key={index} className="group">
                                <MainCard 
                                    name={item.name} 
                                    image={item.mainImage} 
                                    index={index} 
                                    slug={item.slug} 
                                    category={item.categories[0]} 
                                />
                                <div className="mt-2 flex justify-between items-center lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className={`${magdaLig.className} text-xs sm:text-sm uppercase tracking-widest text-zinc-600`}>
                                        Available in multiple volumes
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}

export default SearchPage