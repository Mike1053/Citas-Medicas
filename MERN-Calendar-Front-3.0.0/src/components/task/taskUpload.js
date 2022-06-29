import React, { useState, useEffect } from 'react';
import { taskStartLoading } from '../../actions/task';

const TaskUpload = () => {

    const [task, settask] = useState();
    /* useEffect para recibir datos de los task */
    useEffect(() => {
      const fetchData = async () => {
        const data = await taskStartLoading();
        settask(data)
      }
      fetchData()
    }, [])
    /* Final useEffect para recibir datos de los task */

  return (
    <div>{console.log(task)}</div>
  )
}

export default TaskUpload