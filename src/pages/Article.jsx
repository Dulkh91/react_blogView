import {useParams} from 'react-router-dom'
import { useLogin } from '../hooks/useFetch'
import Header from "../components/card/Header"
import Profile from "../components/card/Profile"
import TagList from '../components/card/TagList'

const Article = ()=>{
   
    const {slug} = useParams()
    const API_URL = `https://realworld.habsidev.com/api/articles/${slug}`

    const {data, loading} = useLogin(API_URL)
    
     if(loading) return <div className="flex justify-center">Loading....</div>;

    //  console.log(data.article)

    return (<div className="max-w-4xl mx-auto bg-white mt-5 p-5 rounded-sm shadow-lg space-y-4">
        <section className="flex justify-between gap-4 items-start">
            <main className=" flex-1">
             <Header titleData={data.article} />             
             <div id='tag' className=" flex items-center gap-2">
                <TagList data={data.article}/>
             </div>
             <article className="text-xs mt-1.5">
                <p className="leading-6">{data.article.description}</p>
             </article>
            </main>
        <div className=" text-right flex-shrink-0">
            <Profile dataProfile={data.article}/>
            <div className=" space-x-2 mt-5 text-sm">
                <button className="border border-red-500 text-red-500 rounded-sm px-2 ">Delete</button>
                <button className="border border-lime-500 text-lime-500 rounded-sm px-2">Edit</button>

            </div>
        </div>
        </section>
        <section className=" space-y-5">
            <article>
                {data.article.body}
            </article>
    
        </section>
    </div>)
}

export default Article