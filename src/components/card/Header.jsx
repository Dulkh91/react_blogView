import { Link } from "react-router-dom";
import { useState } from "react";
import useArticle from "../../hooks/useArticle";
import { useAuthContext } from "../../context/AuthContext";

const Header = ({ titleData }) => {
  const { user, isLoging } = useAuthContext();
  const { onFavorite } = useArticle();
  const [favorited, setFavorited] = useState(titleData.favorited);
  const [favoritesCount, setFavoritesCount] = useState(
    titleData.favoritesCount,
  );
  const [error, setError] = useState(null);

  const handleFavorite = async () => {
    if (!isLoging || !user?.token) {
      setError("Please login your account");
      return;
    }

    const method = favorited ? "DELETE" : "POST";
    const slug = titleData.slug;
    const token = user.token;

    // Optimistic update
    setFavorited(!favorited);
    setFavoritesCount((prev) => (method === "POST" ? prev + 1 : prev - 1));
    setError(null);

    try {
      const res = await onFavorite(method, slug, token);
      if (res?.article) {
        setFavorited(res.article.favorited);
        setFavoritesCount(res.article.favoritesCount);
      }
    } catch (error) {
      // Revert on error
      setFavorited(titleData.favorited);
      setFavoritesCount(titleData.favoritesCount);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center">
      <Link to={`/articles/${titleData.slug}`}>
        <h2 className="text-blue-500 text-md md:text-lg cursor-pointer">
          {titleData.title}
        </h2>
      </Link>
      <div className="ml-3 flex items-center gap-1">
        <button
          onClick={handleFavorite}
          disabled={!isLoging}
          className={
            isLoging
              ? "cursor-pointer text-sm md:text-md"
              : "cursor-not-allowed opacity-50"
          }
        >
          {favorited ? "❤️" : "♡"}
        </button>
        <span className=" text-sm md:text-md">{favoritesCount}</span>
      </div>
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </div>
  );
};

export default Header;
