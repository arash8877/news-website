import Login from "./admin/auth/Login";
import { Routes, Route } from "react-router-dom";
import ViewNews from "./admin/dashboard/components/news/ViewNews";
import AddNews from "./admin/dashboard/components/news/AddNews";
import { ToastContainer } from "react-toastify";
import Main from "./admin/dashboard/components/main/Main";
import EditNews from "./admin/dashboard/components/news/EditNews";
import ViewCategories from "./admin/dashboard/components/category/ViewCategories";
import AddCategory from "./admin/dashboard/components/category/AddCategory";
import EditCategory from "./admin/dashboard/components/category/EditCategory";
import ViewVideos from "./admin/dashboard/components/videos/ViewVideos";
import AddVideo from "./admin/dashboard/components/videos/AddVideo";
import ViewUsers from "./admin/dashboard/components/users/ViewUsers";
import AddUser from "./admin/dashboard/components/users/AddUser";
import EditUser from "./admin/dashboard/components/users/EditUser";
import UpdateProfile from "./admin/dashboard/components/users/UpdateProfile";
import ViewCommentAdmin from "./admin/dashboard/components/comment/ViewCommentAdmin";
import NotFound from "./components/NotFound/NotFound";
import CheckAdmin from "./admin/auth/CheckAdmin";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Details from "./pages/Details";
import { useContext } from "react";
import { AuthContext } from "./admin/context/context";

function App() {
  const { userId } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/administrator" element={<Login />} />
        //if the user is logged in, then has access to these routes:
        {userId && (
          <>
            <Route path="/dashboard" element={<Main />} />

            <Route path="/add-news" element={<AddNews />} />
            <Route path="/view-news" element={<ViewNews />} />
            <Route path="/edit-news/:id" element={<EditNews />} />

            <Route element={<CheckAdmin />}>
              <Route path="/view-categories" element={<ViewCategories />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />

              <Route path="/view-videos" element={<ViewVideos />} />
              <Route path="/add-video" element={<AddVideo />} />

              <Route path="/view-users" element={<ViewUsers />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
            </Route>

            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            <Route path="/comment" element={<ViewCommentAdmin />} />
          </>
        )}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
