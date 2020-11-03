import React, { Component } from "react";
import GenericTable from "./../GenericTable/GenericTable";

class Column extends Component {
  

  render() {
      if(this.state.users) {
        return (
            <GenericTable values={this.state.users} headerNames={this.headers} />
          );
      }
    return (<div></div>)
  }
}

export default Column;
