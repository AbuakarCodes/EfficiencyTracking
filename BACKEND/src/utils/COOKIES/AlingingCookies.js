import dotenv from "dotenv";
dotenv.config();

export let options = {}
// for local host
if (process.env?.IS_LOCAL_HOST === "true" ) {
     options = {
        httpOnly: true,
        secure: false,   // because you're on http://localhost
        sameSite: "lax", // not "none"
        path: "/"
    }
} else {
    // deployed
    options = {
        httpOnly: true,
        secure: true,        // MUST be true on HTTPS
        sameSite: "none",    // MUST be "none" for cross-site cookies
        path: "/"
    };

}



function setCookies(res, ...params) {
    for (let i = 0; i < params.length; i += 2) {
        res.cookie(params[i], params[i + 1], options);
    }
    return {
        setted_Access_Token: params[1]
    }
}


function clearCookies(res, ...params) {
    params.forEach((elem) => {
        return res.clearCookie(elem, options);
    })
}

export { setCookies, clearCookies }