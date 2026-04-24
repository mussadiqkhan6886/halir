import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import Perfume from "@/lib/models/ProductSchema";
import { PerfumeType } from "@/type";

type SitemapUrl = {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod: string;
};

export async function GET() {
  try {
    await connectDB();

    const data = await Perfume.find({}).lean();
    const products: PerfumeType[] = JSON.parse(JSON.stringify(data));

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://halir-seven.vercel.app";

    const urls: SitemapUrl[] = [];

    const now = new Date().toISOString();

    const staticPages = [
      '/',
      '/collections',
      '/add-review',
      '/about-us',
      '/privacy-policy',
      '/contact-us',
      '/shipping-and-returns',
      '/terms-and-condition',
    ];

    staticPages.forEach(page => {
      urls.push({
        loc: `${BASE_URL}${page}`,
        changefreq: "weekly",
        priority: page === '/' ? 1.0 : 0.7,
        lastmod: now,
      });
    });

    products.forEach(item => {
      if (!item.slug || !item.categories?.length) return;

      const category = item.categories[0];

      // Product URL
      urls.push({
        loc: `${BASE_URL}/collections/${category}/${item.slug}`,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: item.updatedAt
          ? new Date(item.updatedAt).toISOString()
          : now,
      });

      // Size URLs
      item.sizes?.forEach(size => {
        if (!size.slug) return;

        urls.push({
          loc: `${BASE_URL}/collections/${category}/${item.slug}/${size.slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: item.updatedAt
            ? new Date(item.updatedAt).toISOString()
            : now,
        });
      });
    });

    // ✅ Unique Categories (FIXED)
    const uniqueCategories = [
      ...new Set(products.flatMap(item => item.categories || []))
    ];

    uniqueCategories.forEach(category => {
      urls.push({
        loc: `${BASE_URL}/collections/${category}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: now,
      });
    });

    // ✅ Remove duplicates
    const uniqueUrls = Array.from(
      new Map(urls.map(u => [u.loc, u])).values()
    );

    // ✅ Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });

  } catch (error) {
    console.error("Sitemap Error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}