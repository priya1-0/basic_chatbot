import ReactDOM from "react-dom";
import "./styles.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      yearofgrad: "",
      cgpa:"",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, yearofgrad, cgpa} = steps;

    this.setState({ name, gender, yearofgrad, cgpa});
  }

  render() {
    const { name, gender, yearofgrad, cgpa } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Year Of graduation</td>
              <td>{yearofgrad.value}</td>
            </tr>
            <tr>
              <td>CGPA</td>
              <td>{cgpa.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object
};

Review.defaultProps = {
  steps: undefined
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: "1",
            message: "What is your name?",
            trigger: "name"
          },
          {
            id: "name",
            user: true,
            trigger: "3"
          },
          {
            id: "3",
            message: "Hi {previousValue}! What is your gender?",
            trigger: "gender"
          },
          {
            id: "gender",
            options: [
              { value: "male", label: "Male", trigger: "5" },
              { value: "female", label: "Female", trigger: "5" }
            ]
          },
          {
            id: "5",
            message: "What is your year of graduation?",
            trigger: "yearofgrad"
          },
          {
            id: "yearofgrad",
            user: true,
            trigger: "7",
            validator: value => {
              if (isNaN(value)) {
                return "value must be a number";
              
              } else if (value > 2024) {
                return `${value}? Try for different role!`;
              }

              return true;
            }
          },
          {
            id: "7",
            message: "What is your CGPA?",
            trigger: "cgpa"
          },
          {
            id: "cgpa",
            user: true,
            trigger: "9",
            validator: value => {
              if (isNaN(value)) {
                return "value must be a number";
              
              } else if (value < 60) {
                return `${value}? Try for different role!`;
              }

              return true;
            }
          },
          {
            id: "9",
            message: "Great! Check out your summary",
            trigger: "review"
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "update"
          },
          {
            id: "update",
            message: "Would you like to update some field?",
            trigger: "update-question"
          },
          {
            id: "update-question",
            options: [
              { value: "yes", label: "Yes", trigger: "update-yes" },
              { value: "no", label: "No", trigger: "end-message" }
            ]
          },
          {
            id: "update-yes",
            message: "What field would you like to update?",
            trigger: "update-fields"
          },
          {
            id: "update-fields",
            options: [
              { value: "name", label: "Name", trigger: "update-name" },
              { value: "gender", label: "Gender", trigger: "update-gender" },
              { value: "yearofgrad", label: "Gradyear", trigger: "update-yearofgrad" },
              { value: "cgpa", label: "CGPA", trigger: "update-cgpa" }
            ]
          },
          {
            id: "update-name",
            update: "name",
            trigger: "9"
          },
          {
            id: "update-gender",
            update: "gender",
            trigger: "9"
          },
          {
            id: "update-yearofgrad",
            update: "yearofgrad",
            trigger: "9"
          },
          {
            id: "update-cgpa",
            update: "cgpa",
            trigger: "9"
          },
          {
            id: "end-message",
            message: "Thanks! Your data was submitted successfully!. Our team will reach back",
            end: true
          }
        ]}
      />
    );
  }
}

export default SimpleForm;

const rootElement = document.getElementById("root");
ReactDOM.render(<SimpleForm />, rootElement);
