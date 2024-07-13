import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
    static contextType = MyContext; // using this.context to access global state

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order: null
        };
    }

    render() {
        const orders = this.state.orders.map((item) => (
            <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
                <td>{item._id}</td>
                <td>{new Date(item.cdate).toLocaleString()}</td>
                <td>{item.customer.name}</td>
                <td>{item.customer.phone}</td>
                <td>{item.total}</td>
                <td>{item.status}</td>
                <td>
                    {item.status === 'PENDING' ? (
                        <div>
                            <span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> ||
                            <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span>
                        </div>
                    ) : (
                        <div />
                    )}
                </td>
            </tr>
        ));

        let items;
        if (this.state.order) {
            items = this.state.order.items.map((item, index) => (
                <tr key={item.product._id} className="datatable">
                    <td>{index + 1}</td>
                    <td>{item.product._id}</td>
                    <td>{item.product.name}</td>
                    <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
                    <td>{item.product.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price * item.quantity}</td>
                </tr>
            ));
        }

        return (
            <div className="category-container">
                <div className="table-container">
                    <div className="align-center">
                        <h2 className="text-center">ORDER LIST</h2>
                        <table className="table table-bordered" border="1">
                            <tbody>

                                <tr className="datatable">
                                    <th className="table-dark">ID</th>
                                    <th className="table-dark">Creation date</th>
                                    <th className="table-dark">Cust.name</th>
                                    <th className="table-dark">Cust.phone</th>
                                    <th className="table-dark">Total</th>
                                    <th className="table-dark">Status</th>
                                    <th className="table-dark">Action</th>
                                </tr>
                                {orders}
                            </tbody>
                        </table>
                    </div>
                    {this.state.order && (
                        <div className="align-center">
                            <h2 className="text-center">ORDER DETAIL</h2>
                            <table className="table table-bordered" border="1">
                                <tbody>
                                    <tr className="datatable">
                                        <th className="table-dark">No.</th>
                                        <th className="table-dark">Prod.ID</th>
                                        <th className="table-dark">Prod.name</th>
                                        <th className="table-dark">Image</th>
                                        <th className="table-dark">Price</th>
                                        <th className="table-dark">Quantity</th>
                                        <th className="table-dark">Amount</th>
                                    </tr>
                                    {items}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.apiGetOrders();
    }

    // event-handlers
    trItemClick(item) {
        this.setState({ order: item });
    }

    // apis
    apiGetOrders() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/orders', config).then((res) => {
            const result = res.data;
            this.setState({ orders: result });
        });
    }

    // event-handlers
    lnkApproveClick(id) {
        this.apiPutOrderStatus(id, 'APPROVED');
    }

    lnkCancelClick(id) {
        this.apiPutOrderStatus(id, 'CANCELED');
    }

    // apis
    apiPutOrderStatus(id, status) {
        const body = { status: status };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
            const result = res.data;
            if (result) {
                this.apiGetOrders();
            } else {
                alert('SORRY BABY!');
            }
        });
    }
}

export default Order;
