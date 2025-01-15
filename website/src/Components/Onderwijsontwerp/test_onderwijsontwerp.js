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
    const headers = ["Term_name"];
    const perspectives = [
      ...new Set(data.map((term) => term.Term_perspective)),
    ];

    const minLevel = Math.min(...data.map((term) => term.Term_levelStart));
    const maxLevel = Math.max(...data.map((term) => term.Term_levelEnd));
    const levels = Array.from(
      { length: maxLevel - minLevel + 1 },
      (_, i) => minLevel + i
    ).reverse();
    return (
      <div>
        <div className="table-container">
          <h2>Business Glossary v1</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Level</th>
                {perspectives.map((perspective, index) => (
                  <th key={index}>{perspective}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {levels.map((level) => (
                <tr key={level}>
                  <td>{level}</td>
                  {perspectives.map((perspective, index) => {
                    // Find terms that match this level and perspective
                    const termsAtLevel = data.filter(
                      (term) =>
                        term.Term_perspective === perspective &&
                        term.Term_levelStart <= level &&
                        term.Term_levelEnd >= level
                    );

                    return (
                      <td key={index}>
                        {termsAtLevel.length > 0 ? (
                          termsAtLevel.map((term) => (
                            <span key={term.Term_ID}>
                              {term.Term_name}
                              <br />
                            </span>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div className="table-container">
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
      </div>
    );
  }
}

export default Onderwijsontwerp;
