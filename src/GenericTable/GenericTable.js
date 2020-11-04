import "./GenericTable.css";
import React, { Component } from "react";
import Draggable from "react-draggable";

class GenericTable extends Component {
  constructor(props) {
    super(props);
    this.dragRef = React.createRef();
    const headersWidth = props.headerNames.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.key]: this.props.maxWidth / props.headerNames.length,
        }),
      {}
    );

    this.state = {
      ...props,
      sortedValues: this.props.values,
      widths: { ...headersWidth },
      currentSortedField: null,
      prevY: 0,
      currentPage: 0,
      isAscendingRowSorting: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.sortedValues?.length !== props.values?.length) {
      return { sortedValues: props.values };
    }
    return null;
  }

  /**
   * Load additional information to the bottom of the page
   * @param {*} entities 
   */
  handleObserver(entities) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.props.loadDataFunction();
    }
    this.setState({ prevY: y });
  }

  componentDidMount() {
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  render() {
    let rows = <tr key="row0"></tr>;

    if (this.state.sortedValues && this.props.headerNames) {
      rows = this.state.sortedValues.map((rowValue, rowIndex) => (
        <tr key={"row" + rowIndex}>
          {rowValue.columns.map((columnValue, columnIndex) => (
            <td
              id={this.props.headerNames[columnIndex].key + rowIndex}
              key={this.props.headerNames[columnIndex].key + rowIndex}
            >
              {columnValue}
            </td>
          ))}
        </tr>
      ));
    }

    const tableHeaders = this.state.headerNames.map((header, index) => {
      let draggableIcon = <React.Fragment></React.Fragment>;
      if (index !== this.state.headerNames.length - 1) {
        draggableIcon = (
          <Draggable
            nodeRef={this.dragRef}
            axis="x"
            onDrag={(event, { deltaX }) =>
              this.resizeRow({
                event,
                header,
                deltaX,
              })
            }
            position={{ x: 0 }}
            zIndex={999}
          >
            <span ref={this.dragRef} className="drag-handle-icon">⋮</span>
          </Draggable>
        );
      }

      return (
        <th
          id={"header" + index}
          key={"header" + index}
          style={{ width: this.state.widths[header.key] + "px" }}
        >
          <div className="header-item">
            <button
              type="button"
              className="table-header"
              onClick={() => this.updateSortedValues(header.id)}
            >
              {header.name}
            </button>
            {draggableIcon}
          </div>
        </th>
      );
    });

    return (
      <React.Fragment>
        <table
          className="table table-bordered"
          style={{ width: this.props.maxWidth + "px" }}
        >
          <thead>
            <tr>{tableHeaders}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>

        <div ref={(loadingRef) => (this.loadingRef = loadingRef)}>
          {this.props.error ? this.this.props.error : "Loading..."}
        </div>
      </React.Fragment>
    );
  }

  /**
   * Update the width  of the row in the state
   * @param {} event 
   */
  resizeRow(event) {
    if (event.deltaX !== 0) {
      const prevWidths = this.state.widths;
      const nextRowIndex = this.state.headerNames.indexOf(event.header) + 1;
      const nextRowWidth =
        prevWidths[this.state.headerNames[nextRowIndex].key] - event.deltaX;

      if (nextRowWidth > 0) {
        this.setState({
          widths: {
            ...this.state.widths,
            [event.header.key]: prevWidths[event.header.key] + event.deltaX,
            [this.state.headerNames[nextRowIndex].key]: nextRowWidth,
          },
        });
      }
    }
  }

  /**
   * Sort values and update sortedValues property based on the current sorted field
   * @param {} fieldId 
   */
  updateSortedValues(fieldId) {
    if (fieldId !== -1 && this.props.values) {
      const sortedValues = [...this.props.values];
      let isCurrentOrderAscending = false;
      if (!this.state.isAscendingRowSorting) {
        isCurrentOrderAscending = true;
      } else {
        isCurrentOrderAscending = this.state.currentSortedField !== fieldId;
      }
      sortedValues.sort((a, b) => {
        if (a.columns[fieldId] < b.columns[fieldId]) {
          return isCurrentOrderAscending ? -1 : 1;
        }
        if (a.columns[fieldId] > b.columns[fieldId]) {
          return isCurrentOrderAscending ? 1 : -1;
        }
        return 0;
      });
      this.setState({
        sortedValues: sortedValues,
        currentSortedField: fieldId,
        isAscendingRowSorting: isCurrentOrderAscending,
      });
    }
  }
}

export default GenericTable;
