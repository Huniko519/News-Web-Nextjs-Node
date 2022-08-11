import React from 'react';
import Layout from '../components/Layout';
import stylesheet from '../src/styles/pages/search.scss';


const Search = (props) => (
  <Layout {...props}>
    <style global jsx>{stylesheet}</style>
    <div className="inews__archive__title">
      <h1>Search</h1>
    </div>
    <script async src="https://cse.google.com/cse.js?cx=011782314020777428663:ycznkklrfq5" />
    <div className="gcse-search" />
  </Layout>
);

export const config = { amp: true };
export default Search;
