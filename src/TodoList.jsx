import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

function TodoList() {


const [columnDefs, setColumnDefs] = useState([
    {
        field: 'date',
        header: 'Date',
        filter: true,
        floatingFilter: true,
    },
    {
        field: 'desc',
        header: 'Description',
        filter: true,
        floatingFilter: true,
    },
    {
        field: 'priority',
        header: 'Priority',
        filter: true,
        floatingFilter: true,
    },
]);

const [desc,setDesc] = useState("");
const [todos, setTodos] = useState ([]);
const [date, setDate] = useState (null);
const [priority, setPriority] = useState("");
const gridRef = useRef();

const addTodo = () => {
    setTodos([...todos, {date: format(date, 'dd.MM.yyyy'), desc, priority}]);
    setDate(null);
    setDesc("");
    setPriority("");

};

const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => 
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };

  const handleDate = (newDate) => {
    setDate(newDate);

  }


    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack 
                mt = {2}
                direction = "row"
                spacing = {2}
                justifyContent = "center"
                alignItems = "center"
                >
                <DatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date} 
                onChange = {handleDate}
                renderInput = {(params) => <TextField {...params} />}
                />
        
                <TextField placeholder = "Description" 
                onChange = {e => setDesc(e.target.value)} 
                value = {desc} />
                <TextField placeholder = "Priority"
                onChange = {e => setPriority(e.target.value)}
                value = {priority} />

                <Button onClick = {addTodo}>Add</Button>
                <Button onClick = {handleDelete}>Delete</Button>
            </Stack>
            <div 
            className = "ag-theme-material" 
            style = {{width: 700, height: 500}}>
                <AgGridReact
                    ref = {gridRef}
                    onGridReady = {params => gridRef.current = params.api}
                    rowData = {todos}
                    columnDefs = {columnDefs}
                    rowSelection="single"
                    floatingFilter = {true}
                    animateRows = {true}
                    />
            </div>
        </LocalizationProvider>
    );
}

export default TodoList;