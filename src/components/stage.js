import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import { Responsive, WidthProvider }    from 'react-grid-layout';
import { itemSelected }                 from './../actions';
import ItemTypes                        from './../constants/item-types';
import { calculatableValueChanged, removeItem, layoutChanged } from './../actions'
import './stage.css';
import TextItem                         from './items/static-text';
import NumberItem                       from './items/number-field';
import ResultItem                       from './items/result-number-field';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// hardcoded css class names that belong to stage
const stageCssClasses = ['Stage', 'react-grid-layout layout'];

class Stage extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      mounted: false,
      layouts: this._getLayouts(props.items)
    }
  }

  _getLayouts = (items) => {
    return items.map(item => {
      let {i, x, y, w, h} = item;
      i = String(i);
      return {i, x, y, w, h};
    });
  }

  componentWillReceiveProps(nextProps) {
    const layouts = this.state.layouts;
    const newLayouts = this._getLayouts(nextProps.items);

    // decide whether or not local state should be updated.
    // if item layouts changed then need to re-set layouts prop
    let layoutChangedFlag = false;

    if (newLayouts.length !== layouts.length) {
      layoutChangedFlag = true;
    } else {
      newLayouts.forEach(item => {
        // ei: existing item
        const ei = layouts.find(i => (i.i === item.i));
        if (!ei) { layoutChangedFlag = true; }
        if (ei.x !== item.x || ei.y !== item.y || ei.w !== item.w || ei.h !== item.h) {
          layoutChangedFlag = true;
        }
      });
    }

    if (layoutChangedFlag) {
      this.setState({layouts: newLayouts});
    }
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  onLayoutChange = (layout, layouts) => {
    // TODO encapsulate layout change logic here
  };

  // used to indicate selection of an item
  onDragStart = (param1, layoutItem) => {
    this.props.dispatch(itemSelected(parseInt(layoutItem.i, 10)));
  };

  onDragStop = (layouts, layoutItem) => {
    this.props.dispatch(layoutChanged(layouts));
  }

  onResizeStop = (layouts, layoutItem) => {
    this.props.dispatch(layoutChanged(layouts));
  }

  onStageClicked = (e) => {
    const clickedClassName = e.target.className;
    if (clickedClassName && ~stageCssClasses.indexOf(clickedClassName)) {
      this.props.dispatch(itemSelected(0));
    }
  }

  onRemoveItem = itemId => {
    this.props.dispatch(removeItem(itemId));
  }

  render() {
    const { items, selectedItem, dispatch, stageItem } = this.props;
    console.log('rendering Stage');
    console.log(items);

    const stageStyle = {
      margin: '0 auto',
      width: stageItem.width,
      backgroundColor: stageItem.bgcolor,
    }

    const itemsDivs = items.map((item) => {
      let boxStyle = {
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        WebkitBoxSizing: 'border-box',
        border: '1px solid #000000',
        backgroundColor: item.bgcolor,
      };
      let itemStyle = {
        backgroundColor: item.bgcolor,
        fontFamily: item.fontname,
        color: item.fontcolor,
        textAlign: item.textAlign,
        fontWeight: item.textBold ? 'bold' : 'normal',
        fontStyle: item.textItalic ? 'italic' : 'normal',
        textDecoration: item.textUnderscore ? 'underline' : '',
      }
      console.log('itemStyle', itemStyle);
      if (item.id === selectedItem) {
        boxStyle = {
          ...boxStyle,
          border: '2px solid #f00',
        }
      }
      const datagrid = {w: item.w, h: item.h, x: item.x, y: item.y};
      let itemView = null;

      switch (item.type) {
        case ItemTypes.STATIC_TEXT:
          itemView = <TextItem itemName={item.itemName}
            itemText={item.text}
            itemStyle={itemStyle}
            onRemoveItem={() => {this.onRemoveItem(item.id)}} />
          break;
        case ItemTypes.NUMBER_FIELD:
          itemView = <NumberItem itemName={item.itemName}
            item={item}
            itemText={item.text}
            itemStyle={itemStyle}
            number={item.value}
            onNumberChanged={(value, itemId)=>{ console.log('number field changed', value, itemId); dispatch(calculatableValueChanged(value, itemId))} }
            onRemoveItem={() => {this.onRemoveItem(item.id)}} />
          break;
        case ItemTypes.NUMBER_RESULT:
          itemView = <ResultItem itemName={item.itemName}
            itemStyle={itemStyle}
            itemText={item.text}
            result={item.value}
            onRemoveItem={() => {this.onRemoveItem(item.id)}} />
          break;
        default:
      }

      return (
        <div style={boxStyle}
          key={item.id}

          data-grid={datagrid} >
          {itemView}
        </div>
      );
    });

    return (
      <div className="Stage" style={stageStyle} onClick={this.onStageClicked}>
        <ResponsiveReactGridLayout
          className="layout"
          layouts={{lg: this.state.layouts}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          isResizable={true}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          onLayoutChange={this.onLayoutChange}
          onDragStart={this.onDragStart}
          onDragStop={this.onDragStop}
          onResizeStop={this.onResizeStop}
          rowHeight={70}>
            {itemsDivs}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
};

Stage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  return {
    stageItem: state.items.find(item => item.id === 0),
    items: state.items.filter((item) => (item.type !== ItemTypes.STAGE)),
    selectedItem: state.selectedItem,
  };
};

export default connect(mapStateToProps)(Stage);
