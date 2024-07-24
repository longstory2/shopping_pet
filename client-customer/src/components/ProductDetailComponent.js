// import axios from 'axios';
// import React, { Component } from 'react';
// import withRouter from '../utils/withRouter';
// import MyContext from '../contexts/MyContext';
// import FooterComponent from './FooterComponent';
// class ProductDetail extends Component {
//     static contextType = MyContext; // using this.context to access global state
//     constructor(props) {
//         super(props);
//         this.state = {
//             product: null,
//             txtQuantity: 1
//         };
//     }
//     render() {
//         const prod = this.state.product;
//         if (prod != null) {
//             return (
//                 <div>
//                     <div className="align-center">
//                         <h2 className="text-center">PRODUCT DETAILS</h2>
//                         <figure className="caption-right">
//                             <img src={"data:image/jpg;base64," + prod.image} width="350px" height="auto" alt="" />
//                             <figcaption className='content'>
//                                 <form>
//                                     <table>
//                                         <tbody>
//                                             <h4 align="right">Name:</h4>
//                                             <td>{prod.name}</td>
//                                             <tr>
//                                                 <h4 align="right">Price:</h4>
//                                                 <td>{prod.price}</td>
//                                             </tr>
//                                             <tr>
//                                                 <h4 align="right">Category:</h4>
//                                                 <td>{prod.category.name}</td>
//                                             </tr>
//                                             <tr>
//                                                 <h4 align="right">Quantity:</h4>
//                                                 <td><input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
//                                             </tr>
//                                             <tr>
//                                                 <td></td>
//                                                 <h4><input class="btn btn-success" value="ADD TO CART" onClick={(e) => this.btnAdd2CartClick(e)} /></h4>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </form>
//                             </figcaption>
//                         </figure>

//                     </div>
//                     <FooterComponent />
//                 </div>
//             );

//         }
//         return (<div />);

//     }
//     componentDidMount() {
//         const params = this.props.params;
//         this.apiGetProduct(params.id);
//     }
//     // event-handlers
//     btnAdd2CartClick(e) {
//         e.preventDefault();
//         const product = this.state.product;
//         const quantity = parseInt(this.state.txtQuantity);
//         if (quantity) {
//             const mycart = this.context.mycart;
//             const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
//             if (index === -1) { // not found, push newItem
//                 const newItem = { product: product, quantity: quantity };
//                 mycart.push(newItem);
//             } else { // increasing the quantity
//                 mycart[index].quantity += quantity;
//             }
//             this.context.setMycart(mycart);
//             alert('OK BABY!');
//         } else {
//             alert('Please input quantity');
//         }
//     }
//     // apis
//     apiGetProduct(id) {
//         axios.get('/api/customer/products/' + id).then((res) => {
//             const result = res.data;
//             this.setState({ product: result });
//         });
//     }
// }
// export default withRouter(ProductDetail);

import React, { Component } from 'react';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import FooterComponent from './FooterComponent';

class ProductDetail extends Component {
    static contextType = MyContext;

    state = {
        product: null,
        txtQuantity: 1
    };
    render() {
        const { product, txtQuantity } = this.state;

        if (!product) return null;

        return (
            <div className="align-center">
                <h2 className="text-center">PRODUCT DETAILS</h2>
                <figure className="caption-right">
                    <img src={`data:image/jpg;base64,${product.image}`} width="400px" height="auto" alt="" />
                    <figcaption style={{ marginLeft: '20px' }}>
                        <form>
                            <table>
                                <tbody>
                                    <tr>
                                        <th align="right">Name:</th>
                                        <td>{product.name}</td>
                                    </tr>
                                    <tr>
                                        <th align="right">Price:</th>
                                        <td>{product.price}<span>$</span></td>

                                    </tr>
                                    <tr>
                                        <th align="right">Category:</th>
                                        <td>{product.category.name}</td>
                                    </tr>
                                    <tr>
                                        <th align="right">Quantity:</th>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                max="99"
                                                value={txtQuantity}
                                                onChange={this.handleQuantityChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button className="btn btn-success" id="btn1" onClick={this.handleAddToCart}>
                                                ADD TO CART
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </figcaption>
                </figure>
                <FooterComponent />
            </div>
        );
    }
    componentDidMount() {
        const { id } = this.props.params;
        this.apiGetProduct(id);
    }

    apiGetProduct = (id) => {
        axios.get(`/api/customer/products/${id}`)
            .then((res) => {
                const product = res.data;
                this.setState({ product });
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    };

    handleQuantityChange = (e) => {
        this.setState({ txtQuantity: parseInt(e.target.value, 10) || 1 });
    };

    handleAddToCart = (e) => {
        e.preventDefault();
        const { product, txtQuantity } = this.state;
        const { mycart, setMycart } = this.context;

        if (txtQuantity) {
            const index = mycart.findIndex(item => item.product._id === product._id);
            if (index === -1) {
                mycart.push({ product, quantity: txtQuantity });
            } else {
                mycart[index].quantity += txtQuantity;
            }
            setMycart([...mycart]);
            alert('Added to cart successfully!');
        } else {
            alert('Please input quantity');
        }
    };
}

export default withRouter(ProductDetail);
