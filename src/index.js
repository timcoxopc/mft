/*

  Use context see: https://www.reddit.com/r/reactjs/comments/9j4h9n/how_to_pass_a_function_to_a_grandchild_in_react/

*/

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
        onClick={() => this.props.onClick(cell, rule)}
      />
    );
  }
  
  render() {
    return (
      <div className="rule">          
          {this.renderCell(this.state.rule.substring(0, 1), 1, Number(this.props.rule))}
          {this.renderCell(this.state.rule.substring(1, 2), 2, Number(this.props.rule))}
          {this.renderCell(this.state.rule.substring(2, 3), 3, Number(this.props.rule))}
          {this.renderCell(this.state.rule.substring(3, 4), 4, Number(this.props.rule))}
          {this.renderCell(this.state.rule.substring(4, 5), 5, Number(this.props.rule))}
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

  handleClick(i, rule) {
    let start = String(rule).substr(0, i - 1);
    let char = String(Number(String(rule).substr(i, i + 1)) + 1);
    let end = String(rule).substr(i + 2, rule.length);
    console.log("rule: " + start + " : " + char + " : " + end);
    this.setState({
      rule: start + char + end,
    });

  }

  render() {
    return (
        <div>
            <Rule index="1" rule={this.state.rules[0]} onClick={(cell, rule) => this.handleClick(cell, rule)} />
            <Rule index="2" rule={this.state.rules[1]} onClick={(cell, rule) => this.handleClick(cell, rule)} />
            <Rule index="3" rule={this.state.rules[2]} onClick={(cell, rule) => this.handleClick(cell, rule)} />
            <Rule index="4" rule={this.state.rules[3]} onClick={(cell, rule) => this.handleClick(cell, rule)} />
            <Rule index="5" rule={this.state.rules[4]} onClick={(cell, rule) => this.handleClick(cell, rule)} />
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <RuleSet />,
  document.getElementById('root')
);
