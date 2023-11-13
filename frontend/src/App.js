import Login from "./admin/auth/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/dashboard/Dashboard";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/administrator" element={<Login />} />
        <Route path="/dashboard" element={<Main />} />

        <Route path="/add-news" element={<AddNews />} />
        <Route path="/view-news" element={<ViewNews />} />
        <Route path="/edit-news/:id" element={<EditNews />} />

        <Route path="/view-categories" element={<ViewCategories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />

        <Route path="/view-videos" element={<ViewVideos />} />
        <Route path="/add-video" element={<AddVideo />} />

        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;