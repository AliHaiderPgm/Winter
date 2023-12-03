import { Select } from "antd";

const items = [
    {
        value: 'jack',
        label: 'Jack',
    },
    {
        value: 'lucy',
        label: 'Lucy',
    },
    {
        value: 'Yiminghe',
        label: 'yiminghe',
    },
    {
        value: 'disabled',
        label: 'Disabled',
        disabled: true,
    },
];
const CartCard = () => {
    return <div className="cart-card row">
        <div className="col-3">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="img-fluid image" />
        </div>
        <div className="col-9">
            <div className="row">
                <div className="col-9">
                    <p>Shoe Name</p>
                    <p className="text-muted">Shoe Type</p>
                    <div className="d-flex gap-3">
                        <p>Size</p>
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: 120,
                            }}
                            options={items}
                        />

                        <p>Quantity</p>
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: 120,
                            }}
                            options={items}
                        />
                    </div>
                </div>
                <div className="col-3">

                </div>
            </div>
            <div>
                <p>Button</p>
            </div>
        </div>
    </div>
}

const Cart = () => {
    return (
        <div className="cart d-flex justify-content-center py-3">
            <div className="wrapper">
                <div className="row w-100">
                    <div className="col-6">
                        <h3>Bag</h3>
                        <CartCard />
                    </div>
                    <div className="col-6">
                        <h3>Summary</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart