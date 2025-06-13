import { useSearchParams } from "react-router-dom";
import Card from "../components/card/Card";
import Pagination from "../components/Pagination";
import loading_image from '../assets/loading.svg'

import { useLogin } from "../hooks/useFetch";

const Home = () => {
  const API_URL = `${import.meta.env.VITE_API_URL}/articles`;

  const { data, loading, error } = useLogin(API_URL);

  //  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const itemsPerPage = 5;

  if (loading) return <div className="flex justify-center items-center min-h-screen">
    <img src={loading_image} alt="" className="w-20 md:w-30"/>
  </div>;
  if (error) return <div className="flex justify-center">{error.message}</div>;

  const totalPages = Math.ceil(data?.articles.length / itemsPerPage); // ចំនួនផេក
  const startIndex = (currentPage - 1) * itemsPerPage; // ចាប់ផ្តើមពី ០
  const currentItems = data?.articles.slice(
    startIndex,
    startIndex + itemsPerPage,
  ); // ទិន្ន័យមួយម្តងៗ

  const handleCurrentPage = (page) => {
    setSearchParams({ page });
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <main className=" flex-1">
        {currentItems &&
          currentItems.map((article) => (
            <Card key={article.title} data={article} />
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
