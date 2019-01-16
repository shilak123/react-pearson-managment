import React from 'react';

/**
 * Render various fields of user in UI
 */
const PearsonUser = (props) => {
     const { first_name, last_name, avatar } = props.user;

     return (
          <div className="wrapper">
               <img className="avatar" src={avatar} alt={first_name} />
               <div className="title">{first_name} {last_name}</div>
               <div className="delete" onClick={props.deleteUser}>Delete</div>
          </div>
     );


}


export default PearsonUser;
