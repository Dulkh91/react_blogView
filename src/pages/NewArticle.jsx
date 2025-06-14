import useArticle from "../hooks/useArticle";
import { useAuthContext } from "../context/AuthContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CencalBTN from "../components/CencalBTN";
import ModalClose from "../modal/ModalClose";
import { useFetchData } from "../hooks/useFetch";
import slugify from "../utility/slugly";
import useDebounce from "../hooks/useDebounce";

const NewArticle = () => {
  const navi = useNavigate();
  const { createArticle } = useArticle();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const { user, isLoging } = useAuthContext();
  const { data } = useFetchData("articles");

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "article.tagList",
  });

  const onSubmit = async (data) => {
    try {
      const result = await createArticle(data.article, user?.token);
      navi(`/articles/${result.slug}`);
    } catch (error) {
      alert("Post failed:" + error.message);
    }
  };

  //ធ្វើ delage input ថាមានទិន្ន័យទេ?
  const watchTitle = watch("article.title") || "";
  const watchBody = watch("article.body").length;
  const watchInput = Boolean(watchTitle.length || watchBody);

  //* ** Compare input and date.title
  // call deboance
  const debounceQuery = useDebounce(watchTitle.toLocaleLowerCase(), 500);

  //process compare data & input
  useEffect(() => {
    if (!data?.articles || !debounceQuery) return;
    const match = data?.articles.some(
      (article) => article.slug === slugify(debounceQuery),
    );
    setIsDuplicated(match);
  }, [debounceQuery, data]);

  // Handle Navigage page when user create new_article without login
  if (!isLoging) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <div className="bg-white relative mt-5 max-w-3xl mx-auto p-5 rounded-sm shadow-lg">
        <h1 className="text-center">Create new article</h1>
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-5"
        >
          {/* Title field */}
          <div>
            <label htmlFor="title" className=" text-gray-500">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="border border-gray-400 block w-full rounded-sm p-2"
              placeholder="title"
              {...register("article.title")}
              autoFocus
            />

            {isDuplicated && (
              <label className="valid_text">{`The title '${watchTitle}' exit in database`}</label>
            )}
          </div>

          {/* Description field */}
          <div>
            <label htmlFor="description" className=" text-gray-500">
              Short description
            </label>
            <input
              type="text"
              name="description"
              className="border border-gray-400 block w-full rounded-sm p-2"
              {...register("article.description")}
              placeholder="title"
            />
          </div>

          {/* Body field */}
          <div>
            <label htmlFor="text" className=" text-gray-500">
              Text
            </label>
            <textarea
              rows={5}
              className="block border border-gray-400 p-2.5 w-full text-sm rounded-sm"
              placeholder="Text"
              {...register("article.body")}
            ></textarea>
          </div>

          {/* Tag field section */}
          <div className="space-y-2">
            <span className=" text-gray-500">Tag</span>
            {fields.map((field, index) => (
              <div className="flex gap-1 md:gap-5 items-center " key={field.id}>
                {/* inpute tag */}
                <input
                  type="text"
                  className="border border-gray-400 p-0.5 md:p-1.5 w-1/3  rounded-xs"
                  {...register(`article.tagList.${index}`)}
                  placeholder={`tag`}
                />

                {/* លុប tag តាម index */}
                <button
                  className={`border border-red-500 px-5 text-red-500 rounded-sm p-0.5 md:p-1.5`}
                  onClick={() => remove(index)}
                >
                  Delete
                </button>

                {/* បន្ថែម tag ហើយបង្ហាញតាម index នៅក្រោយ delete */}
                {fields.length - 1 === index ? (
                  <button
                    className={`border border-blue-400 px-5 text-blue-500 rounded-sm transition-all duration-300 p-0.5 md:p-1.5 select-none
                      ${watch(`article.tagList.${index}`).length === 0 && "pointer-events-none opacity-30"}`}
                    onClick={() => append("")}
                  >
                    Add tag
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>

          {/* Default tag */}
          {fields.length < 1 && (
            <button
              className={`border border-blue-400 px-4 md:px-5 text-blue-500 rounded-sm block mt-1 duration-500 transition-all`}
              onClick={() => append("")}
            >
              Tag
            </button>
          )}

          <button
            className={`bg-blue-500 px-20 p-1 rounded-sm text-white mt-5 select-none 
              ${isDuplicated && "pointer-events-none opacity-30"}
            `}
          >
            Send
          </button>
        </form>

        {/* Cancel Button */}
        <span
          className=" absolute top-2 right-2"
          onClick={() => (watchInput ? setIsModelOpen(true) : navi("/"))} //ប្រសិនជាមានទិន្ន័យក្នុង input នោះចេញ Modal ។ បើអត់ navi("/") ដំណើរការ
        >
          <CencalBTN />
        </span>
      </div>
      {/* Handle Modal close */}
      {isModelOpen && (
        <span className="bg-gray-600 w-full">
          <ModalClose
            title={"create new artilce"}
            isModalOpen={() => setIsModelOpen(false)}
          />
        </span>
      )}
    </>
  );
};
export default NewArticle;
