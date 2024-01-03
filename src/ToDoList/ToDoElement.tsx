import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faTriangleExclamation,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface ToDoElementProps {
  label: {
    label: string;
    priority: string;
    setRemainder: boolean;
    dateAndTime: string;
  }[];
  deleteFunction: (item: string) => void;
}

export default class ToDoElement extends Component<ToDoElementProps> {
  render() {
    console.log(this.props.label);
    return (
      <>
        {this.props.label.map((item: any) => {
          let dt = new Date(item.dateAndTime).toLocaleDateString();
          // let mt = new Date(item.dateAndTime).get() + 1;
          return (
            <>
              {" "}
              <section id="to-do-element">
                <span className="date-to-do">{dt.toString()}</span>
                <span className="to-do-text">{item.label}</span>
                <span className="priority-to-go">{item.priority}</span>
                <span className="date-to-do">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </span>
                <span
                  className="delete-to-do"
                  onClick={() => this.props.deleteFunction(item)}
                >
                  {" "}
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              </section>
            </>
          );
        })}{" "}
      </>
    );
  }
}
