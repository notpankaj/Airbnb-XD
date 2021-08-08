import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

export default function Home({ exploreData, cardData }) {
  return (
    <div className="">
      <Head>
        <title>Air Bnb App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section>
          <h2 className="text-4xl font-semibold pb-5 pt-6">Explore Nerby</h2>
          {/* pull data from server */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item, i) => (
              <SmallCard key={i} item={item} />
            ))}
          </div>
          .
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 ">
            {cardData?.map(({ img, title }, i) => (
              <MediumCard key={i} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          description="Wishlists curated by Airbnb."
          title="The Greatest Outdoor"
          buttonText="Get inspire"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

  const cardData = await fetch("https://links.papareact.com/zp1")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);

  return {
    props: { exploreData, cardData }, // will be passed to the page component as props
  };
}
