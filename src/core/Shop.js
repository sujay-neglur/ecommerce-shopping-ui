import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import Radiobox from "./Radiobox";
import Card from "./Card";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState({
    filters: { category: [], price: [] }
  });
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, filter.filters);
  }, []);

  const handlePrice = value => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, filter.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...filter };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      newFilters.filters[filterBy] = handlePrice(filters);
    }
    loadFilteredResults(filter.filters);
    setFilter(newFilters);
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="btn btn-warning mb-5" onClick={loadMore}>
          Load More
        </button>
      )
    );
  };
  return (
    <Layout
      title="Shop Page"
      description="Search Products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by Price Range</h4>
          <div>
            <Radiobox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, index) => (
              <div className="col-4 mb-3" key={index}>
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};
export default Shop;
