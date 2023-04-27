import "tailwindcss/tailwind.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import "../public/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <NextUIProvider>
      <ShopProvider>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ShopProvider>
    </NextUIProvider>
  );
}

export default MyApp;
