import React from 'react';

var replacement = [
  {
    reg: /\*/g,
    dest: '×'
  }, {
    reg: /\//g,
    dest: '÷'
  }
];


export default class ResultPanel extends React.Component {

  render() {
    var exp = this.props.exp;
    var cur,
      last;
    replacement.forEach((item) => {
      exp.cur = exp.cur.replace(item.reg, item.dest);
      exp.last = exp.last.replace(item.reg, item.dest);
    });
    return (
      <div className="result-panel">
        <div className="last-row">{exp.last}</div>
        <div className="cur-row">{exp.cur}</div>
      </div>
    );
  }
}

ResultPanel.propTypes = {
  exp: React.PropTypes.object
}

