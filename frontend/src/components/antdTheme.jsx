import { theme } from "antd"

const antdTheme = {
    components: {
        Button: {
            colorPrimary: "#111",
            colorPrimaryHover: "#222222b5",
            colorPrimaryActive: "#222",
            colorPrimaryBorder: "#222222b5",
            algorithm: true,
        },
        Form: {
            itemMarginBottom: 0,
        },
        Radio: {
            colorPrimary: "#111",
            algorithm: true, // Enable algorithm
        },
    },
}

export default antdTheme