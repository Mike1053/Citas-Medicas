import React, { useState, useEffect } from 'react';
import { taskStartLoading, taskStartAddNew, taskStartUpdate, taskClearActivetask, taskSetActive, taskStartDelete } from '../../actions/task';
import { useSelector, useDispatch } from 'react-redux';
import TaskUpload from './taskUpload';
import { uiOpenModal } from '../../actions/ui';

import { officeStartLoading } from '../../actions/office';

const TaskScreen = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState([]);
    /* useEffect para recibir datos de los task */

    const fetchData = async () => {
      const data = await taskStartLoading()
      const data2 = await officeStartLoading()
      console.log(data2)
      setTask(data)
    }

    useEffect(() => {
      fetchData();
    }, [dispatch]) 

    const onDoubleClick = (e) => {
      // console.log(e);
      dispatch( uiOpenModal() );
  }

  const onSelectTaskEdit = (e) => {
    dispatch( taskSetActive( e ) );
    dispatch( uiOpenModal() );
}

const onSelectTaskDelete = (e) => {
  dispatch( taskSetActive( e ) );
  dispatch( taskStartDelete() );
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
                <button type="button" onClick={() =>{onSelectTaskEdit(element)}}>editar</button>
              </td>
              <td>
                <button type="button" onClick={() =>{onSelectTaskDelete(element)}}>eliminar</button>
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