import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { data } from './data';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const [list, setList] = useState(data);

  const onDragEnd = (result) => {
    const { destination, source, reason } = result;

    if (!destination || reason === 'CANCEL') {
      return;
    }

    if (
      destination.droppableId === source.droppableId ||
      destination.index === source.index
    ) {
      return;
    }

    const users = [...list];
    const droppedUser = list[source.index];
    users.splice(source.index, 1);
    users.splice(destination.index, 0, droppedUser);
    setList(users);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <UserList list={list} />
      </DragDropContext>
    </div>
  );
}

function UserList({ list }) {
  return (
    <>
      <h2 style={{ textIndent: '1.5em' }}>User List</h2>
      <ol style={{ listStyle: 'none', height: '600px' }}>
        <Droppable droppableId='dp1'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((each, index) => (
                <Draggable key={index+''} draggableId={index + ''} index={index}>
                  {(provided) => (
                    <div
                    key={index}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      {...provided.dragHandleProps}
                    >
                      <User index={index + 1} user={each} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ol>
    </>
  );
}

const User = ({ user, index }) => {
  return (
    <li
      style={{
        padding: '5px 10px',
        borderRadius: '4px',
        border: '1px solid grey',
        marginBottom: '0.5em',
        width: '12rem',
      }}
    >
      <div style={{ display: 'flex' }}>
        <h3 style={{ width: '12px', display: 'inline', marginRight: '1rem' }}>
          {' '}
          {index}{' '}
        </h3>
        <div>
          <p>{user.name}</p>
          <p>{user.age}</p>
        </div>
      </div>
    </li>
  );
};

export default App;
