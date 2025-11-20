import dotenv from "dotenv";
dotenv.config();

export let setOptions = {};
export let clearOptions = {};

const isLocal = process.env.IS_LOCAL_HOST === "true";

// Localhost (no HTTPS)
if (isLocal) {
    setOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    };

    clearOptions = {
        ...setOptions
    };
}

// Production with PROXY (IMPORTANT)
else {
    setOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
        // ❌ DO NOT set domain when using a proxy
    };

    clearOptions = {
        ...setOptions
        // No domain needed — proxy makes backend share domain with frontend
    };
}

export function setCookies(res, ...params) {
    for (let i = 0; i < params.length; i += 2) {
        res.cookie(params[i], params[i + 1], setOptions);
    }
}

export function clearCookies(res, ...params) {
    params.forEach((cookieName) =>
        res.clearCookie(cookieName, clearOptions)
    );
}
