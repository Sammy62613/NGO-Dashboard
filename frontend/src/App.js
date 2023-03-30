import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages nd components
import Home from "./pages/home"
import Login from "./pages/login"
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";
import Cookie from "universal-cookie";
import './App.css'
import { validate } from "./services/authservices";

function App() {
    const cookies = new Cookie();

    function getUserDetails(data) {
        let date = new Date();
        date.setDate(date.getDate() + 30);

        cookies.set("authToken", data.accessToken, { expires: date });
        cookies.set("userId", data._id, { expires: date });
    }

    async function handleValidation() {
        try {
            const res = await validate(cookies.get("authToken"));
            if (res.status >= 200 && res.status < 300) {
                return true;
            }
        } catch (err) {
            cookies.remove("authToken");
            return false;
        }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left-align', justifyContent: 'center'}} >
        <BrowserRouter>
        <NavBar/>
        <Sidebar/>
          <div className='pages' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <Login
                            getUserDetails={getUserDetails}
                            handleValidation={handleValidation}
                        />
                    }
                />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/forgot" element={<Forgot />} />
                <Route
                    exact path="reset-password/:id/:token"
                    element={<Reset />}
                />
                <Route exact path="/*" element={<NotFound />} />
            </Routes>
            </div>
        </BrowserRouter>
        </div>
    );
}

export default App;










// function App() {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left-align', justifyContent: 'center'}} >
//       <BrowserRouter>
//       <NavBar/>
//         <div className='pages' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/students" element={<Students />} />
//             <Route path="/contactinfo" element={<NGOContact />} />
//             <Route path="/events" element={<Events />} />
//           </Routes>
//           </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
