import { Routes, Route } from "react-router-dom";
import ViewNews from "./admin/dashboard/components/news/ViewNews";
import AddNews from "./admin/dashboard/components/news/AddNews";
import { ToastContainer } from "react-toastify";
import EditNews from "./admin/dashboard/components/news/EditNews";
import Main from "./admin/dashboard/components/main/Main";
import ViewCategories from "./admin/dashboard/components/category/ViewCategories";
import AddCategory from "./admin/dashboard/components/category/AddCategory";
import EditCategory from "./admin/dashboard/components/category/EditCategory";
import ViewVideo from "./admin/dashboard/components/video/ViewVideo";
import AddVideo from "./admin/dashboard/components/video/AddVideo";
import ViewUsers from "./admin/dashboard/components/user/ViewUsers";
import AddUser from "./admin/dashboard/components/user/AddUser";
import EditUser from "./admin/dashboard/components/user/EditUser";
import UpdateProfile from "./admin/dashboard/components/user/UpdateProfile";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import ViewComment from "./admin/dashboard/components/comment/ViewComment";
import Login from "./admin/auth/Login";
import { AuthContext } from "./admin/context/context";
import { useContext } from "react";
import NotFound from "./components/notFound/NotFound";
// import CheckAdmin from "./admin/auth/CheckAdmin";

function App() {
  const { userId } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/administrator" element={<Login />} />

        {userId && (
          <>
            <Route path="/dashboard" element={<Main />} />
            <Route path="/view-news" element={<ViewNews />} />
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/edit-news/:id" element={<EditNews />} />

            <Route path="/view-category" element={<ViewCategories />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />

            <Route path="/view-video" element={<ViewVideo />} />
            <Route path="/add-video" element={<AddVideo />} />

            <Route path="/view-users" element={<ViewUsers />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />

            <Route path="/comment" element={<ViewComment />} />
          </>
        )}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
