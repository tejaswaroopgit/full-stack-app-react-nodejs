import Modal from "react-modal";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faTriangleExclamation,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface ToDoModalProps {
  closeModal: () => void;
  openModal: boolean;
  getinfoFromModal: (val: any) => void;
}

interface toDoModalState {
  toDoObject: {
    label: string;
    priority: string;
    setRemainder: boolean;
    dateAndTime: string;
  };
}

export default class ToDoModal extends Component<
  ToDoModalProps,
  toDoModalState
> {
  constructor(props: ToDoModalProps) {
    super(props);
    this.state = {
      toDoObject: {
        label: "",
        priority: "",
        dateAndTime: "",
        setRemainder: false,
      },
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  saveData = (e): void => {
    let val = this.state.toDoObject;
    const element = e.target.name;
    val[element] = e.target.value;
    const isValid = this.checkStateObjIsEmpty();
    if (isValid) {
      console.log("setting state   " + isValid);
      this.setState({ toDoObject: val });
    }
  };

  submit = () => {
    if (this.checkStateObjIsEmpty()) {
      this.props.getinfoFromModal(this.state.toDoObject);
      this.closeModal();
    }
  };

  checkStateObjIsEmpty = (): boolean => {
    const values = Object.values(this.state.toDoObject);
    for (let val in values) {
      if (values[val] == "") {
        return false;
      }
    }
    console.log("entering  the checkStateObj");
    return true;
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.openModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
        >
          <div className="container-fluid">
            <section>
              <header className="modal-header">
                <h3>Description</h3>
                <button className="closeIcon rounded" onClick={this.closeModal}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </header>
              <section className="row"></section>
              <footer></footer>
            </section>

            <section>
              <textarea
                name="label"
                onChange={(e) => this.saveData(e)}
                className="addInfo priority-form-controls"
                id=""
              ></textarea>
              <p>
                <label htmlFor="">Priority level: </label>
                <select
                  name="priority"
                  className="priority-form-controls"
                  onChange={(e) => this.saveData(e)}
                >
                  <option value="low">Low</option>
                  <option value="med">Medium</option>
                  <option value="high">High</option>
                </select>
              </p>
              <p>
                <label htmlFor="">Date and Time</label>
                <input
                  type="datetime-local"
                  name="dateAndTime"
                  className="priority-form-controls"
                  onChange={(e) => this.saveData(e)}
                />
              </p>
              <p>
                Set Remainder:{" "}
                <input
                  type="checkbox"
                  name="setRemainder"
                  onChange={(e) => this.saveData(e)}
                />
              </p>
            </section>
            <footer className="modal-footer">
              <button
                className="btn btn-primary"
                disabled={!this.checkStateObjIsEmpty()}
                onClick={this.submit}
              >
                Done
              </button>
            </footer>
          </div>
        </Modal>
      </div>
    );
  }
}
