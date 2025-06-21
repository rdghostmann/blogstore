import React from "react";
import { getAllProducts } from "@/controllers/getAllProduct";
import { getFeaturedProducts } from "@/controllers/getFeaturedProduct";
import StorePage from "./StorePage";


export const metadata = {
    title: "Store | Modern Web App",
    description: "Shop our curated selection of tech products.",
};


export default async function page() {
    const [productsResult, featuredProductsResult] = await Promise.allSettled([
        getAllProducts(),
        getFeaturedProducts(),
    ]);

    const products =  productsResult.status === "fulfilled" ? productsResult.value : [];
    const featuredProducts = featuredProductsResult.status === "fulfilled" ? featuredProductsResult.value : [];

    return (
        <StorePage featuredProducts={featuredProducts} products={products} />
    );
};

