import React, { Component } from "react";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      termCount: 0,
      termName: "",
      startLevel: 1,
      endLevel: 1,
      subTerm: [],
      termPerspective: 1,
    };
  }

  fetchData = () => {
    fetch("http://127.0.0.1:5000/admin")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ data: res });
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Foutafhandelingsmechanisme
      });
  };

  postData = () => {
    fetch("http://127.0.0.1:5000/admin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          Term_name: this.state.termName,
          Term_levelStart: Number(this.state.startLevel),
          Term_levelEnd: Number(this.state.endLevel),
          Term_Perspective: Number(this.state.termPerspective),
        },
        this.state.subTerm,
      ]),
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postData();
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((values) => ({ ...values, [name]: value }));
  };

  handleSubChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      subTerm: [...this.state.subTerm, Number(value)],
    });
  };

  increaseCounter = (type) => {
    this.setState((prevState) => {
      return {
        termCount:
          type == "add" ? prevState.termCount + 1 : prevState.termCount - 1,
      };
    });
  };

  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.data[0] != undefined ? (
            <div>
              <label>
                Term naam:
                <input
                  style={{ marginLeft: "10px" }}
                  type="text"
                  name="termName"
                  value={this.state.termName}
                  onChange={this.handleChange.bind(this)}
                />
              </label>
              <br />
              <label>
                Begin niveau:
                <input
                  style={{ marginLeft: "10px" }}
                  type="number"
                  name="startLevel"
                  value={this.state.startLevel}
                  onChange={this.handleChange.bind(this)}
                />
              </label>
              <br />
              <label>
                Eind niveau:
                <input
                  style={{ marginLeft: "10px" }}
                  type="number"
                  name="endLevel"
                  value={this.state.endLevel}
                  onChange={this.handleChange.bind(this)}
                />
              </label>
              <br />
              <label>
                Perspectief:
                <select
                  onChange={this.handleChange.bind(this)}
                  name="termPerspective"
                  style={{ marginLeft: "10px" }}
                >
                  {Object.values(this.state.data[0]).map((element) => (
                    <option value={element.Perspective_ID}>
                      {element.Perspective_name}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <h4>Gerelateerde termen</h4>
                <input
                  type="button"
                  value="+"
                  onClick={this.increaseCounter.bind(this, "add")}
                />
                <input
                  type="button"
                  value="-"
                  onClick={this.increaseCounter.bind(this, "sub")}
                />
                {[...Array(this.state.termCount)].map((_, i) => (
                  <div>
                    <select name="subTerm" onChange={this.handleSubChange}>
                      {Object.values(this.state.data[2]).map((element) => (
                        <option value={element.term_ID}>
                          {element.term_name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <br />
              <input type="submit" value="Toevoegen" />
            </div>
          ) : (
            <div>Data aan het ophalen...</div>
          )}
        </form>
      </div>
    );
  }
}

export default AdminPanel;
