import useArticle from "../hooks/useArticle";
import { useAuthContext } from "../context/AuthContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CencalBTN from "../components/CencalBTN";
import ModalClose from "../modal/ModalClose";
import { useFetchData } from "../hooks/useFetch";
import slugify from "../utility/slugly";
import useDebounce from "../hooks/useDebounce";

const EditArticle = () => {
  const navi = useNavigate();
  const { updateArticle } = useArticle();
  const { slug } = useParams(); // Get slug for edit article
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);

  const { user, isLoging } = useAuthContext();

  const { register, handleSubmit, control, watch, setValue } = useForm({
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

  // fetch data for reuse in form
  useEffect(() => {
    const API_ULR = import.meta.env.VITE_API_URL;
    // បញ្ចូល value ទៅកាន់ input form

    fetch(`${API_ULR}/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setValue("article.title", data.article.title);
        setValue("article.description", data.article.description);
        setValue("article.body", data.article.body);
        setValue("article.tagList", data.article.tagList);
      });
  }, [slug, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateArticle(slug, data.article, user?.token);
      navi("/articles");
    } catch (error) {
      alert("Post failed:" + error.message);
    }
  };

  //ធ្វើ delage input ថាមានទិន្ន័យទេ?
  const watchTitle = watch("article.title");
  const watchBody = watch("article.body").length;
  const watchInput = Boolean(watchTitle.length || watchBody);

  //process compare data & input
  // call debounce
  const debounceQuery = useDebounce(watchTitle.toLocaleLowerCase(), 500);
  const { data } = useFetchData("articles");

  useEffect(() => {
    if (!data?.articles || !debounceQuery) return;
    //Input  វាដូចនៅ database និងត្រូវខុសពី slug url
    const match = data?.articles.some(
      (article) =>
        article.slug === slugify(debounceQuery) && article.slug !== slug,
    );
    setIsDuplicated(match);
  }, [debounceQuery, data]);

  // Handle Navigage page when user create new_article without login
  if (!isLoging) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <div className="bg-white relative mt-5 max-w-3xl mx-auto p-5 rounded-sm shadow-lg space-y-5 ">
        <h1 className="text-center">Edit article</h1>

        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-3"
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
          {fields.length !== 0 && (
            <div className="space-y-2">
              <span>Tag</span>
              {fields.map((field, index) => (
                <div
                  className="flex gap-1 md:gap-5 items-center "
                  key={field.id}
                >
                  {/* inpute tag */}
                  <input
                    type="text"
                    className="border border-gray-400 p-0.5 md:p-1.5 w-1/3  rounded-xs  opacity-30"
                    disabled
                    {...register(`article.tagList.${index}`)}
                    placeholder={`tag`}
                  />

                  {/* លុប tag តាម index */}
                  <button
                    className={`border border-red-500 px-5 text-red-500 rounded-sm p-0.5 md:p-1.5 opacity-30`}
                    hidden
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>

                  {/* បន្ថែម tag ហើយបង្ហាញតាម index នៅក្រោយ delete */}
                  {fields.length - 1 === index ? (
                    <button
                      className={`border border-blue-400 px-5 text-blue-500 rounded-sm transition-all duration-300 p-0.5 md:p-1.5 select-none
                      ${watch(`article.tagList.${index}`).length === 0 && "pointer-events-none opacity-30"}`}
                      hidden
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
          )}

          {/* Default tag */}
          {fields.length < 1 && (
            <button
              className={`border border-blue-400 px-4 md:px-5 text-blue-500 rounded-sm block mt-1 duration-500 transition-all 
                ${!fields.length && "hidden"}`}
              onClick={() => append("")}
            >
              Tag
            </button>
          )}
          {/* updata button */}
          <button
            className={`bg-blue-500 px-20 p-1 rounded-sm text-white mt-5 select-none ${isDuplicated && "pointer-events-none opacity-35"}`}
          >
            Update
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
            title={`edit article`}
            isModalOpen={() => setIsModelOpen(false)}
          />
        </span>
      )}
    </>
  );
};
export default EditArticle;
