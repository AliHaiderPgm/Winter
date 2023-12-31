import { Button } from 'antd';
import BnbCard from '../../components/shared/BnbCard';
import { useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

const Favorite = () => {
    const products = JSON.parse(localStorage.getItem("favProducts"));
    const [isEdit, setIsEdit] = useState(false);
    const [updatedProducts, setUpdatedProducts] = useState([]);

    const handleEditButtonClick = () => {
        setIsEdit(!isEdit);

        if (isEdit) {
            const favProducts = products.filter(p => {
                return !updatedProducts.some(i => i._id === p._id)
            })
            localStorage.setItem("favProducts", JSON.stringify(favProducts))
        }
    };

    const handleFavorite = (product, action) => {
        if (action === "remove") {
            const newFavProducts = products.filter((p) => p._id === product._id);
            setUpdatedProducts(prev => [...prev, newFavProducts[0]]);
        } else {
            const newUpdatedProducts = updatedProducts.filter((p) => p._id !== product._id);
            setUpdatedProducts([...newUpdatedProducts]);
        }
    };

    return (
        <div className="w-75 mx-auto p-4 favorite">
            <div className='d-flex justify-content-between mb-3'>
                <p className='fs-3'>Favorites</p>
                {
                    products && products.length > 0 && <Button className={isEdit ? 'btn-filled' : 'btn-outline'} size='large' onClick={handleEditButtonClick}>
                        {isEdit ? 'Done' : 'Edit'}
                    </Button>
                }
            </div>
            {
                !products ? <p className='text-center'>Items added to your Favorites will be saved here.</p>
                    :
                    <div className='row justify-content-center'>
                        {products?.map((product, index) => (
                            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center  favCard" key={index}>
                                {isEdit && <>
                                    {
                                        updatedProducts.some(e => e?._id === product._id) ?
                                            <Button
                                                type='text'
                                                size='large'
                                                onClick={() => handleFavorite(product, '')}
                                            >
                                                <HeartOutlined className="icon" />
                                            </Button>
                                            :
                                            <Button
                                                type='text'
                                                size='large'
                                                onClick={() => handleFavorite(product, 'remove')}
                                            >
                                                <HeartFilled className='icon' />
                                            </Button>
                                    }
                                </>
                                }
                                <BnbCard data={product} />
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default Favorite;
