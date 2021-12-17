import { useEffect, useState } from "react";
import { Router } from "@reach/router"
import './App.scss';

// modules
import { getWishes } from "./Modules/Wish";

// components
import NavigationBar from "./Components/NavigationBar";

// pages
import MakeWish from "./pages/make_wish/MakeWish";
import Details from "./pages/details/Details";
import MainPage from "./pages/main_page/MainPage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Error from "./pages/Error";


function App() {
  const [wishes, setwishes] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);

  // init data
  useEffect(() => {
    if (localStorage.getItem("CurrentUser")) {
      setcurrentUser(JSON.parse(localStorage.getItem("CurrentUser")))
    } else {
      setcurrentUser(null)
    }

    getWishes().then(function(response) {
      setwishes(response)
    })
  }, []);
  

  return (
    <>
      <NavigationBar currentUser={currentUser} setcurrentUser={setcurrentUser}/>
      <div className="maincontent"> 
        <Router primary={false}> 
          <MainPage wishes={wishes} setwishes={setwishes} currentUser={currentUser} path="/"/>
          <Login path="/login" setcurrentUser={setcurrentUser}/>
          <Register path="/register" setcurrentUser={setcurrentUser}/>
          <MakeWish path="/makeWish" setwishes={setwishes}/>
          <MakeWish path="/editwish" setwishes={setwishes}/>
          <Error path="/error" />
          <Details path="/details/:id" setwishes={setwishes} currentUser={currentUser} />
        </Router>
      </div>
    </>
  );
}

export default App;
