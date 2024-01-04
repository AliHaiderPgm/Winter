const env = "production";

export const ServerURL = () => {
    let url;
    if (env === "development") {
        url = "http://localhost:5000/api"
    } else {
        url = `${window.location.origin}/api`
    }
    return url
}