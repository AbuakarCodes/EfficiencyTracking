// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Credentials } from "../utils/axios_Credentials";
// import { isLoggedIN_URL } from "../../API_EndPoints";
// import { useAppContext } from "./useCustomContext";

// export function useIsLoggedIn(...params) {
//     const { setloggedin_Usersid, isLoggedIn, setIsLoggedIn } = useAppContext()
//     const [isCheacking, setisCheacking] = useState(true);
//     const [Error, setError] = useState({ state: false, message: "" });
    
//     useEffect(() => {
//         let cancel = false;
//         const checkLogin = async () => {
          
//             try {
//                 const res = await axios.get(isLoggedIN_URL, Credentials);
//                 if (
//                     res.headers["content-type"]?.includes("application/json") &&
//                     res.data?.data?.isLoggedin === true
//                 ) {
//                     if (!cancel) {
//                         setIsLoggedIn(true);
//                         setloggedin_Usersid(res.data?.data?.users_id)
//                         setError({ state: false, message: "" });
//                     }
//                 } else {
//                     setIsLoggedIn(false);
//                     setError({ state: false, message: "" });
//                 }

//             } catch (err) {
//                 if (!cancel) {
//                     setIsLoggedIn(false);
//                     setError({ state: false, message: err.response?.data?.message || "Not logged in" })
//                 }
//             } finally {
//                 if (!cancel) setisCheacking(false);
//             }

//         };
//         if (params.length == 0) {
//             checkLogin();
//         }

//         return () => {
//             cancel = true;
//         };
//     }, []);

//     return { isLoggedIn,setIsLoggedIn ,isCheacking, Error };
// }
