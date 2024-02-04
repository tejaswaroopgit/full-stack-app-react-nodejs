import React, { useEffect, useState } from "react";

const formInitialState = {
  label: "",
  priority: "Low",
  setRemainder: false,
  dateAndTime: Date.now(),
  id: Date.now(),
};

interface toDoFormProps {
  onChange: (e) => void;
  addToList: () => void;
  editData: formState;
  isUpdate: boolean;
}

interface formState {
  label: string;
  priority: string;
  setRemainder: boolean;
  dateAndTime: number;
  id: number;
  updatelist: () => void;
}

interface toogleForm {
  tootgleForm: boolean;
}

function ToDoForm({ onChange, addToList, editData, isUpdate }) {
  console.log(editData);
  const [formData, setformData] = useState<formState>(formInitialState);
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);
  console.log(formData);
  const [toogleForm, settoogleForm] = useState<toogleForm>({
    tootgleForm: false,
  });

  useEffect(() => {
    setformData(editData);
    setIsUpdateForm(isUpdate);
  }, [editData, isUpdate]);

  const onSubmit = () => {
    //replace with parent component props
    console.log(formData);
    addToList(formData);
    //onsubmit empty the state...
    setformData(formInitialState);
  };

  const saveData = (e) => {
    // save data to state on user input
    const data = { ...formData };
    const ele = e.target.name;
    data[ele] = e.target.value;
    setformData(data);
  };

  return (
    <div>
      <div className="to-do-container">
        <div className="container-fluid">
          <section className="row"></section>
          <footer></footer>
          <article className="form-container">
            {/*text area */}
            <div className="form-input">
              <textarea
                name="label"
                onChange={(e) => saveData(e)}
                className="addInfo priority-form-controls"
                id=""
                value={formData.label}
              ></textarea>
            </div>
            {/* select options */}
            <div className="form-elements">
              <p>
                <label htmlFor="">Priority level: </label>
                <select
                  name="priority"
                  className="priority-form-controls"
                  onChange={(e) => saveData(e)}
                  value={formData.priority}
                >
                  <option value="low">Low</option>
                  <option value="med">Medium</option>
                  <option value="high">High</option>
                </select>
              </p>
              {/* Date and time picker*/}
              <p>
                <label htmlFor="">Date and Time</label>
                <input
                  type="date"
                  name="dateAndTime"
                  className="priority-form-controls"
                  onChange={(e) => saveData(e)}
                  value={formData.dateAndTime}
                />
              </p>
              {/*remainder checkbox */}
              <p>
                Set Remainder:
                <input
                  type="checkbox"
                  name="setRemainder"
                  onChange={(e) => saveData(e)}
                  checked={formData.setRemainder}
                />
              </p>
              <button
                className="btn btn-primary"
                // disabled={!checkStateObjIsEmpty()}
                onClick={() => onSubmit()}
              >
                {isUpdateForm ? "Update" : "Done"}
              </button>
            </div>
          </article>
          {/* done button */}
          <footer className="modal-footer"></footer>
        </div>
      </div>
    </div>
  );
}

export default ToDoForm;
