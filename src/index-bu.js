import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Cell(props) {
  return (
    <div className={"cell" + props.index}>
      <button className={"cell--inner icon" + props.value} onClick={props.onClick} />
    </div>
  );
}

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: props.rule
    };
  }

  renderCell(i, cell, rule) {
    return(
      <Cell
        index={cell}
        value={i}
        onClick={() => this.handleClick(cell, rule)}
      />
    );
  }
  
  handleClick(i, rule) {
    console.log(i, this.state.rule);
    let start = String(this.state.rule).substr(0, i - 1);
    let char = String(Number(String(this.state.rule).substr(i, i + 1)) + 1);
    let end = String(this.state.rule).substr(i + 2, this.state.rule.length);
    console.log("rule: " + start + " : " + char + " : " + end);
    this.setState({
      rule: start + char + end,
    });
  }

  render() {
    return (
      <div className="rule">
          {this.renderCell(this.state.rule.substring(0, 1), 1 ,Number(this.props.index))}
          {this.renderCell(this.state.rule.substring(1, 2), 2, Number(this.props.index))}
          {this.renderCell(this.state.rule.substring(2, 3), 3, Number(this.props.index))}
          {this.renderCell(this.state.rule.substring(3, 4), 4, Number(this.props.index))}
          {this.renderCell(this.state.rule.substring(4, 5), 5, Number(this.props.index))}
      </div>
    );
  }
}

class RuleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: Array(5).fill("11211"),
    }
  }
  render() {
    return (
        <div>
            <Rule index="1" rule={this.state.rules[0]} />
            <Rule index="2" rule={this.state.rules[1]} />
            <Rule index="3" rule={this.state.rules[2]} />
            <Rule index="4" rule={this.state.rules[3]} />
            <Rule index="5" rule={this.state.rules[4]} />
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <RuleSet />,
  document.getElementById('root')
);
