import { useRouteError, useLocation, Link} from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError() // Page Errror 
    const location = useLocation() // url that put wrong
    

    return (<div className="max-w-4xl mx-auto bg-white mt-5 p-5 rounded-sm shadow-lg gap-4 items-start h-90">
            <div className='mx-2'>
                <h1 className='text-xl font-bold text-blue-500 text-center'>Page Error</h1>
                <p className=' text-red-500'>The page  {error? "404" : `${location.pathname} not found`}</p>
                <Link to={`/`} className='text-sky-600 mt-5'>Home page</Link>
            </div>
    </div>  );
}
 
export default ErrorPage;