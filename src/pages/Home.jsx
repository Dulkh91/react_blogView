
import { useSearchParams } from "react-router-dom";
import Card from "../components/card/Card";
import Pagination from "../components/Pagination";

import { useLogin } from "../hooks/useFetch";

const Home = () => {

   const{data,loading,error} = useLogin('https://realworld.habsidev.com/api/articles')
  
  //  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

   const itemsPerPage = 10;

   if(loading) return <div className="flex justify-center">Loading....</div>;
   if(error) return <div className="flex justify-center">{error.message}</div>;


   const totalPages = Math.ceil(data?.articles.length / itemsPerPage); // ចំនួនផេក
    const startIndex = (currentPage - 1) * itemsPerPage; // ចាប់ផ្តើមពី ០
    const currentItems = data?.articles.slice(startIndex, startIndex + itemsPerPage); // ទិន្ន័យមួយម្តងៗ

  const handleCurrentPage = (page)=>{
       setSearchParams({page})
  } 
   
  return (
    <div className="min-h-screen flex flex-col ">
      <main className=" flex-1">
        {
          currentItems && currentItems.map(article=><Card key={article.title} data={article} />)
        }

      </main>
      <footer className="pb-16">
          <Pagination  
          totalPages={totalPages} 
          currentPage={currentPage}
          onPageChage={handleCurrentPage} />
        </footer>
    </div>
  );
};

export default Home;
