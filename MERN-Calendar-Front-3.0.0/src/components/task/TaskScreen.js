import React, { useState, useEffect } from 'react';
import { taskStartLoading, taskStartAddNew, taskStartUpdate, taskClearActivetask } from '../../actions/task';
import { useSelector, useDispatch } from 'react-redux';

const TaskScreen = () => {

    const [task, settask] = useState();
    /* useEffect para recibir datos de los task */
    useEffect(() => {
      const fetchData = async () => {
        const data = await taskStartLoading();
        for (let i = 0; i < data.length; i++) {
            console.log(`${i} title:${data[i].title}, id objeto:${data[i].id}`)
          }
        settask(data);
      }
      fetchData()
    }, [])

  return (
    <div>{}</div>
  )
}

export default TaskScreen