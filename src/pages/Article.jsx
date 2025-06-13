import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetch";
import Header from "../components/card/Header";
import Profile from "../components/card/Profile";
import TagList from "../components/card/TagList";
import { useAuthContext } from "../context/AuthContext";
import DeleteBtn from "../components/DeleteBtn";
import loading_image from "../assets/loading.svg";

const Article = () => {
  const { isLoging, user } = useAuthContext();
  const { slug } = useParams();
  
  const { data, loading } = useFetchData(`articles/${slug}`);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={loading_image} alt="" className="w-20 md:w-30" />
      </div>
    );

  // Check current user
  const isAuth = data?.article?.author?.username === user?.username;

  return (
    <div className="max-w-4xl mx-auto bg-white mt-5 p-5 rounded-sm shadow-lg space-y-4">
      <section className="flex justify-between gap-4 items-start">
        <main className=" flex-1">
          <Header titleData={data.article} />
          <div id="tag" className=" flex items-center gap-2">
            <TagList data={data.article} />
          </div>
          <article className="text-xs mt-1.5">
            <p className="leading-6">{data.article.description}</p>
          </article>
        </main>
        <div className=" text-right flex-shrink-0">
          <Profile dataProfile={data.article} />

          {isLoging && isAuth && (
            <div className=" space-x-3 mt-5 text-sm flex justify-end">
              {/* Delete article */}
              <DeleteBtn />

              {/* Edit data by slud  */}
              <div>
                <Link to={`/edit_article/${data.article.slug}/edit`}>
                  <button className="border border-lime-500 text-lime-500 rounded-sm px-4 p-1">
                    Edit
                  </button>{" "}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className=" space-y-5">
        <article>{data.article.body}</article>
      </section>
    </div>
  );
};

export default Article;
