import React from "react";

class Onderwijsontwerp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  fetchData = () => {
    fetch("http://127.0.0.1:5000/onderwijsontwerp")
      .then((res) => res.json()) // Correcte syntax voor json() parsing
      .then((res) => {
        console.log(res)
        this.setState({ data: res }); // Update state met de opgehaalde data
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Foutafhandelingsmechanisme
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  

  render() {
    const { data } = this.state;
    const headers = ['Term_ID', 'Term_name', 'Term_levelStart', 'Term_levelEnd', 'Term_perspective', 'Definition_IDs']
    return (
      <div>
        <h1>Onderwijs Ontwerp Data:</h1>
        <table border="1">
      <thead>
        <tr>
          {/* Create table headers dynamically based on the keys */}
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Related Terms</th> {/* Add a column for related terms */}
        </tr>
      </thead>
      <tbody>
        {/* Map over each row of the data */}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {/* Map over each key-value pair in the row */}
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
            {/* Render related terms in a new column */}
            <td>
              {/* Check if related terms exist */}
              {row.Related_Terms && row.Related_Terms.length > 0 ? (
                <ul>
                  {/* Map over related terms and display them */}
                  {row.Related_Terms.map((relatedTerm, index) => (
                    <li key={index}>{relatedTerm.Term2_Name}</li>
                  ))}
                </ul>
              ) : (
                <p>No related terms</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    );
  }
}

export default Onderwijsontwerp;
