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
        index={cell + 1}
        value={i}
        onClick={() => this.props.onClick(cell, rule)}
      />
    );
  }
  
  render() {
    return (
      <div className="rule">          
          {this.renderCell(this.state.rule[0], 0, this.props.index)}
          {this.renderCell(this.state.rule[1], 1, this.props.index)}
          {this.renderCell(this.state.rule[2], 2, this.props.index)}
          {this.renderCell(this.state.rule[3], 3, this.props.index)}
          {this.renderCell(this.state.rule[4], 4, this.props.index)}
      </div>
    );
  }
}

class RuleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
    }
  }

  handleClick(i, rule) {
    const rules = this.state.rules.slice();
    rules[rule - 1][i]++ ; 
    if(rules[rule - 1][i] > 5) {
      rules[rule - 1][i] = 0
    }

    this.setState({
      rules: rules
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
