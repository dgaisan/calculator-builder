import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import './stage.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

let Stage = () => {
  let layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
  let style = {
    backgroundColor: '#ffffff'
  }
  return (
    <div className="Stage">
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{lg: layout}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
        measureBeforeMount={false}
        useCSSTransforms={true}
        rowHeight={30}>
        <div style={style} key={'a'}>a</div>
        <div style={style} key={'b'}>b</div>
        <div style={style} key={'c'}>c</div>
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Stage;
