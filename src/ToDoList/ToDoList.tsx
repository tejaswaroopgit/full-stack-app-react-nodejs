import React, { Component } from "react";
import "./ToDoList.scss";
import ToDoModal from "./ToDoModal.tsx";
import "./modals.scss";
import ToDoElement from "./ToDoElement.tsx";

interface toDoProps {}
interface toDoState {
  value: "";
  list: {
    label: string;
    priority: string;
    setRemainder: boolean;
    dateAndTime: string;
  }[];
  toogleAddInfo: boolean;
  additionalInfo: string;
  openModal: boolean;
}

export default class ToDoList extends Component<toDoProps, toDoState> {
  constructor(props: toDoProps) {
    super(props);
    this.state = {
      value: "",
      list: [
        {
          label: "",
          priority: "",
          dateAndTime: "",
          setRemainder: false,
        },
      ],
      toogleAddInfo: false,
      additionalInfo: "",
      openModal: false,
    };
  }

  openModal = () => {
    this.setState({ openModal: true });
    console.log("entered the open modal");
  };

  onChange = (e: any) => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  addToList = () => {
    try {
      const newList: any = {
        label: this.state.value,
        priority: "low",
        setRemainder: "false",
        dateAndTime: Date.now(),
      };
      console.log(newList);
      let finalValue = this.state.list;
      finalValue.push(newList);
      this.setState({ list: finalValue });
    } catch (error) {
      alert("error saving data" + error);
    }
  };

  deleteItem = (item: String): void => {
    const list: any = this.state.list;
    const positionOfElement = list.lastIndexOf(item);
    list.splice(positionOfElement, 1);
    this.setState({ list });
  };

  closeModal = () => {
    console.log("opened the close modal function");
    this.setState({ openModal: false });
  };

  addAdditionalInfo = (e) => {
    this.setState({ toogleAddInfo: e.target.checked });
    if (e.target.checked) this.openModal();
  };

  getinfoFromModal = (val: any): void => {
    const value = this.state.list;
    value.push(val);
    this.setState({ list: value });
  };

  render() {
    return (
      <div className="container-fluid">
        <ToDoModal
          closeModal={this.closeModal}
          openModal={this.state.openModal}
          getinfoFromModal={this.getinfoFromModal}
        />
        <div>
          <div className="to-do-container">
            <div className="inputToDo">
              <input
                id="enterToDo"
                type="text"
                onChange={this.onChange}
                className="enterToDo form-control"
                placeholder="Add to do list items"
              />
              <button
                className="btn btn-primary labelText"
                onClick={this.addToList}
              >
                Submit
              </button>
            </div>
            <input
              type="checkbox"
              className=""
              onChange={(e) => this.addAdditionalInfo(e)}
            />{" "}
            <label htmlFor="">Add aditional information</label>
          </div>
        </div>
        {/* <section data-id="quick-actions-section">
          <div>
            quick actions:
          </div>
          <div className="">
            <div className="quick-actions">
              <div>date</div>
              <div>priority</div>
              <div>time</div>
            </div>
          </div>
        </section> */}
        <section>
          <ToDoElement
            label={this.state.list}
            deleteFunction={this.deleteItem}
          />
        </section>
      </div>
    );
  }
}
