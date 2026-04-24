'use client';

import { PerfumeNote, PerfumeType } from '@/type';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FiTrash } from 'react-icons/fi';

// ── Types ─────────────────────────────────────────────────────

interface NoteFormItem { name: string; image: File | null; preview: string; existingUrl: string }

// ── Helpers ───────────────────────────────────────────────────

const inputCls = "w-full bg-transparent border-b border-zinc-400 text-sm py-2 outline-none focus:border-zinc-700 transition-colors placeholder:text-zinc-700 text-zinc-800"
const labelCls = "text-[10px] uppercase tracking-[0.2em] text-zinc-500"

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <p className={labelCls}>{label}</p>
    {children}
  </div>
)

const toSlug = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// ── Main Page ─────────────────────────────────────────────────

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [productData, setProductData] = useState<PerfumeType | null>(null)
  const [loading, setLoading]         = useState(false)
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState("")
  const [success, setSuccess]         = useState("")
  const router = useRouter()
  // Form state
  const [name, setName]               = useState("")
  const [slug, setSlug]               = useState("")
  const [tagline, setTagline]         = useState("")
  const [description, setDescription] = useState("")
  const [gender, setGender]           = useState("")
  const [longevity, setLongevity]     = useState("")
  const [categories, setCategories]   = useState<string[]>([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  // Main image
  const [mainImageUrl, setMainImageUrl]         = useState("")
  const [mainImageFile, setMainImageFile]       = useState<File | null>(null)
  const [mainImagePreview, setMainImagePreview] = useState("")
  const mainImageRef = useRef<HTMLInputElement>(null)

  // Notes
  const [notes, setNotes] = useState<{
    top: NoteFormItem[]; heart: NoteFormItem[]; base: NoteFormItem[]
  }>({ top: [], heart: [], base: [] })

  const CATEGORIES = ['men', 'women', 'unisex', 'hot-sellers']

  // ── Fetch ───────────────────────────────────────────────────

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { id } = await params
        const res = await axios.get(`/api/perfumes/${id}`)
        const p: PerfumeType = res.data.product
        setProductData(p)

        // Populate form
        setName(p.name)
        setSlug(p.slug)
        setTagline(p.tagline)
        setDescription(p.description)
        setGender(p.gender)
        setLongevity(p.longevity)
        setCategories(p.categories)
        setMainImageUrl(p.mainImage)

        const toFormNote = (n: PerfumeNote): NoteFormItem => ({
          name: n.name, image: null, preview: '', existingUrl: n.image
        })
        setNotes({
          top:   p.notes.top.map(toFormNote),
          heart: p.notes.heart.map(toFormNote),
          base:  p.notes.base.map(toFormNote),
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // ── Image helpers ───────────────────────────────────────────

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMainImageFile(file)
    const r = new FileReader()
    r.onload = (ev) => setMainImagePreview(ev.target?.result as string)
    r.readAsDataURL(file)
  }

  const handleNoteImage = (tier: 'top' | 'heart' | 'base', i: number, file: File) => {
    const r = new FileReader()
    r.onload = (ev) => {
      setNotes(prev => {
        const next = { ...prev, [tier]: [...prev[tier]] }
        next[tier][i] = { ...next[tier][i], image: file, preview: ev.target?.result as string }
        return next
      })
    }
    r.readAsDataURL(file)
  }

  const removeNoteImage = (tier: 'top' | 'heart' | 'base', i: number) => {
    setNotes(prev => {
      const next = { ...prev, [tier]: [...prev[tier]] }
      next[tier][i] = { ...next[tier][i], image: null, preview: '', existingUrl: '' }
      return next
    })
  }

  const addNote = (tier: 'top' | 'heart' | 'base') => {
    setNotes(prev => ({
      ...prev,
      [tier]: [...prev[tier], { name: '', image: null, preview: '', existingUrl: '' }]
    }))
  }

  const removeNote = (tier: 'top' | 'heart' | 'base', i: number) => {
    setNotes(prev => ({ ...prev, [tier]: prev[tier].filter((_, j) => j !== i) }))
  }

  const updateNoteName = (tier: 'top' | 'heart' | 'base', i: number, val: string) => {
    setNotes(prev => {
      const next = { ...prev, [tier]: [...prev[tier]] }
      next[tier][i] = { ...next[tier][i], name: val }
      return next
    })
  }

  const toggleCategory = (cat: string) =>
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])

  // ── Submit ──────────────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess("")
    try {
      const data = new FormData()
      data.append('name', name)
      data.append('slug', slug)
      data.append('tagline', tagline)
      data.append('description', description)
      data.append('gender', gender)
      data.append('longevity', longevity)
      data.append('categories', JSON.stringify(categories))

      if (mainImageFile) data.append('mainImage', mainImageFile)
      else data.append('mainImageUrl', mainImageUrl)

      const notesJson = {
        top:   notes.top.map(n => ({ name: n.name, existingUrl: n.existingUrl })),
        heart: notes.heart.map(n => ({ name: n.name, existingUrl: n.existingUrl })),
        base:  notes.base.map(n => ({ name: n.name, existingUrl: n.existingUrl })),
      };
      data.append('notes', JSON.stringify(notesJson));

      (['top', 'heart', 'base'] as const).forEach(tier =>
        notes[tier].forEach((note, i) => {
          if (note.image) data.append(`note_${tier}_${i}`, note.image)
        })
      )

      const { id } = await params
      await axios.put(`/api/perfumes/${id}`, data)
      setSuccess("Saved successfully.")
      setTimeout(() => {
        router.push("/admin-dashboard/products-list")
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (name) {
      setSlug(toSlug(name))
    }
  }, [name])

  const deleteSize = async (slug: string) => {
    const {id} = await params
    try{
      setDeleteLoading(true)
      await axios.delete(`/api/perfumes/${id}/${slug}`)
      setProductData(prev =>
  prev
    ? {
        ...prev,
        sizes: prev.sizes.filter(item => item.slug !== slug),
      }
    : prev
);
    }catch(err){
      console.log(err)
      alert("failed to delete")
    }finally{
      setDeleteLoading(false)
    }
  }
  // ── States ──────────────────────────────────────────────────

  if (loading) return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-5 h-5 border border-zinc-600 border-t-zinc-200 rounded-full animate-spin" />
    </main>
  )

  if (error && !productData) return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <p className="text-red-400 text-sm">{error}</p>
    </main>
  )

  if (!productData) return null

  const tiers = ['top', 'heart', 'base'] as const

  return (
    <main className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="flex items-end justify-between border-b border-zinc-800 pb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">Admin / Update</p>
            <h1 className="text-3xl font-black uppercase tracking-tight">{productData.name}</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed border"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* ── Section 1: Core Info ─────────────────────────── */}
        <div className="space-y-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Core Info</p>

          <div className="grid grid-cols-2 gap-6">
            <Field label="Name">
              <input className={inputCls} value={name} onChange={e => setName(e.target.value)} />
            </Field>
            <Field label="Slug">
              <input className={inputCls} value={slug} onChange={e => setSlug(e.target.value)} />
            </Field>
            <Field label="Gender">
              <select className={`${inputCls} bg-transparent`} value={gender} onChange={e => setGender(e.target.value)}>
                <option value="men" >Men</option>
                <option value="women" >Women</option>
                <option value="unisex" >Unisex</option>
              </select>
            </Field>
            <Field label="Longevity">
              <input className={inputCls} value={longevity} onChange={e => setLongevity(e.target.value)} placeholder="6–10 hours" />
            </Field>
          </div>

          <Field label="Tagline">
            <input className={inputCls} value={tagline} onChange={e => setTagline(e.target.value)} />
          </Field>

          <Field label="Description">
            <textarea
              className={`${inputCls} resize-none h-24 border border-zinc-700 rounded-none px-3 pt-2 focus:border-zinc-400`}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Field>

          {/* Categories */}
          <Field label="Categories">
            <div className="flex gap-2 mt-1 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat} type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`text-xs uppercase tracking-widest px-4 py-1.5 border transition-colors cursor-pointer ${
                    categories.includes(cat)
                      ? 'border-black bg-black text-zinc-100'
                      : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {/* ── Main Image ───────────────────────────────────── */}
        <div className="space-y-4">
          <p className={labelCls}>Main Image</p>
          <div className="flex gap-6 items-start">
            <div className="relative w-32 h-40 bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0">
              {(mainImagePreview || mainImageUrl) && (
                <Image
                  src={mainImagePreview || mainImageUrl}
                  alt="Main"
                  fill
                  className="object-cover object-bottom"
                />
              )}
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => mainImageRef.current?.click()}
                className="text-xs uppercase tracking-widest px-4 py-2 border border-zinc-700 text-zinc-600 hover:border-black hover:text-black transition-colors cursor-pointer"
              >
                Replace Image
              </button>
              {mainImagePreview && (
                <button
                  type="button"
                  onClick={() => { setMainImageFile(null); setMainImagePreview("") }}
                  className="block text-xs text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  ✕ Cancel replacement
                </button>
              )}
              {mainImagePreview && (
                <p className="text-[10px] text-zinc-500">New image selected — save to apply</p>
              )}
            </div>
          </div>
          <input ref={mainImageRef} type="file" accept="image/*" className="hidden" onChange={handleMainImage} />
        </div>

        {/* ── Fragrance Notes ──────────────────────────────── */}
        <div className="space-y-6">
          <p className={labelCls}>Fragrance Notes</p>
          {tiers.map(tier => (
            <div key={tier} className="border border-zinc-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-zinc-400 capitalize">{tier}</p>
                <button type="button" onClick={() => addNote(tier)}
                  className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer">
                  + Add
                </button>
              </div>
              {notes[tier].map((note, i) => (
                <div key={i} className="grid grid-cols-[1fr_64px_20px] gap-3 items-center">
                  <input
                    className={inputCls}
                    value={note.name}
                    placeholder="Note name"
                    onChange={e => updateNoteName(tier, i, e.target.value)}
                  />
                  {/* Note image */}
                  <div className="relative w-16 h-10 border border-zinc-700 overflow-hidden group cursor-pointer"
                    onClick={() => {
                      const inp = document.createElement('input')
                      inp.type = 'file'; inp.accept = 'image/*'
                      inp.onchange = (e) => {
                        const f = (e.target as HTMLInputElement).files?.[0]
                        if (f) handleNoteImage(tier, i, f)
                      }
                      inp.click()
                    }}
                  >
                    {(note.preview || note.existingUrl) ? (
                      <>
                        <Image src={note.preview || note.existingUrl} alt="" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[9px] text-white uppercase tracking-wide">Change</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[9px] text-zinc-600">img</span>
                      </div>
                    )}
                  </div>
                  <button type="button" onClick={() => removeNote(tier, i)}
                    className="text-zinc-600 hover:text-red-500 transition-colors text-base cursor-pointer">×</button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Section 2: Sizes ─────────────────────────────── */}
        <div className="space-y-4">
          <p className={labelCls}>Sizes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productData.sizes.map(item => (
              <div key={item.slug}>
               {deleteLoading ? <div className="border-zinc-700 border border-t-transparent bg-transparent w-3 h-3 mb-2 animate-spin rounded-full" /> : <FiTrash className='inline-block mb-2 cursor-pointer' color='red' onClick={() => deleteSize(item.slug)} />}
                <Link
                  href={`/admin-dashboard/update-product/${productData._id}/${item.slug}`}
                  className="group border border-zinc-800 hover:border-zinc-600 transition-colors p-4 flex gap-4 items-start"
                >
                  <div className="relative w-16 h-20 overflow-hidden flex-shrink-0">
                    <Image src={item.images[0]} alt={item.label} fill className="object-cover object-bottom" />
                  </div>
                  <div className="flex flex-col justify-between h-20 flex-grow">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-zinc-700 group-hover:text-black transition-colors">{item.label}</p>
                      <p className="text-lg font-bold mt-0.5">
                        {item.onSale ? item.salePrice : item.price}
                        {item.onSale && (
                          <span className="text-xs text-zinc-500 line-through ml-2">{item.price}</span>
                        )}
                        <span className="text-xs text-zinc-500 ml-1">PKR</span>
                      </p>
                    </div>
                    <div className="flex gap-4 text-xs text-zinc-500">
                      <span>{item.ml}ml</span>
                      <span className={item.stock <= 3 ? 'text-red-400' : ''}>{item.stock} in stock</span>
                      {item.onSale && <span className="text-red-400 uppercase tracking-widest">Sale</span>}
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-black transition-colors text-lg self-center">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom save */}
        <div className="border-t border-zinc-800 pt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed border"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
          {success && <p className="text-green-400 text-sm border border-green-700 px-4 py-2.5">✓ {success}</p>}
        {error   && <p className="text-red-400 text-sm border border-red-700  px-4 py-2.5">✗ {error}</p>}
      </div>
    </main>
  )
}

export default Page