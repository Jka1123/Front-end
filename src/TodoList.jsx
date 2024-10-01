import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
const [date, setDate] = useState ("");
const [priority, setPriority] = useState("");
const gridRef = useRef();

const addTodo = () => {
    setTodos([...todos, {date, desc, priority}]);
    setDate("");
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


    return(
        <>
            <Stack 
                mt = {2}
                direction = "row"
                spacing = {2}
                justifyContent = "center"
                alignItems = "center"
                >
                <TextField placeholder = "Date" 
                onChange = {e => setDate(e.target.value)} 
                value = {date} />
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
        </>
    );
}

export default TodoList;