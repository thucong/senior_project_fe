import React, { Component } from "react";

class Covid extends Component {
  render() {
    return (
      <div className="col col-md-8 center mt-5 covid">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan="5">News about covid</th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col">Number of infections</th>
              <th scope="col">Being treated</th>
              <th scope="col">Cured</th>
              <th scope="col">Dead</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">VietNam</th>
              <td>888.887</td>
              <td>61.292</td>
              <td>805.978</td>
              <td>21.673</td>
            </tr>
            <tr>
              <th scope="row">World</th>
              <td>244.463.302</td>
              <td></td>
              <td>221.491.950</td>
              <td>4.964.472</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Covid;
