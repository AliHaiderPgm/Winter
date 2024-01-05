import { useEffect, useState } from "react";
import SearchImage from "../../assets/search.png"
import { AutoComplete, Input, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { addToHistory, getHistory } from "../../global";

const SearchPage = () => {
    const [searchVal, setSearchVal] = useState("")
    const [history, setHistory] = useState([])
    const navigate = useNavigate()
    const options = history && history.slice(0, 4)

    useEffect(() => {
        setHistory(getHistory())
    }, [])

    const onSearch = (e) => {
        addToHistory(e)
        navigate(`/find/${e}`)
    }
    const onHandleChange = (e) => {
        const newItems = history?.filter(val => val.value.toLowerCase().includes(e.toLowerCase()))
        if (newItems?.length === 0 || e === "" || newItems === undefined) {
            setHistory(getHistory())
        } else {
            setHistory(newItems)
        }
        setSearchVal(e)
    }

    return <div className="no-search-query d-flex flex-column align-items-center gap-3 mb-5" style={{ minHeight: "65dvh" }}>
        <div className="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4">
            <img src={SearchImage} alt="Girl with binoculars and a dog." className="img-fluid" loading="lazy" />
        </div>
        <h1>Looking For Something?</h1>
        <AutoComplete
            className="col-11 col-sm-8 col-md-7 col-lg-5 col-xl-4"
            options={options}
            onChange={onHandleChange}
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        >
            <Input.Search size="large" placeholder="Search" enterButton onSearch={() => onSearch(searchVal)} />
        </AutoComplete>
    </div>
}

export default SearchPage