import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() {

  const[payer, setPayer] = useState("");
  const[payee, setPayee] = useState("");
  const[event, setEvent] = useState("");
  const[date, setDate] = useState("");
  const[amount, setAmount] = useState(0);

  const[newPayer, setNewPayer] = useState("");

  const [entryList, setEntryList] = useState([]);


  const displayInfo = () => {
    console.log(payer + payee + event + date + amount);
  };

  const addEntry = () => {
    Axios.post('http://localhost:3001/create', {
      payer: payer, 
      payee: payee,
      event: event,
      date: date,
      amount: amount
    }).then(() => {
      setEntryList([...entryList, {
        payer: payer, 
        payee: payee,
        event: event,
        date: date,
        amount: amount
      }])
    });
  };

  // const updateEntryPayer = (id) => {
  //   Axios.put('http://localhost:3001/entries', {payer: newPayer, id: id}).then((response)=> {
  //     alert("update");
  //   })
    
  // }



  const getEntries = () => {
    Axios.get('http://localhost:3001/entries').then((response) => {
      setEntryList(response.data)
    });
  }

  const deleteEntry = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEntryList(
        entryList.filter((val) => {
          return val.id != id;
        })
      )
    })
  };

  return (
    <div className="App">
      <div className="information">
        <label>Payer:</label>
        <input type="text" onChange={(event)=> {
            setPayer(event.target.value);
          }} 
        />
        <label>Payee:</label>
        <input type="text" onChange={(event)=> {
            setPayee(event.target.value);
          }} 
        />
        <label>Event:</label>
        <input type="text" onChange={(event)=> {
            setEvent(event.target.value);
          }} 
        />
        <label>Date(mm/dd/yy):</label>
        <input type="text" onChange={(event)=> {
            setDate(event.target.value);
          }} 
        />
        <label>Amount owed:</label>
        <input type="number" onChange={(event)=> {
            setAmount(event.target.value);
          }} 
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>
  
      <div className="entries">
        <button onClick={getEntries}>Show Entries</button>

        {entryList.map((val, key) => {
          return <div className="entry" key={key}>
            <div>
            <h3>Payer: {val.payer}</h3>
            <h3>Payee: {val.payee}</h3>
            <h3>Event: {val.event}</h3>
            <h3>Date: {val.date}</h3>
            <h3>Amount Owed: ${val.amount}</h3>
            </div>
            <div>
              {/* <input type="text" placeholder="Edmond..." onChange={(event)=> {
                setNewPayer(event.target.value);
          }} />
              <button onClick={()=>{updateEntryPayer(val.id)}}>Update</button> */}
              <button onClick={() => {deleteEntry(val.id)}}>Delete</button>
            </div>
            </div>
        })}
      </div>
    </div>
  );
}

export default App;
