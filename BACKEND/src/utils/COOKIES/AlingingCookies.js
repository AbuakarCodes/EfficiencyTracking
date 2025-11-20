import dotenv from "dotenv";
dotenv.config();

// export let setOptions = {};
// export let clearOptions = {};
// if (process.env?.IS_LOCAL_HOST === "true") {
//     setOptions = {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//         path: "/"
//     };
//     clearOptions = { ...setOptions }; 
// } else {
//     setOptions = {
//         httpOnly: true,
//         secure: true,
//         sameSite: "none",
//         path: "/"
//     };
//     clearOptions = {
//         ...setOptions,
//         domain: "optivo-backend.vercel.app"
//     };
// }

const options = {
    httpOnly: true,
    secure: !process.env?.IS_LOCAL_HOST === "true",
    sameSite: "strict",
}

export function setCookies(res, ...params) {
    for (let i = 0; i < params.length; i += 2) {
        res.cookie(params[i], params[i + 1], options);
    }
    return { setted_Access_Token: params[1] };
}

export function clearCookies(res, ...params) {
    params.forEach((elem) => res.clearCookie(elem, options));
}
