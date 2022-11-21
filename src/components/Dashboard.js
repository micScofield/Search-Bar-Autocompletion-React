import { Fragment, useState, useCallback } from 'react';

import { debounce } from '../utils/debounce';
import { throttle, badThrottle } from '../utils/throttle';
import MatchResults from './MatchResults';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';
/*
[{
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  }]
*/

const Dashboard2 = () => {
  const [matches, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMatches, setShowMatches] = useState(false);

  async function fetchResults(queryParams) {
    /**
     * @param queryParam {object}
     * {
     *  param1: searchTerm,
     *  param2: searchTerm2,
     * }
     */

    const query = createSearchQuery(queryParams);

    const URL = `${API_URL}${query}`;
    console.log('Calling', URL);

    const resp = await fetch(URL);
    const data = await resp.json();
    console.log(data);
    if (data) {
      setMatches(data);
      setShowMatches(true);
    }
  }

  function createSearchQuery(obj) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '';

    let str = '?';
    for (let [key, value] of entries) {
      str += `${key}=${value}`;
    }
    return str;
  }

  // Wrap inside a useCallback so that we don't always get a new copy of the debounced function which will nullify the functionality essentially.
  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);
  // const throttledFetchResults = useCallback(throttle(fetchResults, 1000), []);

  const searchBoxChangeHandler = async (e, id) => {
    setSearchTerm(e.target.value);

    let queryParams = {};
    queryParams[id] = e.target.value;

    debouncedFetchResults(queryParams);
    // throttledFetchResults(queryParams);
  };

  return (
    <Fragment>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col md-6 m-auto'>
            <h3 className='text-center mb-4'>
              Debouncing and Throttling with React
            </h3>

            <div className='form-group'>
              <input
                type='text'
                id='search'
                value={searchTerm}
                className='form-control form-control-lg'
                placeholder='Search'
                data-id='postId'
                onChange={(e) => searchBoxChangeHandler(e, 'postId')}
              />
            </div>

            {showMatches && matches && matches.length !== 0 && (
              <MatchResults matches={matches} clickHandler={() => {}} />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard2;
