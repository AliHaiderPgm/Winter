import { useParams } from "react-router-dom"

const Catalog = () => {
    const { type } = useParams()
    return (
        <div>Catalog {type}</div>
    )
}

export default Catalog