import React from 'react'
import ReactDOM from 'react-dom'

class Button extends React.Component{
  localHandleClick(){
    this.props.localHandleClick(this.props.increment)
  }
  render(){
    return (
      <button onClick={this.localHandleClick.bind(this)}>{this.props.increment}</button>
    )
  }
}

class Result extends React.Component{
  render(){
    return(
      <div className={"char"+this.props.localCounter}>
        {this.props.localCounter}
      </div>
    )
  }
}

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      counter: 1,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(increment){
    this.setState({
      counter:increment
    })
  }
  render(){
    return(
      <div className="char_set">
        <div className="result_wrap">
          <Result localCounter={this.state.counter} />
        </div>
        <div className="btn_wrap">
          <Button localHandleClick={this.handleClick} increment={1} />
          <Button localHandleClick={this.handleClick} increment={2} />
          <Button localHandleClick={this.handleClick} increment={3} />
          <Button localHandleClick={this.handleClick} increment={4} />
        </div>
        <form action="page3.html" name="char_post" id="my_form">
          <input id="counter_num" type="hidden" name="counter_num" value={this.state.counter} />
          <button className="connect page2" type="submit" id="btn_click" >
            START
          </button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("page2")
 )
