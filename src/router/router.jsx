import {createBrowserRouter} from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import NewAccount from '../pages/NewAccount'
import Login from '../pages/SignIn'
import Article from '../pages/Article'
import NewArticle from '../pages/NewArticle'

const router = createBrowserRouter([
    {path: '/',
    element: <Layout/>,
    children:[
        {path:'', element:<Home/>},
        {path:'articles', element:<Home/>},
        {path:'sign_up', element: <NewAccount/>,},
        {path:'login', element: <Login/>},
        {path:'articles/:slug', element:<Article/>},
        {path:'create_article', element: <NewArticle/>},
        {path: 'create_article/:slug/edit', element:<NewArticle/>}
    ]
    }
    
])

export default router