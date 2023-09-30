import { Skeleton } from "antd"

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
            <Skeleton.Image style={styles.image} active />
            <Skeleton
                active
                paragraph={{
                    rows: 2,
                }}
            />
        </div>
    )
}

export default BnbCardLoading