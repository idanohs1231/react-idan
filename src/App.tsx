import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import './index.css';

import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./Components/Shared/RouteGuard";
import { useSelector } from "react-redux";
import { TRootState } from "./Store/BigPie";
import CardDetails from "./Pages/CardDetails/CardDetails";
import CardEdit from "./Pages/CardEdit/CardEdit";
import Favorites from "./Pages/Favorites/Favorites";
import MyCards from "./Pages/My-Cards/My-Cards";
import CreateCard from "./Pages/CreateCard/CreateCard"; 
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen dark:bg-slate-800" style={{ paddingBottom: '40px' }}>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/card/:id" element={<CardDetails />} />
    
          <Route
            path="/profile"
            element={
              <RouteGuard user={user!}>
                <Profile />
              </RouteGuard>
            }
          />
          <Route
            path="/mycards"
            element={
              <RouteGuard user={user!}>
                <MyCards />
              </RouteGuard>
            }
          />
          <Route
            path="/createcard"
            element={
              <RouteGuard user={user!}>
                <CreateCard /> {/* Render the form here */}
              </RouteGuard>
            }
          />
                  <Route
            path="/edit-card/:id"
            element={
              <RouteGuard user={user!}>
                <CardEdit /> {/* Render the form here */}
              </RouteGuard>
            }
          />
          <Route
            path="/favorites"
            element={
              <RouteGuard user={user!}>
                <Favorites />
              </RouteGuard>
            }
          />
        </Routes>
      </div>
      <div className="fixed bottom-0 w-full " style={{ marginTop: '20px' }}>
      <Footer />
    </div>

    </>
  );
}

export default App;
