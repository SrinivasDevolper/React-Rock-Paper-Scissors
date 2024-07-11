import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import './index.css'

class PlayGame extends Component {
  state = {
    display: true,
    score: 0,
    status: '',
    userChoice: '',
    computerChoice: '',
  }

  userClickOption = (userGameId, userGameImage) => {
    const {choicesList} = this.props
    const computerResponse = Math.floor(Math.random() * choicesList.length)
    // const {display, score, status, userChoice, computerChoice} = this.state
    const computerChoiceId = choicesList[computerResponse].id
    this.setState({
      userChoice: userGameImage,
      computerChoice: choicesList[computerResponse].imageUrl,
    })
    console.log(
      computerChoiceId,
      'Computer',
      userGameId,
      'User',
      userGameId === 'ROCK' && computerChoiceId === 'PAPER',
      userGameId === 'PAPER' && computerChoiceId === 'SCISSORS',
      userGameId === 'SCISSORS' && computerChoiceId === 'ROCK',
    )
    if (
      (userGameId === 'ROCK' && computerChoiceId === 'PAPER') ||
      (userGameId === 'PAPER' && computerChoiceId === 'SCISSORS') ||
      (userGameId === 'SCISSORS' && computerChoiceId === 'ROCK')
    ) {
      this.setState(prev => ({
        status: 'YOUR LOSE',
        display: false,
        score: prev.score - 1,
      }))
    } else if (userGameId === computerChoiceId) {
      this.setState({
        status: 'YOUR DRAW',
        display: false,
      })
    } else {
      this.setState(prev => ({
        status: 'YOUR WON',
        display: false,
        score: prev.score + 1,
      }))
    }
  }

  playGameButton = () => {
    this.setState({
      display: true,
      status: '',
      userChoice: '',
      computerChoice: '',
    })
  }

  render() {
    const {display, score, status, userChoice, computerChoice} = this.state
    const {choicesList} = this.props
    return (
      <div className="bg-container">
        <div className="score-bar">
          <div>
            <h1 className="score-heading">ROCK</h1>
            <h1 className="score-heading">PAPPER</h1>
            <h1 className="score-heading">SCISSORS</h1>
          </div>
          <div className="score-cont">
            <h1>Score</h1>
            <h1>{score}</h1>
          </div>
        </div>
        {display ? (
          <ul className="ul-items-cont">
            {choicesList.map(eachItem => (
              <li key={eachItem} className="list-items">
                <button
                  type="button"
                  className="items-button"
                  onClick={() =>
                    this.userClickOption(eachItem.id, eachItem.imageUrl)
                  }
                >
                  <img
                    className="items-image"
                    src={eachItem.imageUrl}
                    alt="your choice"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="game-state-cont">
            <div className="game-result-cont">
              <div>
                <h1 className="players">You</h1>
                <button type="button" className="items-button">
                  <img
                    className="items-image"
                    src={userChoice}
                    alt="your choice"
                  />
                </button>
              </div>
              <div>
                <h1 className="players">Opponent</h1>
                <button type="button" className="items-button">
                  <img
                    className="items-image"
                    src={computerChoice}
                    alt="your choice"
                  />
                </button>
              </div>
            </div>
            <div>
              <h1 className="game-state-heading">{status}</h1>
              <button
                type="button"
                className="play-again-button"
                onClick={this.playGameButton}
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                RULES
              </button>
            }
          >
            {close => (
              <div className="pop-cont">
                <button
                  type="button"
                  className="close-button"
                  onClick={() => close()}
                >
                  <RiCloseLine text-label="close" />
                  close
                </button>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                    className="pop-image"
                  />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default PlayGame
