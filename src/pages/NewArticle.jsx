
const NewArticle = ()=>{
    return (<div className="bg-white mt-5 max-w-3xl mx-auto p-5 rounded-sm shadow-lg space-y-5">
        <h1 className="text-center">Create new article</h1>
        <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="border border-gray-400 block w-full rounded-sm p-2" placeholder="title"/>
        </div>
        <div>
            <label htmlFor="description">Short description</label>
            <input type="text" name="description" className="border border-gray-400 block w-full rounded-sm p-2" placeholder="title"/>
        </div>
        <div>
            <label htmlFor="text">Text</label>
            <textarea rows={5} className="block border border-gray-400 p-2.5 w-full text-sm rounded-sm" placeholder="Text"></textarea>
        </div>
        <div className=" space-y-1">
            <label htmlFor="description">Tag</label>
            <div className="flex gap-5">
                <input type="text" className="border border-gray-400 p-1 rounded-sm" placeholder="tag" />
                <button className="border border-red-500 px-5 text-red-500 rounded-sm">Delete</button>
            </div>
            <div className="flex gap-5">
                <input type="text" className="border border-gray-400 p-1 rounded-sm" placeholder="tag" />
                <button className="border border-red-500 px-5 text-red-500 rounded-sm">Delete</button>
                <button className="border border-blue-4=500 px-5 text-blue-500 rounded-sm">Add tag</button>
            </div>
        </div>
        <div>
                <button className="bg-blue-500 px-20 p-1 rounded-sm text-white">Send</button>
        </div>
    </div>)
}
export default NewArticle