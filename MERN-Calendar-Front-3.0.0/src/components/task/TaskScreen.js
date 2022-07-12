import React, { useState, useEffect } from 'react';
import { taskStartLoading, taskStartAddNew, taskStartUpdate, taskClearActivetask } from '../../actions/task';
import { useSelector, useDispatch } from 'react-redux';

const TaskScreen = () => {
    const [task, setTask] = useState([]);
    /* useEffect para recibir datos de los task */

    const fetchData = async () => {
      const data = await taskStartLoading()
      setTask(data)
    }

    useEffect(() => {
      fetchData();
    }, []) 

  return (
    <div>
      {task.map(function(element){
        //console.log(element)
        return(
          <div>
          <table>
          <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Descripción</th>
          </tr>
          <tr>
              <td>{element.id}</td>
              <td>{element.title}</td>
              <td>{element.description}</td>
          </tr>
          </table>
          </div>
        )
        })}
    </div>
  )
}

export default TaskScreen