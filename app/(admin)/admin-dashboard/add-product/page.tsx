'use client';

import { NoteItem, PerfumeForm, SizeForm } from '@/type';
import Image from 'next/image';
import React, { useState, useRef } from 'react';


// ── Auto-generate helpers ─────────────────────────────────────

const toSlug = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const toSku = (name: string, label: string) => {
  const prefix = name
    .split(' ')
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3);
  const suffix = label.replace(/\s+/g, '').toUpperCase().slice(0, 6);
  return `HA-${prefix}-${suffix}`;
};

// ── Defaults ──────────────────────────────────────────────────

const emptyNote = (): NoteItem => ({ name: '', image: null, preview: '' });
const emptySize = (perfumeName = ''): SizeForm => ({
  slug: '', label: '', ml: '', price: '', onSale: false,
  salePrice: '', sku: '', in_stock: true, stock: '',
  images: [], previews: [],
});

const CATEGORIES = ['men', 'women', 'unisex', 'hot-sellers'];

// ── UI primitives ─────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-zinc-200 p-6 space-y-4">
    <h2 className="text-xs uppercase tracking-[0.3em] border-b border-zinc-200 pb-3 text-zinc-600">{title}</h2>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs uppercase tracking-widest text-zinc-600">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full border border-zinc-300 text-sm px-3 py-2.5 outline-none focus:border-zinc-800 transition-colors placeholder:text-zinc-400 bg-white";
const btnCls   = "text-xs uppercase tracking-widest px-4 py-2 border transition-colors cursor-pointer";

// ── Image Upload ──────────────────────────────────────────────

const ImageUpload = ({
  label, preview, onChange,
}: {
  label: string;
  preview?: string;
  onChange: (file: File, preview: string) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => onChange(file, ev.target?.result as string);
    r.readAsDataURL(file);
  };

  return (
    <Field label={label}>
      <div
        onClick={() => ref.current?.click()}
        className="border border-dashed border-zinc-300 hover:border-zinc-600 transition-colors cursor-pointer flex items-center relative justify-center min-h-[140px] overflow-hidden"
      >
        {preview ? (
          <Image fill src={preview} alt="" className="max-h-40 object-contain" />
        ) : (
          <span className="text-xs text-zinc-400">Click to upload</span>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
    </Field>
  );
};

// ── Multi Image Upload ────────────────────────────────────────

const MultiImageUpload = ({
  previews,
  onAdd,
  onRemove,
}: {
  previews: string[];
  onAdd: (files: File[], previews: string[]) => void;
  onRemove: (index: number) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const newPreviews: string[] = [];
    const newFiles: File[] = [];
    let loaded = 0;

    files.forEach((f, i) => {
      newFiles.push(f);
      const r = new FileReader();
      r.onload = (ev) => {
        newPreviews[i] = ev.target?.result as string;
        loaded++;
        if (loaded === files.length) onAdd(newFiles, newPreviews);
      };
      r.readAsDataURL(f);
    });

    // reset so same file can be re-selected
    e.target.value = '';
  };

  return (
    <Field label="Size Images">
      <div className="space-y-3">
        {/* Existing previews */}
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {previews.map((p, i) => (
              <div key={i} className="relative group w-20 h-20 border border-zinc-200 overflow-hidden flex-shrink-0">
                <Image fill src={p} alt="" className="w-full h-full object-cover object-bottom" />
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="absolute inset-0 bg-black/50 text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add more button */}
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className={`${btnCls} border-zinc-300 text-zinc-500 hover:border-zinc-700 hover:text-zinc-900 w-full`}
        >
          + Add Images
        </button>
        <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={handle} />
      </div>
    </Field>
  );
};

// ── Notes Editor ──────────────────────────────────────────────

const NotesEditor = ({
  type, notes, onChange,
}: {
  type: 'top' | 'heart' | 'base';
  notes: NoteItem[];
  onChange: (notes: NoteItem[]) => void;
}) => {
  const handleImage = (i: number, file: File, preview: string) => {
    const next = [...notes];
    next[i].image   = file;
    next[i].preview = preview;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500 capitalize">{type} notes</span>
        <button type="button" onClick={() => onChange([...notes, emptyNote()])}
          className={`${btnCls} border-zinc-300 text-zinc-500 hover:border-zinc-700 hover:text-zinc-900`}>
          + Add
        </button>
      </div>
      {notes.map((note, i) => (
        <div key={i} className="grid grid-cols-[1fr_80px_24px] gap-3 items-end">
          <input
            className={inputCls} placeholder="Note name e.g. Hawthorn"
            value={note.name} onChange={(e) => {
              const next = [...notes];
              next[i].name = e.target.value;
              onChange(next);
            }}
          />
          {/* Note image */}
          <div
            className="w-20 h-12 border border-dashed border-zinc-300 hover:border-zinc-500 cursor-pointer overflow-hidden flex relative items-center justify-center"
            onClick={() => {
              const inp = document.createElement('input');
              inp.type = 'file'; inp.accept = 'image/*';
              inp.onchange = (e) => {
                const f = (e.target as HTMLInputElement).files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = (ev) => handleImage(i, f, ev.target?.result as string);
                r.readAsDataURL(f);
              };
              inp.click();
            }}
          >
            {note.preview
              ? <Image fill src={note.preview} alt="" className="w-full h-full object-cover" />
              : <span className="text-[10px] text-zinc-400 text-center px-1">img</span>}
          </div>
          <button type="button" onClick={() => onChange(notes.filter((_, j) => j !== i))}
            className="text-zinc-400 hover:text-red-500 transition-colors text-lg leading-none mb-1">×</button>
        </div>
      ))}
    </div>
  );
};

// ── Size Editor ───────────────────────────────────────────────

const SizeEditor = ({
  size, index, perfumeName, onChange, onRemove,
}: {
  size: SizeForm;
  index: number;
  perfumeName: string;
  onChange: (s: SizeForm) => void;
  onRemove: () => void;
}) => {
  const set = (field: keyof SizeForm, value: any) => onChange({ ...size, [field]: value });

  const handleLabelChange = (label: string) => {
    const slug = perfumeName ? `${toSlug(perfumeName)}-${toSlug(label)}` : toSlug(label);
    const sku  = toSku(perfumeName, label);
    onChange({ ...size, label, slug, sku });
  };

  const addImages = (files: File[], newPreviews: string[]) => {
    onChange({
      ...size,
      images:   [...size.images, ...files],
      previews: [...size.previews, ...newPreviews],
    });
  };

  const removeImage = (i: number) => {
    onChange({
      ...size,
      images:   size.images.filter((_, j) => j !== i),
      previews: size.previews.filter((_, j) => j !== i),
    });
  };

  return (
    <div className="border border-zinc-200 p-5 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest text-zinc-400">Size {index + 1}</span>
        <button type="button" onClick={onRemove} className="text-zinc-400 hover:text-red-500 text-sm transition-colors">Remove</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Label">
          <input className={inputCls} placeholder="100ml"
            value={size.label} onChange={e => handleLabelChange(e.target.value)} />
        </Field>
        <Field label="ML">
          <input className={inputCls} type="number" placeholder="100"
            value={size.ml} onChange={e => set('ml', e.target.value === '' ? '' : Number(e.target.value))} />
        </Field>
        <Field label="Slug (auto)">
          <input className={`${inputCls} bg-zinc-50 text-zinc-400`} value={size.slug}
            onChange={e => set('slug', e.target.value)} placeholder="auto-generated" />
        </Field>
        <Field label="SKU (auto)">
          <input className={`${inputCls} bg-zinc-50 text-zinc-400`} value={size.sku}
            onChange={e => set('sku', e.target.value)} placeholder="auto-generated" />
        </Field>
        <Field label="Price (PKR)">
          <input className={inputCls} type="number" placeholder="6800"
            value={size.price} onChange={e => set('price', e.target.value === '' ? '' : Number(e.target.value))} />
        </Field>
        <Field label="Stock">
          <input className={inputCls} type="number" placeholder="0"
            value={size.stock} onChange={e => set('stock', e.target.value === '' ? '' : Number(e.target.value))} />
        </Field>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={size.onSale} onChange={e => set('onSale', e.target.checked)} className="w-3.5 h-3.5" />
          <span className="text-xs text-zinc-500 uppercase tracking-widest">On Sale</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={size.in_stock} onChange={e => set('in_stock', e.target.checked)} className="w-3.5 h-3.5" />
          <span className="text-xs text-zinc-500 uppercase tracking-widest">In Stock</span>
        </label>
      </div>

      {size.onSale && (
        <Field label="Sale Price (PKR)">
          <input className={inputCls} type="number" placeholder="2500" value={size.salePrice}
            onChange={e => set('salePrice', e.target.value === '' ? '' : Number(e.target.value))} />
        </Field>
      )}

      <MultiImageUpload
        previews={size.previews}
        onAdd={addImages}
        onRemove={removeImage}
      />
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────

const INITIAL: PerfumeForm = {
  slug: '', name: '', categories: [], tagline: '', description: '',
  mainImage: null, mainImagePreview: '', gender: '', longevity: '',
  notes: { top: [emptyNote()], heart: [emptyNote()], base: [emptyNote()] },
  sizes: [emptySize()],
};

export default function AddPerfumePage() {
  const [form, setForm]             = useState<PerfumeForm>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');

  const set = (field: keyof PerfumeForm, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  // Name change → regenerate slug + all size slugs/skus
  const handleNameChange = (name: string) => {
    const slug  = toSlug(name);
    const sizes = form.sizes.map(s => ({
      ...s,
      slug: s.label ? `${toSlug(name)}-${toSlug(s.label)}` : s.slug,
      sku:  s.label ? toSku(name, s.label) : s.sku,
    }));
    setForm(prev => ({ ...prev, name, slug, sizes }));
  };

  const toggleCategory = (cat: string) =>
    set('categories', form.categories.includes(cat)
      ? form.categories.filter(c => c !== cat)
      : [...form.categories, cat]);

  const updateSize = (i: number, s: SizeForm) =>
    set('sizes', form.sizes.map((sz, j) => j === i ? s : sz));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const data = new FormData();

      data.append('slug',        form.slug);
      data.append('name',        form.name);
      data.append('tagline',     form.tagline);
      data.append('description', form.description);
      data.append('gender',      form.gender);
      data.append('longevity',   form.longevity);
      data.append('categories',  JSON.stringify(form.categories));

      if (form.mainImage) data.append('mainImage', form.mainImage);

      const notesJson = {
        top:   form.notes.top.map(n => ({ name: n.name })),
        heart: form.notes.heart.map(n => ({ name: n.name })),
        base:  form.notes.base.map(n => ({ name: n.name })),
      };
      data.append('notes', JSON.stringify(notesJson));

      (['top', 'heart', 'base'] as const).forEach(tier =>
        form.notes[tier].forEach((note, i) => {
          if (note.image) data.append(`note_${tier}_${i}`, note.image);
        })
      );

      const sizesJson = form.sizes.map(s => ({
        slug: s.slug, label: s.label, ml: s.ml, price: s.price,
        onSale: s.onSale, salePrice: s.onSale ? s.salePrice : null,
        sku: s.sku, in_stock: s.in_stock, stock: s.stock,
      }));
      data.append('sizes', JSON.stringify(sizesJson));

      form.sizes.forEach((s, si) =>
        s.images.forEach((img, ii) =>
          data.append(`size_${si}_image_${ii}`, img)
        )
      );

      const res = await fetch('/api/perfumes', { method: 'POST', body: data });
      if (!res.ok) throw new Error((await res.json()).message ?? 'Failed');

      setSubmitted(true);
      setForm(INITIAL);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight">Add Perfume</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Section title="Basic Info">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name">
                <input className={inputCls} placeholder="Farenheit" value={form.name}
                  onChange={e => handleNameChange(e.target.value)} required />
              </Field>
              <Field label="Slug (auto)">
                <input className={`${inputCls} bg-zinc-50 text-zinc-400`} value={form.slug}
                  onChange={e => set('slug', e.target.value)} placeholder="auto-generated" />
              </Field>
            </div>
            <Field label="Tagline">
              <input className={inputCls} placeholder="The scent of raw masculinity" value={form.tagline}
                onChange={e => set('tagline', e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea className={`${inputCls} resize-none h-24`} placeholder="Describe the fragrance..."
                value={form.description} onChange={e => set('description', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Gender">
                <select className={inputCls} value={form.gender}
                  onChange={e => set('gender', e.target.value)} required>
                  <option value="" disabled>Select</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </Field>
              <Field label="Longevity">
                <input className={inputCls} placeholder="6–10 hours" value={form.longevity}
                  onChange={e => set('longevity', e.target.value)} />
              </Field>
            </div>
          </Section>

          <Section title="Main Image">
            <ImageUpload
              label="Cover Image"
              preview={form.mainImagePreview}
              onChange={(file, preview) => setForm(p => ({ ...p, mainImage: file, mainImagePreview: preview }))}
            />
          </Section>

          <Section title="Categories">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                  className={`${btnCls} text-xs ${
                    form.categories.includes(cat)
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'border-zinc-300 text-zinc-500 hover:border-zinc-600 hover:text-zinc-800'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Fragrance Notes">
            <div className="space-y-6">
              {(['top', 'heart', 'base'] as const).map(tier => (
                <NotesEditor key={tier} type={tier} notes={form.notes[tier]}
                  onChange={notes => setForm(p => ({ ...p, notes: { ...p.notes, [tier]: notes } }))} />
              ))}
            </div>
          </Section>

          <Section title="Sizes">
            <div className="space-y-4">
              {form.sizes.map((size, i) => (
                <SizeEditor key={i} size={size} index={i} perfumeName={form.name}
                  onChange={s => updateSize(i, s)}
                  onRemove={() => set('sizes', form.sizes.filter((_, j) => j !== i))} />
              ))}
              <button type="button"
                onClick={() => set('sizes', [...form.sizes, emptySize(form.name)])}
                className={`${btnCls} w-full border-zinc-300 text-zinc-500 hover:border-zinc-700 hover:text-zinc-900`}>
                + Add Size
              </button>
            </div>
          </Section>

          <button type="submit" disabled={submitting}
            className="w-full py-4 bg-zinc-900 text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            {submitting ? 'Uploading...' : 'Add Perfume'}
          </button>
        </form>
        {submitted && (
          <div className="mt-6 border border-green-300 bg-green-50 text-green-700 text-sm px-4 py-3">
            ✓ Perfume added successfully.
          </div>
        )}
        {error && (
          <div className="mt-6 border border-red-300 bg-red-50 text-red-600 text-sm px-4 py-3">
            ✗ {error}
          </div>
        )}
      </div>
    </main>
  );
}