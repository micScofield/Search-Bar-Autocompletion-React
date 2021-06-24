import { Fragment, useState } from 'react'

import { debounce } from '../util/utilities'
import MatchResults from './MatchResults'

const Dashboard = () => {

    const [matches, setMatches] = useState([])
    const [showMatches, setShowMatches] = useState(true)

    const [showDescription, setShowDescription] = useState(false)
    const [searchResult, setSearchResult] = useState('')

    // const [searchText, setSearchText] = useState('')

    // search states from json data and filter
    async function filterSearch(inputStr) {
        setShowMatches(true)
        let matches

        // do not show any result if input string in empty
        if (inputStr.trim().length === 0) {
            matches = []
        } else {
            console.log('making api call', inputStr)

            const res = await fetch('../data/states.json')
            const states = await res.json()

            const regex = new RegExp(`^${inputStr}`, 'gi') // gi flag removes the case sensitiveness

            // get matches to current text input
            matches = states.filter(state => {
                return state.name.match(regex) || state.abbr.match(regex)
            })
        }

        setMatches(matches)
    }

    const debounceRequest = debounce(filterSearch, 500)

    const clickHandler = e => {
        // search for match details using this name and store results in some state which we can render on page
        // for now lets just render name
        setShowDescription(true)
        setShowMatches(false)
        setSearchResult(e.target.parentElement.dataset.name)

        // set input value to ''
        document.getElementById('search').value = ''
    }

    // Not working
    // const changeHandler = e => {
    //     setSearchText(e.target.value)
    //     const fn = debounce(filterSearch, 500, e.target.value)
    //     fn()
    // }

    return <Fragment>
        <div className="container mt-5">
            <div className="row">
                <div className="col md-6 m-auto">

                    <h3 className="text-center mb-4">
                        <i className="fas fa-flag-usa"></i> State Capital Lookup
                    </h3>

                    <div className="form-group">
                        <input 
                            type="text" 
                            id="search" 
                            // value={searchText} 
                            className="form-control form-control-lg" 
                            placeholder="Enter state name or abbreviation" 
                            onKeyUp={debounceRequest} 
                            // onChange={e => changeHandler(e)} 
                        />
                    </div>

                    {showMatches && matches.length !== 0 && <MatchResults matches={matches} clickHandler={clickHandler} />}

                </div>
            </div>

            {showDescription && <div className='card card-body mb-1 mt-5'>
                You searched for {searchResult}
            </div>}

        </div>
    </Fragment>
}

export default Dashboard