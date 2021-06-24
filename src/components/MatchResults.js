const MatchResults = ({ matches, clickHandler }) => {
    
    return <div id="match-list" onClick={e => clickHandler(e)}>
        {matches.map(match => <div key={match.lat} className='card card-body mb-1' data-name={match.name}>

            <h4>{match.name} ({match.abbr})</h4><span className="text-primary" >{match.capital}</span>
            
            <small>Lat: {match.lat} / Long: {match.long}</small>

        </div>)}
    </div>
}

export default MatchResults