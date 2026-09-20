// No antd import here: this file only sets component tokens, and the old
// (unused) `theme` import still pulled antd's theme module into the first load.
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