import page from "../node_modules/page/page.mjs";
export function isAuth(ctx, next) {
    return JSON(localStorage.getItem('userData'));
    next();
}

