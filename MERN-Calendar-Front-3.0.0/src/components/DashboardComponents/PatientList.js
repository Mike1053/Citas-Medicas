import React, { useState, useEffect } from 'react';
import { patientStartLoading } from '../../actions/patients';
import "./PatienList.css"; /*CSS de pacientes*/

const PatientList = () => {

  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await patientStartLoading();
      setPatients(data)
      console.log(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {patients.map(function(element, index){
        return(
          <div key={element.id}>
          <tbody>
          <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo Electronico</th>
          </tr>
          <tr>
              <td>{index}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
          </tr>
          </tbody>
          </div>
        )
        })}
    </div>
  )
}

export default PatientList