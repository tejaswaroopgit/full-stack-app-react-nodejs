import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faTriangleExclamation,
  faCircleCheck,
  faCircleXmark,
  faTrashCan,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import ToDoModal from "./ToDoModal.tsx";

interface ToDoElementProps {
  closeModal: () => void;
  openModal: boolean;
  getinfoFromModal: () => void;
  label: {
    label: string;
    priority: string;
    setRemainder: boolean;
    dateAndTime: number;
    id: number;
  }[];
  deleteFunction: (item: string) => void;
  launchEditModal: (param: any) => void;
  modalEditData: any;
  getEditData: (val: any) => void;
}
interface toDoElementState {
  openModal: boolean;
}

export default class ToDoElement extends Component<
  ToDoElementProps,
  toDoElementState
> {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };
  }

  editToDo = (val: any) => {
    this.props.launchEditModal(val);
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  openEditModal = () => {
    this.props.launchEditModal(this.props.label);
  };
  getEditData = (item) => {
    console.log("onclick to do element");
    this.props.getEditData(item);
  };

  render() {
    return (
      <>
        {this.props.label.map((item: any) => {
          let dt = new Date(item.dateAndTime).toLocaleDateString();
          // let mt = new Date(item.dateAndTime).get() + 1;
          return (
            <>
              {" "}
              <section id="to-do-element" key={item.label}>
                <span className="date-to-do">{dt.toString()}</span>
                <span className="to-do-text">{item.label}</span>
                <span className="priority-to-go">{item.priority}</span>
                <button
                  className="edit-to-do"
                  onClick={() => this.getEditData(item)}
                >
                  <FontAwesomeIcon icon={faFilePen} />
                </button>
                <span className="date-to-do">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </span>
                <span
                  className="delete-to-do"
                  onClick={() => this.props.deleteFunction(item)}
                >
                  {" "}
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </section>
            </>
          );
        })}{" "}
      </>
    );
  }
}
