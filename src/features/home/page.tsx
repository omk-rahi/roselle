import { Helmet } from "react-helmet-async";
import { HomeCarousel } from "./components/home-carousel";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Roselle</title>
      </Helmet>
      <HomeCarousel />
    </>
  );
}
