import { getCollection } from "../lib/shopify";
import Hero from "../components/Hero";
import Head from "next/head";
import FeaturedCollection from "../components/FeaturedCollection";
import FeaturedProducts from "../components/FeaturedProducts";
import BestSeller from "../components/BestSellers";
import ProductList from "../components/ProductList";

export default function Home({ bestSellers, unstoppable, exile, products }) {
  return (
    <div className="font-pirate">
      <Head>
        <title>PowrBox Boxing</title>
        <link rel="stylesheet" href="/fonts/pirate-ship.ttf" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=ISO-8859-1"
        />
        <meta
          name="description"
          content="Modern eCommerce Development Course focusing on Shopify, Next.js, TailwindCSS, GraphQL. Additional topics include Storefront API, Static Site Generation, getStaticPaths, getStaticProps and more."
        />
        <meta property="og:title" content="Modern eCommerce Course" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.buildnextshop.com" />
        <meta
          property="og:image"
          content="https://www.buildnextshop.com/share.png"
        />
        <meta
          property="og:description"
          content="Modern eCommerce Development Course focusing on Shopify, Next.js, TailwindCSS, GraphQL. Additional topics include Storefront API, Static Site Generation, getStaticPaths, getStaticProps and more."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Modern eCommerce Course" />
      </Head>
      <Hero />
      <ProductList products={products} />
      <BestSeller bestSellers={bestSellers} />
      <FeaturedCollection exile={exile} unstoppable={unstoppable} />
      <FeaturedProducts />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getCollection("frontpage");
  const exile = await getCollection("exile-series");
  const unstoppable = await getCollection("unstoppable-series");
  const bestSellers = await getCollection("our-best-sellers");

  return {
    props: { products, unstoppable, exile, bestSellers },
  };
}
