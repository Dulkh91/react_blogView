import { useSearchParams } from "react-router-dom";
import Card from "../components/card/Card";
import Pagination from "../components/Pagination";
import loading_image from "../assets/loading.svg";

import { useFetchData } from "../hooks/useFetch";

const Home = () => {
  const { data, loading, error, refecth } = useFetchData("articles");

  //ដោយសារ ទិន្ន័យមានបញ្ហាដែល slug មានទទេ គឺខូចទិន្ន័យដែលមិនអាចប្រើបាន
  const clearData = data?.articles.filter((d) => d.slug);

  //  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const itemsPerPage = 5;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={loading_image} alt="" className="w-20 md:w-30" />
      </div>
    );
  if (error) return <div className="flex justify-center">{error.message}</div>;

  const totalPages = Math.ceil(clearData.length / itemsPerPage); // ចំនួនផេក
  const startIndex = (currentPage - 1) * itemsPerPage; // ចាប់ផ្តើមពី ០
  const currentItems = clearData.slice(startIndex, startIndex + itemsPerPage); // ទិន្ន័យមួយម្តងៗ

  const handleCurrentPage = (page) => {
    setSearchParams({ page });
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <main className=" flex-1">
        {currentItems &&
          currentItems.map((article) => (
            <Card key={article.title} data={article} onRefech={refecth} />
          ))}
      </main>
      <footer className="pb-16">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChage={handleCurrentPage}
        />
      </footer>
    </div>
  );
};

export default Home;
