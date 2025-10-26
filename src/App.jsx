import Table from './components/Table';
import './App.css';
import Modal from './components/Modal';
import { useState } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows,setRows] =useState( [
    {
      page: "page 1",
      description: "this is 1st page",
      status: "live",
    },
    {
      page: "page 2",
      description: "this is 2nd page",
      status: "draft",
    },
    {
      page: "page 3",
      description: "this is 3rd page",
      status: "error",
    },
  ]);
  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };
  const[rowtoedit,setRowToEdit]=useState(null);
  const handleSubmit = (newRow) => {
    rowtoedit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowtoedit) return currRow;

            return newRow;
          })
        );
  };


  const handleEditRow=(idx)=>{
    setRowToEdit(idx);
    setModalOpen(true);


  }
  
  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>

      {modalOpen && <Modal closeModal={() => setModalOpen(false)}  onSubmit={handleSubmit} defaultValue={rowtoedit!==null && rows[rowtoedit]}/>}
    </div>
  );
}

export default App;
