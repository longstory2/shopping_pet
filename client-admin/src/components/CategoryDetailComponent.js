import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }

  render() {
    return (
      <div className="page-container">
        <div className="main-content"></div>
        <div className="float-right">
          <h2 className="text-center">CATEGORY DETAIL</h2>
          <form>
            <table className="table">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.txtID}
                        onChange={(e) => { this.setState({ txtID: e.target.value }) }}

                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.txtName}
                        onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div className="d-flex gap-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="ADD NEW"
                        onClick={(e) => this.btnAddClick(e)}
                      />
                      <input
                        type="submit"
                        className="btn btn-warning"
                        value="UPDATE"
                        onClick={(e) => this.btnUpdateClick(e)}
                      />
                      <input
                        type="submit"
                        className="btn btn-danger"
                        value="DELETE"
                        onClick={(e) => this.btnDeleteClick(e)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

        </div>
      </div>

    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }

  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }

  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetCategories();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default CategoryDetail;
