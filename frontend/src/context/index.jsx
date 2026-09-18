const env = "development";

export const ServerURL = () => {
    let url;
    if (env === "development") {
        url = "http://localhost:9100/api"
    } else {
        url = `${window.location.origin}/api`
    }
    return url
}