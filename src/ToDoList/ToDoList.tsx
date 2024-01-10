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
    dateAndTime: number;
    id: number;
  }[];
  toogleAddInfo: boolean;
  additionalInfo: string;
  openModal: boolean;
  modalEditData: any;
}

export default class ToDoList extends Component<toDoProps, toDoState> {
  constructor(props: toDoProps) {
    super(props);
    this.state = {
      value: "",
      list: [
        {
          label: "",
          priority: "High",
          dateAndTime: Date.now(),
          setRemainder: true,
          id: Math.random(),
        },
      ],
      toogleAddInfo: false,
      additionalInfo: "",
      openModal: false,
      modalEditData: {},
    };
  }

  openModal = () => {
    this.setState({ openModal: true });
  };

  onChange = (e: any) => {
    this.setState({ value: e.target.value });
  };

  addToList = () => {
    try {
      const newList: any = {
        label: this.state.value,
        priority: "low",
        setRemainder: "false",
        dateAndTime: Date.now(),
        id: Math.floor(Math.random() * 100),
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
    this.setState({ openModal: false });
  };

  addAdditionalInfo = async (e) => {
    if (e.target.checked) {
      const emptyToDoObj = {
        label: "",
        priority: "Low",
        setRemainder: false,
        dateAndTime: Date.now(),
        id: Math.floor(Math.random() * 100),
      };
      this.setState({
        modalEditData: emptyToDoObj,
        toogleAddInfo: e.target.checked,
      });
      this.openModal();
    }
  };

  updateValues = (val: any): toDoState["list"] => {
    console.log(val);

    const toDoObj = this.state.list;
    for (let i = 0; i < toDoObj.length; i++) {
      if (val.id == toDoObj[i].id) {
        console.log("entering successs condition");
        toDoObj[i].dateAndTime = val.dateAndTime;
        toDoObj[i].label = val.label;
        toDoObj[i].setRemainder = val.setRemainder;
        toDoObj[i].priority = val.priority;
        toDoObj[i].id = val.id;
        return toDoObj;
      }
    }
    toDoObj.push(val);
    this.setState({ list: toDoObj });
    return toDoObj;
  };

  getinfoFromModal = (val: any): void => {
    const value: any = this.updateValues(val);
    this.setState({ list: value });
    this.closeModal();
  };

  handleFilterPills = (element: any) => {
    if (element == "date") {
      return ".date-sorted active";
    } else {
      return ".priority-sorted active";
    }
  };

  launchEditModal = (val: any) => {
    this.setState({ modalEditData: val, openModal: true });
  };

  render() {
    return (
      <div className="container-fluid">
        {this.state.openModal ? (
          <ToDoModal
            closeModal={this.closeModal}
            openModal={this.state.openModal}
            getinfoFromModal={this.getinfoFromModal}
            modalEditData={this.state.modalEditData}
          />
        ) : null}

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
        <section
          data-id="quick-actions-section"
          className="quick-actions-section"
        >
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => this.handleFilterPills("date")}
              >
                Date
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => this.handleFilterPills("priority")}
            >
              <a className="nav-link" aria-current="page" href="#">
                Priority
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                All Filters
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Date
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Priority
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Over Due
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Flagged
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <ToDoElement
            closeModal={this.closeModal}
            getinfoFromModal={() => this.getinfoFromModal}
            launchEditModal={this.launchEditModal}
            label={this.state.list}
            deleteFunction={this.deleteItem}
            openModal={false}
            modalEditData={this.state.modalEditData}
          />
        </section>
      </div>
    );
  }
}
