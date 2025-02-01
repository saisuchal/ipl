import './index.css'

const LatestMatch = props => {
  const {latestMatch} = props
  return (
    <>
      <p className="black">Latest Matches</p>
      <div className="flexRow">
        <div className="leftDetails">
          <p>{latestMatch.competingTeam}</p>
          <p>{latestMatch.date}</p>
          <p>{latestMatch.venue}</p>
          <p>{latestMatch.result}</p>
        </div>
        <div>
          <img
            src={latestMatch.competingTeamLogo}
            alt={`latest match ${latestMatch.competingTeam}`}
          />
        </div>
        <div className="rightDetails">
          <p>First Innings</p>
          <p>{latestMatch.firstInnings}</p>
          <p>Second Innings</p>
          <p>{latestMatch.secondInnings}</p>
          <p>Man Of The Match</p>
          <p>{latestMatch.manOfTheMatch}</p>
          <p>Umpires</p>
          <p>{latestMatch.umpires}</p>
        </div>
      </div>
    </>
  )
}
export default LatestMatch
