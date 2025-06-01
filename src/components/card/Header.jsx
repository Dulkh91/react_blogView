import { Link } from "react-router-dom"

const Header = ({titleData})=>{
    
    return (
        <div className="flex items-center">
           <Link to={`/articles/${titleData.slug}`}><h2 className="text-blue-500 text-xl cursor-pointer">{titleData.title}</h2></Link> 
            <div className="ml-3 flex items-center gap-1">
                { titleData.favoritesCount>0?(<button>❤️</button>):(<button>♡</button>)}
                <p>{titleData.favoritesCount}</p>
            </div>
            
        </div>

    )
    
}

export default Header