import React from 'react'
import "./Modal.css"
import { useState } from 'react'
const intialstate={
  page:"",
  description:"",
  status :"live"
}

const Modal = ({closeModal,onSubmit,defaultValue}) => {
  const [formState,SetFormState]=useState(defaultValue || intialstate);
  const handleChange=(e)=>{
    SetFormState({
      ...formState,
      [e.target.name]:e.target.value
    })
  }
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.page && formState.description && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };
  const hadleSubmit=(e)=>{
    e.preventDefault();
    if(!validateForm()) return;
    onSubmit(formState);
    closeModal();
  }
  return (
    <div
    className="modal-container"
    onClick={(e) => {
      if (e.target.className === "modal-container") closeModal();
    }}
  >
        <div className="modal">  
        <form>
            <div className="form-group">
                <label htmlFor="page">Page</label>
                <input name="page" value ={formState.page} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name="description" value ={formState.description} on onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select name="status" value ={formState.status} on onChange={handleChange}>
                    <option value="live">Live</option>
                    <option value="draft">Draft</option>
                    <option value="error">Error</option>
                </select>
                {errors && <div className="error">{`Please include: ${errors}`}</div>}
            </div>
            <button type="submit" onClick={hadleSubmit}>Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Modal