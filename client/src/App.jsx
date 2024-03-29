
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Header from "./component/Header"
import Profiles from "./pages/Profiles"

import FooterCom from "./component/FooterCom"
import PrivateRoute from "./component/PrivateRoute"
import OnlyAdminPrivateRoute from "./component/OnlyAdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
function App() {


  return (
    <BrowserRouter>
        <Header/>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route  element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route  element={<OnlyAdminPrivateRoute/>}>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/update-post/:postId" element={<UpdatePost/>}/>

        </Route>
        <Route path="/profiles" element={<Profiles/>}/>
        <Route path="/post/:postSlug" element={<PostPage/>}/>
      </Routes>
        <FooterCom/>
    </BrowserRouter>
  )
}

export default App
