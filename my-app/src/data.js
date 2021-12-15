import React, { useState, useEffect } from "react";

const Data = () => {
  const [box, setBox] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vall, setvall] = useState([]);

  useEffect(() => {
    fetch("http://65.0.244.73:4000/product/all/buyer/products")
      .then((response) => response.json())
      .then((data) => {
        setBox(data);
        setvall(data);
      });
  }, []);

console.log(box)
  // Show data on Table

  const Show = () => {

    let details = vall?.map((val, index) => {
      return (
        <tr key={val._id}>
          <td>{index + 1}</td>
          <td>{val.product_name}</td>
          <td>{val.seller_price}</td>
        </tr>
      );
    });
    return details;
  };

  //Searching

  function filteration() {
    let volume = box.filter((val) => {
      {
        //  console.log(val.product_category)
      }
      if (searchTerm == "") {
        return val;
      } else if (
        val?.product_name?.toLowerCase().includes(searchTerm?.toLowerCase())
      ) {
        return val;
      } else if (val.seller_price == Number(searchTerm)) {
        return val;
      } else if (val?.product_category?.toLowerCase?.includes(searchTerm?.toLowerCase())) {
        console.log(val.product_category)
        let inside = val.product_category.map((val) => {
          let main = box.map((run) => {
            let file = run.product_category.map((tree) => {
              return tree.value;
            });
            if (file) {
              console.log(file);
            }
          });
          let insideVal = val.value;
          if (
            insideVal.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            console.log(box);
          }
        });
      }
    });
    setvall(volume);
  }

  useEffect(() => {
    filteration();
  }, [searchTerm]);

  return (
    <div>
      <div className="container-fluid p-2 bg-light">
        <h1 className="text-info">Data Filteration:</h1>
      </div>
      <div className="container">
        <div id="dataNo">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr className="bg-info">
              <th scope="col">S.No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody id="table">{Show()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Data;
