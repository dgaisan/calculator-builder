import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import { Responsive, WidthProvider }    from 'react-grid-layout';
//import { itemSelected }                 from './../actions';
import ItemTypes                        from './../constants/item-types';
import './stage.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Stage extends Component {
  constructor(props) {
    super(props);

    console.log('constructing Stage');
    console.log('props:');
    console.log(props);

    this.state = {
      mounted: false,
      layout: props.items.map(item => {
        const {id : i, x, y, w, h} = item;
        return {i, x, y, w, h};
      })
    }
  }

  componentDidMount() {
    this.mounted = true;;
  }

  onLayoutChange = (layout, layouts, more) => {
    console.log('Layout has changed');
    console.log(layout);
    console.log(layouts);
    console.log(more);
  };

  // used to indicate selection of an item
  onDragStart = (param1, layoutItem) => {
    console.log('onDragStart');
    //console.log(param1);

    // this.props.dispatch(itemsSelected);
  };

  render() {
    console.log('rendering stage!');
    console.log('changed items:');
    const { items } = this.props;
    console.log(items);
    let layout = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
      ];
    const style = {
      backgroundColor: '#ffffff'
    };
    let itemsDivs = items.map((item) => {
      console.log('item:', item);
      return (
        <div style={style} key={item.id}>{item.id}</div>
      );
    });

    console.log('itemsDivs:');
    console.log(itemsDivs);

    return (
      <div className="Stage">
        <ResponsiveReactGridLayout
          className="layout"
          layouts={{lg: this.state.layout}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          onLayoutChange={this.onLayoutChange}
          onDragStart={this.onDragStart}
          onResizeStart={()=>{console.log('onDragStart');}}

          rowHeight={30}>
            {itemsDivs}

        </ResponsiveReactGridLayout>
      </div>
    );
  }
};

Stage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  console.log('Stage->mapStateToProps');
  console.log(state);
  return {
    items: state.items.filter((item) => (item.type !== ItemTypes.STAGE))
  };
};



export default connect(mapStateToProps)(Stage);
