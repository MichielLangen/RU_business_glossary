import React, { Component } from "react";
import { OnderwijsontwerpSjabloon } from "../../Constants/Onderwijsontwerp";
import { fillTemplate } from "../../Constants/Onderwijsontwerp";
import { buildSentence } from "../../Constants/sentenceBuilder";
import visualisatie from "../images/CDM_visualisatie.png";
import Sidebar from "./sidebar/sidebar";

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

  handleStateChangeFromChild = (data) => {
    this.setState({ shownData: data });
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
      if (record.Term_Perspective_Name === "Onderwijsontwerp") {
        let templateCopy = JSON.parse(JSON.stringify(OnderwijsontwerpSjabloon)); // Create a fresh copy of the template for each record
        return fillTemplate(templateCopy, record);
      }
      return [];
    });

    filledTemplates = filledTemplates.filter(function (element) {
      return element !== undefined;
    });

    return (
      <div className="rowC">
        <Sidebar
          handler={this.handleStateChangeFromChild}
          template={filledTemplates}
        />
        <div className="vl"></div>
        <div style={{ marginLeft: "40px" }}>
          {this.state.shownData["Onderwijsontwerp"] ? (
            <div>
              <h1 style={{ textAlign: "left" }}>
                {this.state.shownData["Onderwijsontwerp"]}
              </h1>
              <div style={{ width: "900px", textAlign: "left" }}>
                <p>
                  {buildSentence(
                    "Onderwijsontwerp",

                    data.find(
                      (item) =>
                        item.Term_name ===
                        this.state.shownData["Onderwijsontwerp"][0]
                    )
                  )}
                </p>
              </div>
              <div>
                <div className="article">
                  <img
                    className="picture"
                    src={visualisatie}
                    alt="Visual representation of the CDM"
                  />
                  <p className="cdm_onderwijsontwerp">
                    {this.state.shownData["Onderwijsontwerp"]}
                  </p>
                  <p className="cdm_subOnderwijsontwerp">
                    {this.state.shownData["subOnderwijsontwerp"]}
                  </p>
                  <p className="cdm_kwaliteitskader">
                    {this.state.shownData["Kwaliteitskader"]}
                  </p>
                  <p className="cdm_samenstellingskader">
                    {this.state.shownData["Samenstellingskader"]}
                  </p>
                  <p className="cdm_aanbod">{this.state.shownData["Aanbod"]}</p>
                  <p className="cdm_uitvoering">
                    {this.state.shownData["Uitvoering"]}
                  </p>
                  <p className="cdm_samensteller">
                    {this.state.shownData["Samensteller"]}
                  </p>
                  <p className="cdm_onderwijsontwerp_volgorde">
                    {this.state.shownData["Onderwijsontwerpvolgorde"]}
                  </p>
                  <p className="cdm_doelstelling">
                    {this.state.shownData["Doelstelling"]}
                  </p>
                  <p className="cdm_toelatingseis">
                    {this.state.shownData["Toelatingseis"]}
                  </p>
                  <p className="cdm_samenstellingsonderbouwing">
                    {this.state.shownData["Samenstellingsonderbouwing"]}
                  </p>
                </div>
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
