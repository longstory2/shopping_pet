import axios from 'axios';
import React, { Component } from 'react';
import FooterComponent from './FooterComponent';
class Active extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtID: '',
            txtToken: ''
        };
    }
    render() {
        return (
            <div>
                <div className="align-center">
                    <h2 className="text-center">ACTIVE ACCOUNT</h2>
                    <form>
                        <table className="align-center">
                            <tbody>
                                <div class="form-floating">
                                    <input class="form-control" id="floatingInput" placeholder="ID" type="ID" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} />
                                    <label for="floatingInput">ID</label>
                                </div>
                                <div class="form-floating">
                                    <input class="form-control" id="floatingInput" placeholder="ID" type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} />
                                    <label for="floatingInput">token</label>
                                </div>
                                <div className='btn'><input class="btn btn-primary active" type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} /></div>
                            </tbody>
                        </table>
                    </form>
                </div>
                <FooterComponent />
            </div>
        );
    }
    // event-handlers
    btnActiveClick(e) {
        e.preventDefault();
        const id = this.state.txtID;
        const token = this.state.txtToken;
        if (id && token) {
            this.apiActive(id, token);
        } else {
            alert('Please input id and token');
        }
    }
    // apis
    apiActive(id, token) {
        const body = { id: id, token: token };
        axios.post('/api/customer/active', body).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
            } else {
                alert('SORRY BABY!');
            }
        });
    }
}
export default Active;