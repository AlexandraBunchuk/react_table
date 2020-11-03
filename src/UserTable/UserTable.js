import React, { Component } from "react";
import GenericTable from "./../GenericTable/GenericTable";

class UserTable extends Component {
  headers = [
    { id: 0, name: "Title", key: "title" },
    { id: 1, name: "First Name", key: "first" },
    { id: 2, name: "Last Name", key: "last" },
  ];
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: null,
      values: [],
    };
  }

  loadData() {
    fetch("https://randomuser.me/api/?results=30")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            values: this.state.values.concat(
              this.transUsertsForColumns(result.results)
            ),
            currentPage: this.state.currentPage + 1,
          });
        },
        (error) => {
          this.setState({ error: error });
        }
      );
  }

  componentDidMount() {
    this.loadData();
  }

  transUsertsForColumns(users) {
    const result = users.map((user) => {
      return { columns: [user.name.title, user.name.first, user.name.last] };
    });
    return result;
  }

  render() {
    return (
      <GenericTable
        headerNames={this.headers}
        loadDataFunction={this.loadData.bind(this)}
        values={this.state.values}
        loadDataError={this.state.error}
        maxWidth={700}
      />
    );
  }
}

export default UserTable;
