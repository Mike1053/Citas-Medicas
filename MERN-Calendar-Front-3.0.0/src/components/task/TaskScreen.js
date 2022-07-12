import React, { useState, useEffect } from 'react';
import { taskStartLoading, taskStartAddNew, taskStartUpdate, taskClearActivetask, taskSetActive } from '../../actions/task';
import { useSelector, useDispatch } from 'react-redux';
import TaskUpload from './taskUpload';
import { uiOpenModal } from '../../actions/ui';

const TaskScreen = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState([]);
    /* useEffect para recibir datos de los task */

    const fetchData = async () => {
      const data = await taskStartLoading()
      setTask(data)
    }

    useEffect(() => {
      fetchData();
    }, []) 

    const onDoubleClick = (e) => {
      // console.log(e);
      dispatch( uiOpenModal() );
  }

  const onSelectEvent = (e) => {
    console.log(e);
    dispatch( taskSetActive( e ) );
}

  return (
    <div>
      {task.map(function(element, index){
        return(
          <div key={element.id}>
          <tbody>
          <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Descripción</th>
          </tr>
          <tr>
              <td>{index}</td>
              <td>{element.title}</td>
              <td>{element.description}</td>
              <td>
                <button type="button" onClick={() =>{onSelectEvent(element)}}>boton</button>
              </td>
          </tr>
          </tbody>
          </div>
        )
        })}
        <TaskUpload/>
        <button onClick={onDoubleClick}>Tarea nueva</button>
    </div>
  )
}

export default TaskScreen