import {createBrowserRouter} from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import NewAccount from '../pages/NewAccount'
import Login from '../pages/SignIn'
import Article from '../pages/Article'
import NewArticle from '../pages/NewArticle'
import EditProfile from '../pages/EditProfile'
import ErrorPage from '../pages/ErrorPage'

const router = createBrowserRouter([
    {path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children:[
        {path:'', element:<Home/>},
        {path:'articles', element:<Home/>},
        {path:'sign_up', element: <NewAccount/>,},
        {path:'login', element: <Login/>},
        {path:'articles/:slug', element:<Article/>},
        {path:'create_article', element: <NewArticle/>},
        {path: 'edit_article/:slug/edit', element:<NewArticle/>},
        {path: 'edit_profile', element:<EditProfile/>},
        {path: "*", element: <ErrorPage/>}
    ]
    
    }
    
])

export default router