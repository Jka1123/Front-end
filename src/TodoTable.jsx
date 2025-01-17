import React from "react";

function TodoTable(props) {
    return <>
    <table>
        <tbody>
            {props.todos.map((todo, index) => (
            <tr key={index}>
                <td>{todo.date}</td>
                <td>{todo.desc}</td>
                <td>{todo.priority}</td>
                <td>
                    <button onClick = {() => props.removeTodo(index)}>Delete</button>
                </td>

            </tr>
            ))}
        </tbody>
    </table>
    </>;
}

export default TodoTable;