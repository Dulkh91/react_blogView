import { Link } from "react-router-dom";
const CencalBTN = () => {
    return ( <>
        <Link to={`/`}> 
        <div className="group w-6 h-6 bg-gray-200 flex justify-center items-center rounded-full cursor-pointer
         hover:bg-gray-500 hover:scale-120 hover:duration-300">
            <span className="text-gray-400 text-center transition rotate-45 group-hover:text-white group-hover:duration-300 group-hover:scale-120  group-hover:font-light"
             >
                +
             </span>
        </div>
        </Link>
    </> );
}
 
export default CencalBTN;