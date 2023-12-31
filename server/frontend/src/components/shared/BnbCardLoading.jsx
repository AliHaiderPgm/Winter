import { Skeleton } from "antd"
import React, { Suspense } from "react";
import image from "../../assets/placeholder.png"
// const Skeleton = React.lazy(() => import('antd').then(module => ({ default: module.Skeleton })));


const styles = {
    image: {
        minWidth: "270px",
        width: "100%",
        height: "300px"
    }
}
const BnbCardLoading = () => {
    return (
        <div className="d-flex flex-column gap-2">
            <Suspense fallback={<p>Loafing</p>}>
                <Skeleton.Image style={styles.image} active />
            </Suspense>

            <Suspense fallback={<p>Loading...</p>}>
                <Skeleton
                    active
                    paragraph={{
                        rows: 2,
                    }}
                />
            </Suspense>
        </div>
    )
}

export default BnbCardLoading