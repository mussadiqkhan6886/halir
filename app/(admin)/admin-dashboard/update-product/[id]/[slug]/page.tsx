'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const inputCls =
  "w-full bg-transparent border-b border-zinc-400 text-sm py-2 outline-none focus:border-zinc-700 transition-colors text-zinc-800";

const labelCls =
  "text-[10px] uppercase tracking-[0.2em] text-zinc-500";

const Field = ({ label, children }: any) => (
  <div className="space-y-1">
    <p className={labelCls}>{label}</p>
    {children}
  </div>
);

// ── SLUG (product + label) ─────────────────────────────
const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

// ── SKU GENERATOR ───────────────────────────────────────
const toSku = (name: string, label: string) => {
  const prefix = name
    .split(' ')
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3);

  const suffix = label
    .replace(/\s+/g, '')
    .toUpperCase()
    .slice(0, 6);

  return `HA-${prefix}-${suffix}`;
};

const Page = ({ params }: { params: Promise<{ id: string; slug: string }> }) => {
  const router = useRouter();

  const [productId, setProductId] = useState("");
  const [mainSlug, setMainSlug] = useState("");

  const [sizeSlug, setSizeSlug] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [label, setLabel] = useState("");
  const [ml, setMl] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [stock, setStock] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ───────────────── FETCH ─────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id, slug } = await params;

        setProductId(id);
        setSizeSlug(slug);

        const res = await axios.get(`/api/perfumes/${id}`);
        const product = res.data.product;

        const size = product.sizes.find((s: any) => s.slug === slug);

        if (!size) throw new Error("Size not found");

        setMainSlug(product.slug);

        setLabel(size.label);
        setMl(size.ml);
        setPrice(size.price);
        setSalePrice(size.salePrice || "");
        setOnSale(size.onSale);
        setStock(size.stock);
        setImages(size.images || []);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ───────────────── AUTO SLUG + SKU FIX ───────────────
  useEffect(() => {
    if (label && mainSlug) {
      const baseSlug = `${toSlug(mainSlug)}-${toSlug(label)}`;
      setSizeSlug(baseSlug);
    }
  }, [label, mainSlug]);

  // ───────────────── IMAGE HANDLER ─────────────────────
  const handleNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages(prev => [...prev, ...files]);
  };

  const removeOldImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  // ───────────────── SAVE ──────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();

      data.append("label", label);
      data.append("ml", ml);
      data.append("price", price);
      data.append("salePrice", salePrice);
      data.append("onSale", JSON.stringify(onSale));
      data.append("stock", stock);

      // 🔥 AUTO GENERATED VALUES
      data.append("slug", sizeSlug);
      data.append("sku", toSku(mainSlug, label));

      data.append("existingImages", JSON.stringify(images));

      newImages.forEach((file, i) => {
        data.append(`image_${i}`, file);
      });

      const {slug} = await params

      await axios.put(
        `/api/perfumes/${productId}/${slug}`,
        data
      );

      setSuccess("Size updated successfully");

      setTimeout(() => router.back(), 1200);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">

      <h1 className="text-2xl font-bold uppercase">Update Size</h1>
      <Field label="Label">
        <input
          className={inputCls}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </Field>

      {/* SLUG */}
      <p className="text-xs text-zinc-500">
        slug: {sizeSlug}
      </p>

      {/* SKU PREVIEW */}
      <p className="text-xs text-zinc-500">
        sku: {toSku(mainSlug, label)}
      </p>

      {/* ML */}
      <Field label="ML">
        <input className={inputCls} value={ml} onChange={(e) => setMl(e.target.value)} />
      </Field>

      {/* PRICE */}
      <Field label="Price">
        <input className={inputCls} value={price} onChange={(e) => setPrice(e.target.value)} />
      </Field>

      {/* ON SALE */}
      <Field label="On Sale">
        <select
          className={inputCls}
          value={onSale ? "true" : "false"}
          onChange={(e) => setOnSale(e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </Field>

      {/* SALE PRICE */}
      {onSale && (
        <Field label="Sale Price">
          <input
            className={inputCls}
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </Field>
      )}

      {/* STOCK */}
      <Field label="Stock">
        <input className={inputCls} value={stock} onChange={(e) => setStock(e.target.value)} />
      </Field>

      {/* OLD IMAGES */}
      <Field label="Current Images">
        <div className="flex gap-3 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative w-20 h-24 border">
              <Image src={img} alt="" fill className="object-cover" />
              <button
                onClick={() => removeOldImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </Field>

      {/* NEW IMAGES */}
      <Field label="New Images">
        <div className="flex gap-3 flex-wrap">
          {newImages.map((file, i) => (
            <div key={i} className="w-20 h-24 border relative flex items-center justify-center text-[10px]">
              {file.name}
              <button
                onClick={() => removeNewImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <input type="file" multiple onChange={handleNewImages} />
      </Field>

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-black text-white py-3"
      >
        {saving ? "Saving..." : "Update Size"}
      </button>
      
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
};

export default Page;