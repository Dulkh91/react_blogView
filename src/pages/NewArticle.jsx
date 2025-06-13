import useArticle from "../hooks/useArticle";
import { useAuthContext } from "../context/AuthContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CencalBTN from "../components/CencalBTN";
import ModalClose from "../modal/ModalClose";

const NewArticle = () => {
  const navi = useNavigate();
  const { createArticle, updateArticle } = useArticle();
  const { slug } = useParams(); // Get slug for edit article
  const [isModelOpen, setIsModelOpen] = useState(false);

  const isEdit = Boolean(slug);
  const { user, isLoging } = useAuthContext();

  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [""],
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
    if (isEdit) {
      fetch(`${API_ULR}/articles/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("article.title", data.article.title);
          setValue("article.description", data.article.description);
          setValue("article.body", data.article.body);
          setValue("article.tagList", data.article.tagList);
        });
    } else {
      reset("");
      console.log(" article");
    }
  }, [slug, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        // console.log(data.article)
        await updateArticle(slug, data.article, user?.token);
        navi("/articles");
      } else {
        const result = await createArticle(data.article, user?.token);
        navi(`/articles/${result.slug}`);
      }
    } catch (error) {
      alert("Post failed:" + error.message);
    }
  };

  //ធ្វើ delage input ថាមានទិន្ន័យទេ?
  const watchTitle = watch("article.title").length;
  const watchBody = watch("article.body").length;
  const watchInput = Boolean(watchTitle || watchBody);

  // Handle Navigage page when user create new_article without login
  if (!isLoging) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <div className="bg-white relative mt-5 max-w-3xl mx-auto p-5 rounded-sm shadow-lg space-y-5 ">
        <h1 className="text-center">
          {isEdit ? "Edit article" : "Create new article"}
        </h1>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          {/* Title field */}
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="border border-gray-400 block w-full rounded-sm p-2"
              placeholder="title"
              {...register("article.title")}
              autoFocus
            />
          </div>

          {/* Description field */}
          <div>
            <label htmlFor="description">Short description</label>
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
            <label htmlFor="text">Text</label>
            <textarea
              rows={5}
              className="block border border-gray-400 p-2.5 w-full text-sm rounded-sm"
              placeholder="Text"
              {...register("article.body")}
            ></textarea>
          </div>

          {/* Tag field section */}
          <div className="space-y-2">
            <span>Tag</span>
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
                  onClick={() => {
                    if (fields.length > 1) remove(index);
                  }}
                >
                  Delete
                </button>

                {/* បន្ថែម tag ហើយបង្ហាញតាម index ចុងក្រោយ */}
                {fields.length - 1 === index ? (
                  <button
                    className="border border-blue-400 px-5 text-blue-500 rounded-sm transition-all duration-300 p-0.5 md:p-1.5"
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
              className="border border-blue-400 px-4 md:px-5 text-blue-500 rounded-sm block mt-1 duration-500 transition-all"
              onClick={() => append("")}
            >
              Tag
            </button>
          )}

          <button className="bg-blue-500 px-20 p-1 rounded-sm text-white mt-5 select-none">
            {isEdit ? "Update" : "Send"}
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
            title={isEdit ? "edit article" : "create new artilce"}
            isModalOpen={() => setIsModelOpen(false)}
          />
        </span>
      )}
    </>
  );
};
export default NewArticle;
