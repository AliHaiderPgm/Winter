import { useEffect, useRef, useState } from "react"
import { App as AntApp, Button } from "antd"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { checkInFavorites, handleAddToFavorites, removeFromFavorites } from "../../global"

const FavoriteButton = ({ product, children, className = "", size, block = false, shape }) => {
    const { message } = AntApp.useApp()
    const [isAnimating, setIsAnimating] = useState(false)
    const [isAdded, setIsAdded] = useState(() => checkInFavorites(product))
    const animationTimer = useRef(null)

    useEffect(() => {
        return () => window.clearTimeout(animationTimer.current)
    }, [])

    useEffect(() => {
        setIsAdded(checkInFavorites(product))
    }, [product?._id])

    const handleClick = (event) => {
        event.stopPropagation()
        if (isAdded) {
            removeFromFavorites(product)
            setIsAdded(false)
            message.success("Removed from Favorites!")
            return
        }

        handleAddToFavorites(product)
        message.success("Added to Favorites!")
        setIsAdded(true)
        setIsAnimating(true)
        window.clearTimeout(animationTimer.current)
        animationTimer.current = window.setTimeout(() => {
            setIsAnimating(false)
        }, 700)
    }

    return (
        <Button
            type="text"
            className={`${className} favorite-button ${isAdded ? "favorite-button--active" : ""} ${isAnimating ? "favorite-button--animating" : ""}`}
            size={size}
            block={block}
            shape={shape}
            onClick={handleClick}
        >
            {children}
            <span className={`favorite-button__icon-wrap ${isAnimating ? "favorite-button__icon-wrap--animating" : ""}`}>
                {isAdded ? <HeartFilled className="favorite-button__icon" /> : <HeartOutlined className="favorite-button__icon" />}
            </span>
        </Button>
    )
}

export default FavoriteButton
