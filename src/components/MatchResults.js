const MatchResults = ({ matches, clickHandler }) => {
  return (
    <div id='match-list' onClick={(e) => clickHandler(e)}>
      {matches.map((match) => {
        const { id, name, email, body } = match;
        return (
          <div key={id} className='card card-body mb-1' data-name={name}>
            <h4>{name}</h4>
            <span className='text-primary'>{body}</span>

            <small>Email: {email}</small>
          </div>
        );
      })}
    </div>
  );
};

export default MatchResults;
