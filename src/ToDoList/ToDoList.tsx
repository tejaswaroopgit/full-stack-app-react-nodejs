import React, { Component } from "react";
import "./ToDoList.scss";
import "./modals.scss";
import ToDoElement from "./ToDoElement.tsx";
import ToDoForm from "./ToDoForm.tsx";
import ToDoSort from "./ToDoSort.tsx";

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
  editToDo: any;
  isToDoUpdate: boolean;
}

export default class ToDoList extends Component<toDoProps, toDoState> {
  getinfoFromModal: void;
  constructor(props: toDoProps) {
    console.log("constructor initializing");
    super(props);
    this.state = {
      value: "",
      list: [
        {
          label: "",
          priority: "High",
          dateAndTime: Date.now(),
          setRemainder: true,
          id: Date.now(),
        },
      ],
      toogleAddInfo: false,
      isToDoUpdate: false,
      additionalInfo: "",
      openModal: false,
      modalEditData: {},
      editToDo: {
        label: "",
        priority: "High",
        dateAndTime: Date.now(),
        setRemainder: true,
        id: Date.now(),
      },
    };
  }

  openModal = () => {
    this.setState({ openModal: true });
  };

  onChange = (e: any) => {
    this.setState({ value: e.target.value });
  };

  addToList = (data) => {
    if (this.state.isToDoUpdate) {
      console.log("inside the update..");
      this.updateList(data);
      return;
    }
    const toDoList = this.state.list;
    toDoList.push(data);
    this.setState({ list: toDoList });
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

  updateList = (val: any): void => {
    const value: any = this.updateValues(val);
    const formInitialState = {
      label: "",
      priority: "Low",
      setRemainder: false,
      dateAndTime: Date.now(),
      id: Date.now(),
    };
    this.setState({
      list: value,
      isToDoUpdate: false,
      editToDo: formInitialState,
    });
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

  sortByType = (req: string): void => {
    const unsortedlist: any = this.state.list;
    let sortedList;

    for (let i = 0; i < unsortedlist.length; i++) {
      for (let j = 0; j < unsortedlist.length - 1; j++) {
        if (unsortedlist[i].req < unsortedlist[j].req) {
          const temp = unsortedlist[i];
          unsortedlist[i] = unsortedlist[j];
          unsortedlist[j] = temp;
        }
      }
      console.log("unsortedlist" + req);
      console.log(unsortedlist);
    }
    this.setState({ list: unsortedlist });
  };

  getEditData = (editToDo) => {
    console.log(editToDo);
    this.setState({ editToDo: editToDo, isToDoUpdate: true });
  };

  render() {
    return (
      <div className="container-fluid">
        <ToDoForm
          onChange={this.onChange}
          addToList={this.addToList}
          editData={this.state.editToDo}
          isUpdate={this.state.isToDoUpdate}
        />
        <ToDoSort />
        <ToDoElement
          closeModal={this.closeModal}
          getinfoFromModal={() => this.getinfoFromModal}
          launchEditModal={this.launchEditModal}
          label={this.state.list}
          deleteFunction={this.deleteItem}
          openModal={false}
          modalEditData={this.state.modalEditData}
          getEditData={this.getEditData}
        />
      </div>
    );
  }
}
