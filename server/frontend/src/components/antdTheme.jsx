import { theme } from "antd"

const antdTheme = {
    components: {
        // algorithm: theme.darkAlgorithm,
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