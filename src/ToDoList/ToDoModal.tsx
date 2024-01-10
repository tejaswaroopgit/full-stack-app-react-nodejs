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
  modalEditData: any;
}

interface toDoModalState {
  toDoObject: {
    label: string;
    priority: string;
    setRemainder: boolean;
    dateAndTime: string;
    id: number;
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
        label: props.modalEditData.label,
        priority: props.modalEditData.priority,
        dateAndTime: props.modalEditData.dateAndTime,
        setRemainder: false,
        id: props.modalEditData.id,
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
    this.setState({ toDoObject: val });
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
      if (values[val] == "" || values[val] == "off") {
        return false;
      }
    }
    return true;
  };

  render() {
    console.log("props  modal");
    console.log(this.props);
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
                value={this.state.toDoObject.label}
              ></textarea>
              <p>
                <label htmlFor="">Priority level: </label>
                <select
                  name="priority"
                  className="priority-form-controls"
                  onChange={(e) => this.saveData(e)}
                  value={this.state.toDoObject.priority}
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
                  value={this.state.toDoObject.dateAndTime}
                />
              </p>
              <p>
                Set Remainder:{" "}
                <input
                  type="checkbox"
                  name="setRemainder"
                  onChange={(e) => this.saveData(e)}
                  checked={this.state.toDoObject.setRemainder}
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
