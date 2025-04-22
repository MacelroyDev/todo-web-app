"use client"
import {useState} from 'react';
import TodoItem from './todoItem';



function TodoList( {items, onDeleteItem} ) {

    let itemsCopy = [...items]

    const [sortBy, setSortBy] = useState("text");

    itemsCopy.sort((a, b) => {
        const nameA = a[sortBy];
        const nameB = b[sortBy];
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });


    return(
        <div>
            <ul>
                {itemsCopy.map((item, index) => (
                    <TodoItem key={item.id} id={item.id} text={item.text} completed={item.isComplete} onDeleteItem={onDeleteItem}/>
                ))}
            </ul>
        </div>
    );


}


export default TodoList;