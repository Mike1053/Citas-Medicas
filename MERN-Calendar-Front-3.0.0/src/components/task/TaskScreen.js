import React, { useState, useEffect } from 'react';
import { taskStartLoading, taskStartAddNew, taskStartUpdate, taskClearActivetask } from '../../actions/task';
import { useSelector, useDispatch } from 'react-redux';

const TaskScreen = () => {
    const [task, setTask] = useState();
    /* useEffect para recibir datos de los task */

    const fetchData = async () => {
      const data = await taskStartLoading()
      .then(data =>{
        setTask(data)
        console.log(task)
      })
      
    }

    useEffect(() => {
      
      fetchData();
    }, []) 

    const elDiv = async () => {
      const datos = await (task.map(function(element){
        //console.log(element)
        /* return(
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
        )  */
        }))
    }

  return (
    <div>
      {/*elDiv()*/}
    <button onClick={elDiv}>picale</button>
    </div>
  )
}

export default TaskScreen