import React from 'react';
import ReactDOM from 'react-dom';

export default class Highlighter {

  constructor() {
    this.connectedCallback();
  }

  connectedCallback() {
    let self = this;
    document.addEventListener('toggle-highlight', () => {
      self._highlightSelection(window.getSelection());
    });
  }

  _highlightSelection(selection) {
    function highlightRange(range) {
      let newNode = document.createElement("div");
      newNode.setAttribute("style", "background-color: yellow; display: inline;");
      range.surroundContents(newNode);
      console.log(range);
      console.log(newNode);
    }

    function getSafeRanges(range) {
      let a = range.commonAncestorContainer;
      let s = new Array(0), rs = new Array(0);

      if (range.startContainer && range.startContainer !== a) {
        for (var i = range.startContainer !== a; i !== a; i = i.parentNode) {
          s.push(i);
        }
      }

      if (0 < s.length) {
        for (var i = 0; i < s.length; i++) {
          let xs = document.createRange();
          if (i) {
            xs.setStartAfter(s[i-1]);
            xs.setEndAfter(s[i].lastChild);
          } else {
            xs.setStart(s[i], range.startOffset);
            xs.setEndAfter((s[i].nodeType === Node.TEXT_NODE) ? s[i] : s[i].lastChild);
          }
          rs.push(xs);
        }
      }

      let e = new Array(0), re = new Array(0);

      if (range.endContainer !== a) {
        for (var i = range.endContainer; i !== a; i = i.parentNode) {
          e.push(i);
        }
      }

      if (0 < e.length) {
        for (var i = 0; i < e.length; i++) {
          let xe = document.createRange();
          if (i) {
            xe.setStartBefore(e[i].firstChild);
            xe.setEndBefore(e[i-1]);
          } else {
            xe.setStartBefore((e[i].nodeType === Node.TEXT_NODE) ? e[i] : e[i].firstChild);
            xe.setEnd(e[i], range.endOffset);
          }
          re.unshift(xe);
        }
      }

      if ((0 < s.length) && (0 < e.length)) {
        let xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
      } else {
        return [range];
      }

      rs.push(xm);
      let response = rs.concat(re);

      return response;
    }

    let safeRanges = getSafeRanges(selection.getRangeAt(0));
    let hpanes = document.querySelector('layout-h-pane');
    let hpaneSelection = getSafeRanges(hpanes.selection().getRangeAt(0));

    for (var i = 0; i < safeRanges.length; i++) {
      highlightRange(safeRanges[i]);
    }

    for (var i = 0; i < hpaneSelection.length; i++) {
      highlightRange(hpaneSelection[i]);
    }
  }

}