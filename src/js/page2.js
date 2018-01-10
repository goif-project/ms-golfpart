import React from 'react'
import ReactDOM from 'react-dom'

class Button extends React.Component{
  localHandleClick(){
    this.props.localHandleClick(this.props.increment);
    // 選択した要素にだけ class: forcus を付与
  }

  render(){
    return (
      //<button onClick={this.localHandleClick.bind(this)}>{this.props.increment}</button>
      <button onClick={this.localHandleClick.bind(this)}><div className={"forcus button_image0"+this.props.increment}></div></button>
    )
  }
}

class Result extends React.Component{
  render(){
    var skill_text = null,skill_title = null,skill_effect = null
    if (this.props.localCounter == 1) {
      skill_title = "パワーショット"
      skill_text = "ボールを打つ強さを1.5倍に強化！"
      skill_effect = "打つ強さ1.5倍"
    }else if (this.props.localCounter == 2) {
      skill_title = "ノーリフレクション"
      skill_text = "壁に反射した回数を10回分減少させる"
      skill_effect = "壁の反射回数 -10回"
    }else if (this.props.localCounter == 3) {
      skill_title = "デカカップ"
      skill_text = "カップの大きさを1.5倍に大きくする！"
      skill_effect = "カップの大きさ1.5倍"
    }else if (this.props.localCounter == 4) {
      skill_title = "晴れ男"
      skill_text = "いかなる天候も晴れにしてしまう！"
      skill_effect = "天候を晴れに固定"
    }
    return(
<div className="char">
    <div className="left">
        <div className={'skill_image0'+this.props.localCounter}></div>
    </div>
    <div className="right">
        <div className="skill_title">
        <span className="item">
        スキル名
        </span>
        <span className="skill">
        {skill_title}
        </span>
        </div>
        <div className="skill_text">
        <span className="item">
        説明
        </span>
        <span className="skill">
        {skill_text}
        </span>
        </div>
        <div className="skill_effect">
        <span className="item">
        効果
        </span>
        <span className="skill">
        {skill_effect}
        </span>
        </div>
    </div>
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
    });

  }
  render(){
    return(
      <div className="char_set">
        <div className="page_tag_area">
            <div className="tag_main"><h2>スキル選択</h2></div>
        </div>
        <div className="result_wrap">
          <Result localCounter={this.state.counter} />
        </div>
        <div className="btn_wrap">
            <div className="btn_inline_wrap">
                <Button localHandleClick={this.handleClick} increment={1} />
                <Button localHandleClick={this.handleClick} increment={2} />
                <Button localHandleClick={this.handleClick} increment={3} />
                <Button localHandleClick={this.handleClick} increment={4} />
            </div>
        </div>
        <form action="page3.html" name="char_post" className="form_area" id="my_form">
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
