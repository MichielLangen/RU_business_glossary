import React, { Component } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import { NumberField } from "@base-ui-components/react/number-field";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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

  componentDidMount() {
    this.fetchData();
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
  }
  render() {
    console.log(this.state.data[0]);
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          {this.state.data[0] != undefined ? (
            <div>
              <TextField label="Term naam" name="term_name" />
              <NumberField.Root>
                <NumberField.ScrubArea>
                  <label>Level start</label>
                  <NumberField.ScrubAreaCursor />
                </NumberField.ScrubArea>
                <NumberField.Group>
                  <NumberField.Decrement>-</NumberField.Decrement>
                  <NumberField.Input />
                  <NumberField.Increment>+</NumberField.Increment>
                </NumberField.Group>
              </NumberField.Root>
              <NumberField.Root>
                <NumberField.ScrubArea>
                  <label>Level eind</label>
                  <NumberField.ScrubAreaCursor />
                </NumberField.ScrubArea>
                <NumberField.Group>
                  <NumberField.Decrement>-</NumberField.Decrement>
                  <NumberField.Input />
                  <NumberField.Increment>+</NumberField.Increment>
                </NumberField.Group>
              </NumberField.Root>
              <br />
              <Select
                style={{ width: "200px" }}
                label="Perspectief"
                id="perspective selector"
              >
                {Object.values(this.state.data[0]).map((element) => (
                  <MenuItem
                    key={element.Perspective_ID}
                    value={element.Perspective_ID}
                  >
                    {element.Perspective_name}
                  </MenuItem>
                ))}
              </Select>

              <div></div>

              <br />
              <Button type="submit" variant="contained" color="primary">
                Voeg toe
              </Button>
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
