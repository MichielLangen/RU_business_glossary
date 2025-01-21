import React, { Component } from "react";
import { OnderwijsontwerpSjabloon } from "../../Constants/Onderwijsontwerp";
import { fillTemplate } from "../../Constants/Onderwijsontwerp";
import { buildSentence } from "../../Constants/sentenceBuilder";
import { generateMermaidString } from "../../Constants/mermaidStringBuilder";

class DataVisualisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sidebarOpen: true,
      shownData: [],
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  fetchData = () => {
    fetch("http://127.0.0.1:5000/onderwijsontwerp")
      .then((res) => res.json()) // Correcte syntax voor json() parsing
      .then((res) => {
        this.setState({ data: res }); // Update state met de opgehaalde data
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Foutafhandelingsmechanisme
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleClick(record) {
    console.log(record);
  }

  render() {
    const { data } = this.state;

    let filledTemplates = data.map((record) => {
      let templateCopy = JSON.parse(JSON.stringify(OnderwijsontwerpSjabloon)); // Create a fresh copy of the template for each record
      return fillTemplate(templateCopy, record);
    });

    return (
      <div className="rowC">
        <ol
          style={{
            listStyle: "none",
            width: "250px",
            textAlign: "left",
            overflowY: "scroll",
            height: "800px",
          }}
        >
          {filledTemplates.map((record, index) => {
            return (
              <li key={index}>
                <p onClick={() => this.setState({ shownData: record })}>
                  {record["Onderwijsontwerp"]}
                </p>
              </li>
            );
          })}
        </ol>
        <div className="vl"></div>
        <div style={{ marginLeft: "40px" }}>
          {this.state.shownData["Onderwijsontwerp"] ? (
            <div>
              <h1 style={{ textAlign: "left" }}>
                {this.state.shownData["Onderwijsontwerp"]}
              </h1>
              <div style={{ width: "900px", textAlign: "left" }}>
                <p>{buildSentence("Onderwijsontwerp", this.state.shownData)}</p>
              </div>
              <div>
                <pre style={{ textAlign: "left" }}>
                  {JSON.stringify(this.state.shownData, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <h1>
              Klik op een van de termen hier links om de definitie te zien!
            </h1>
          )}
        </div>
      </div>
    );
  }
}

export default DataVisualisation;
