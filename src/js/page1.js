import React from 'react'
import ReactDOM from 'react-dom'

class App_start extends React.Component{
  render(){
    return(
      <div>
        <div className="henko">
          <a className="connect txC" href="stage_select.html">
            START
          </a>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <App_start />,
  document.getElementById('page1')
)
