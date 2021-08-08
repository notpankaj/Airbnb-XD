import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResult }) {
  console.log(searchResult);

  const router = useRouter();

  // console.log(router.query);
  const { location, startDate, endDate, noOfGuest } = router.query;

  const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatedStartDate} - ${formatedEndDate} - ${noOfGuest} guests`;

  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${noOfGuest}`} />

      <main className="flex">
        <section className="flex-grow px-6 pt-14">
          <p className="text-xs">300+ stay {range}</p>
          <h1 className="text-3xl mb-6 mt-2 font-semibold">
            Stays in {location}
          </h1>
          <div className="hidden  mb-5 space-x-3 text-gray-800 whitespace-nowrap   lg:inline-flex">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResult.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  description={description}
                  location={location}
                  title={title}
                  total={total}
                  price={price}
                  star={star}
                />
              )
            )}
          </div>
        </section>
        {/* <section className="hidden xl:inline-flex"> */}
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResult={searchResult} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const searchResult = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  if (!searchResult) return { props: { searchResult: "empty" } };

  return {
    props: {
      searchResult,
    },
  };
}
