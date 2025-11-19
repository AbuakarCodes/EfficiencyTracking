import dotenv from "dotenv";
dotenv.config();

export let setOptions = {};
export let clearOptions = {};

// for local host
if (process.env?.IS_LOCAL_HOST === "true") {
    setOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    };
    clearOptions = { ...setOptions }; // same for clearing
} else {
    setOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    };
    clearOptions = {
        ...setOptions,
        domain: "optivo-backend.vercel.app" // domain only, no (protocls) https
    };
}

export function setCookies(res, ...params) {
    for (let i = 0; i < params.length; i += 2) {
        res.cookie(params[i], params[i + 1], setOptions);
    }
    return { setted_Access_Token: params[1] };
}

export function clearCookies(res, ...params) {
    params.forEach((elem) => res.clearCookie(elem, clearOptions));
}
