import Skeleton from "antd/es/skeleton"
import React from "react";


const styles = {
    image: {
        width: "100%",
        aspectRatio: "1 / 1",
        height: "auto"
    }
}
const BnbCardLoading = () => {
    return (
        <div className="d-flex flex-column gap-2">
            <Skeleton.Image style={styles.image} active />
            <Skeleton active paragraph={{ rows: 2 }} />
        </div>
    )
}

export default BnbCardLoading