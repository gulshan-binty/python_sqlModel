import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ComposedChart } from 'recharts';

function App() {
  const [dataList, setDataList] = useState([]);
  const [newData, setNewData] = useState({
    date: '',
    trade_code: '',
    close: '',
    low: '',
    high: '',
    open: '',
    volume: ''
  });
  const [selectedTradeCode, setSelectedTradeCode] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response =>{
         setDataList(response.data)
         console.log(response.data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleAddData = () => {
    axios.post('http://localhost:5000/api/data', newData)
      .then(response => setDataList([...dataList, response.data]))
      .catch(error => console.error('Error adding data:', error));
  };

  const handleEditData = (id, field, value) => {
    const updatedData = dataList.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setDataList(updatedData);
  };

  const handleSaveEdit = (id) => {
    const updatedItem = dataList.find(item => item.id === id);
    axios.put(`http://localhost:5000/api/data/${id}`, updatedItem)
      .then(response => {
        setDataList(dataList.map(item => (item.id === id ? response.data : item)));
      })
      .catch(error => console.error('Error updating data:', error));
  };

  const handleDeleteData = (id) => {
    axios.delete(`http://localhost:5000/api/data/${id}`)
      .then(() => {
        const filteredList = dataList.filter(item => item.id !== id);
        setDataList(filteredList);
      })
      .catch(error => console.error('Error deleting data:', error));
  };
  const filteredData = selectedTradeCode
    ? dataList.filter(item => item.trade_code === selectedTradeCode)
    : dataList;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data from Backend</h1>
               <div>
          <label htmlFor="tradeCodeSelect">Select Trade Code: </label>
          <select
            id="tradeCodeSelect"
            value={selectedTradeCode}
            onChange={e => setSelectedTradeCode(e.target.value)}
          >
            <option value="">All</option>
            {Array.from(new Set(dataList.map(item => item.trade_code))).map(code => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
                <ComposedChart width={800} height={400} data={filteredData}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="close" stroke="#8884d8" />
          <Bar yAxisId="right" dataKey="volume" fill="#82ca9d" />
        </ComposedChart>
        <div>
          <input
            type="text"
            name="date"
            placeholder="Date"
            value={newData.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="trade_code"
            placeholder="Trade Code"
            value={newData.trade_code}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="close"
            placeholder="Close"
            value={newData.close}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="low"
            placeholder="Low"
            value={newData.low}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="high"
            placeholder="High"
            value={newData.high}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="open"
            placeholder="Open"
            value={newData.open}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="volume"
            placeholder="Volume"
            value={newData.volume}
            onChange={handleInputChange}
          />
          <button onClick={handleAddData}>Add Data</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Trade Code</th>
               <th>High</th>
             
              <th>Low</th>
              <th>High</th>
              <th>Open</th>
               <th>Close</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item.id}>
                <td contentEditable onBlur={(e) => handleEditData(item.id, 'date', e.target.innerText)}>{item.date}</td>
                <td contentEditable onBlur={(e) => handleEditData(item.id, 'trade_code', e.target.innerText)}>{item.trade_code}</td>
                <td contentEditable onBlur={(e) => handleEditData(item.id, 'close', e.target.innerText)}>{item.close}</td>
                                <td contentEditable onBlur={(e) => handleEditData(item.id, 'high', e.target.innerText)}>{item.high}</td>
                <td contentEditable onBlur={(e) => handleEditData(item.id, 'low', e.target.innerText)}>{item.low}</td>

                <td contentEditable onBlur={(e) => handleEditData(item.id, 'open', e.target.innerText)}>{item.open}</td>
                                <td contentEditable onBlur={(e) => handleEditData(item.id, 'close', e.target.innerText)}>{item.close}</td>
                <td contentEditable onBlur={(e) => handleEditData(item.id, 'volume', e.target.innerText)}>{item.volume}</td>
                <td>
                  <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                  <button onClick={() => handleDeleteData(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
