
import useArticle from "../hooks/useArticle";
import { useAuthContext } from "../context/AuthContext";
import {useForm, useFieldArray} from 'react-hook-form'


const NewArticle = () => {
  const { createArticle, errors } = useArticle();
    const {user} = useAuthContext()
    const {register,handleSubmit,formState:{error}, control} = useForm({
        defaultValues:{
            article:{
            title: '',
            description: '',
            body: '',
            tagList:[' ']
          }
        }

    })

    const {fields,append, remove}  = useFieldArray({control,name: "article.tagList"})

    const onSubmit = async (data)=>{
        
        try {
           const result =  await createArticle(data.article, user?.token)
           console.log("Sucess :" , result)
        } catch (error) {
            alert("Post failed:" + error.message)
        }
        console.log(data.article)
    }
  return (
    <div className="bg-white mt-5 max-w-3xl mx-auto p-5 rounded-sm shadow-lg space-y-5">
      <h1 className="text-center">Create new article</h1>
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
            {...register('article.description')}
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
            {...register('article.body')}
          ></textarea>
        </div>

        {/* Tag field */}
        <div className=" space-y-1">
          <label htmlFor="description">Tag</label>

            {fields.map((field,index)=>(
                <div className="flex gap-5" key={field.id}>
                    <input
                    type="text"
                    className="border border-gray-400 p-1 rounded-sm"
                    {...register(`article.tagList.${index}`)}
                        placeholder={`tag`}
                    />
                    
                    {/* លុប tag តាម index */}
                    <button 
                        className={`border border-red-500 px-5 text-red-500 rounded-sm`}
                        onClick={()=> {if(fields.length >1)remove(index)}}>
                        Delete
                    </button>

                    {/* បន្ថែម tag ហើយបង្ហាញតាម index ចុងក្រោយ */}
                    {(fields.length-1 === index)? 
                    <button 
                    className="border border-blue-400 px-5 text-blue-500 rounded-sm"
                        onClick={()=>append(" ")}
                    >
                        Add tag
                    </button>
                    : ''}

             </div>
            ))}
                


        </div>
      
            
          <button className="bg-blue-500 px-20 p-1 rounded-sm text-white mt-5">
            Send
          </button>
        
      </form>
    </div>
  );
};
export default NewArticle;
