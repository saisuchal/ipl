import './index.css'

const LatestMatch = props => {
  const {latestMatch} = props
  return (
    <>
      <p>Latest Matches</p>
      <div className="latest-match">
        <div className="left-details">
          <p>{latestMatch.competingTeam}</p>
          <p className="custom-para">{latestMatch.date}</p>
          <p>{latestMatch.venue}</p>
          <p>{latestMatch.result}</p>
        </div>
        <div className="team-logo-div">
          <img
            className="latest-match-team-logo"
            src={latestMatch.competingTeamLogo}
            alt={`latest match ${latestMatch.competingTeam}`}
          />
        </div>
        <div className="right-details">
          <p className="custom-para">First Innings</p>
          <p>{latestMatch.firstInnings}</p>
          <p className="custom-para">Second Innings</p>
          <p>{latestMatch.secondInnings}</p>
          <p className="custom-para">Man Of The Match</p>
          <p>{latestMatch.manOfTheMatch}</p>
          <p className="custom-para">Umpires</p>
          <p>{latestMatch.umpires}</p>
        </div>
      </div>
    </>
  )
}
export default LatestMatch
