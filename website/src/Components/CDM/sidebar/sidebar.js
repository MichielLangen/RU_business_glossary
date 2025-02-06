import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ol
        style={{
          listStyle: "none",
          width: "250px",
          textAlign: "left",
          overflowY: "scroll",
          height: "800px",
        }}
      >
        <h4>Onderwijsontwerpen</h4>
        {this.props.template.map((record, index) => {
          return (
            <li key={index}>
              <p onClick={() => this.props.handler(record)}>
                {record["Onderwijsontwerp"]}
              </p>
            </li>
          );
        })}
        <h4>Aanboden</h4>
        {this.props.template.map((record, index) => {
          return (
            <li key={index}>
              <p onClick={() => this.props.handler(record)}>
                {record["Aanbod"]}
              </p>
            </li>
          );
        })}
        <h4>Programmas</h4>
        {this.props.template.map((record, index) => {
          return (
            <li key={index}>
              <p onClick={() => this.props.handler(record)}>
                {record["Onderwijsontwerpvolgorde"]}
              </p>
            </li>
          );
        })}
        <h4>Samenstellingsonderbouwing</h4>
        {this.props.template.map((record, index) => {
          return (
            <li key={index}>
              <p onClick={() => this.props.handler(record)}>
                {record["Samenstellingsonderbouwing"]}
              </p>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default Sidebar;
