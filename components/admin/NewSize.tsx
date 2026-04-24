'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { SizeForm } from '@/type';

// ── helpers ─────────────────────────
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

const inputCls =
  "w-full border border-zinc-300 text-sm px-3 py-2 outline-none";

// ── UI ─────────────────────────
const Field = ({ label, children }: any) => (
  <div className="space-y-1">
    <p className="text-xs text-zinc-500 uppercase">{label}</p>
    {children}
  </div>
);

// ── COMPONENT ─────────────────────────
const NewSize = ({ productId, perfumeName, onSuccess }: any) => {
  const [size, setSize] = useState<SizeForm>({
    slug: '',
    label: '',
    ml: '',
    price: '',
    onSale: false,
    salePrice: '',
    sku: '',
    in_stock: true,
    stock: '',
    images: [],
    previews: [],
  });

  const [loading, setLoading] = useState(false);

  // ── label change → auto slug + sku ──
  const handleLabel = (label: string) => {
    const slug = `${toSlug(perfumeName)}-${toSlug(label)}`;
    const sku = toSku(perfumeName, label);

    setSize(prev => ({ ...prev, label, slug, sku }));
  };

  // ── image upload ──
  const handleImages = (e: any) => {
    const files: File[] = Array.from(e.target.files || []);

    const previews: string[] = [];
    const imgs: File[] = [];

    files.forEach((file: File) => {
      imgs.push(file);
      previews.push(URL.createObjectURL(file));
    });

    setSize(prev => ({
      ...prev,
      images: [...prev.images, ...imgs],
      previews: [...prev.previews, ...previews],
    }));
  };

  const removeImage = (i: number) => {
    setSize(prev => ({
      ...prev,
      images: prev.images.filter((_, j) => j !== i),
      previews: prev.previews.filter((_, j) => j !== i),
    }));
  };

  // ── SAVE NEW SIZE ──
  const handleSave = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("label", size.label);
      data.append("ml", String(size.ml));
      data.append("price", String(size.price));
      data.append("salePrice", size.onSale ? String(size.salePrice) : "");
      data.append("onSale", JSON.stringify(size.onSale));
      data.append("stock", String(size.stock));
      data.append("slug", size.slug);
      data.append("sku", size.sku);

      size.images.forEach((img, i) => {
        data.append(`image_${i}`, img);
      });

      await axios.post(`/api/perfumes/${productId}/add-size`, data);

      alert("Size added");

      onSuccess(); // refresh parent
    } catch (err) {
      console.log(err);
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 space-y-4">

      <Field label="Label">
        <input
          className={inputCls}
          value={size.label}
          onChange={(e) => handleLabel(e.target.value)}
        />
      </Field>

      <Field label="Slug">
        <input className={inputCls} value={size.slug} readOnly />
      </Field>

      <Field label="SKU">
        <input className={inputCls} value={size.sku} readOnly />
      </Field>

      <Field label="ML">
        <input className={inputCls} value={size.ml} onChange={(e) => setSize({ ...size, ml: Number(e.target.value) })} />
      </Field>

      <Field label="Price">
        <input className={inputCls} value={size.price} onChange={(e) => setSize({ ...size, price: Number(e.target.value) })} />
      </Field>

      <label className="flex gap-2 text-sm">
        <input
          type="checkbox"
          checked={size.onSale}
          onChange={(e) => setSize({ ...size, onSale: e.target.checked })}
        />
        On Sale
      </label>

      {size.onSale && (
        <Field label="Sale Price">
          <input
            className={inputCls}
            value={size.salePrice}
            onChange={(e) => setSize({ ...size, salePrice: Number(e.target.value) })}
          />
        </Field>
      )}

      <Field label="Stock">
        <input
          className={inputCls}
          value={size.stock}
          onChange={(e) => setSize({ ...size, stock: Number(e.target.value) })}
        />
      </Field>

      {/* images */}
      <input type="file" multiple onChange={handleImages} />

      <div className="flex gap-2 flex-wrap">
        {size.previews.map((p, i) => (
          <div key={i} className="relative w-20 h-20">
            <Image src={p} alt="" fill className="object-cover" />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-0 right-0 px-1 bg-red-500 text-white text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? "Saving..." : "Add Size"}
      </button>
    </div>
  );
};

export default NewSize;