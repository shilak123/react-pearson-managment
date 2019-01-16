import React, { Component } from "react";
import  PearsonUser  from "../PearsonUser/PearsonUser";
import  "../../assets/css/Pearson.css";
import {URL} from "../../constants/URL";
import axios from 'axios';

export class PearsonUsers extends Component {

  /**
   * Initialize state
   * 
   */
  constructor(props) {
    super(props);

    this.state = {
        isLoading:true,
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ],
      error:null

    };
  }
/**
 * To Get the users in state and add on response
 * Excute remove duplicate users from state
 */
fetchUsers() {
  axios.get(URL)
    .then(response =>
      {     
       let users = [...this.state.users, ...response.data.data];
       users = this.removeDuplicates(users,'id');
       this.setState({
        users: users,
        isLoading: false,
      });
    }
    )
    .catch(error => this.setState({ error, isLoading: false }));
}

 /**
 *  Making API call to get users
 * 
 */
  componentDidMount() {
    this.fetchUsers();
  }

 /**
 *  Confirm alert box to Delete the user by id
 *  it it returns true excute deleteUser
 * 
 */
  deleteUserfn = (id) =>{
     if (window.confirm('Are you sure you wish to delete this item?'))
     this.deleteUser(id);
  }

/**
 *  Delete user by passing id
 *  return updated state
 * 
 */
  deleteUser = (id) =>{

    let users = this.state.users.filter((user) => {
        return id !== user.id;
    });

    this.setState(state => {
        state.users = users;
        return state;
    });
}
/**
 *  Remove duplicate users from  state
 *  by matching id
 */
  removeDuplicates = (users,id) => {
    return users.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[id]).indexOf(obj[id]) === pos;
  });
  }

/**
 *  Render the element and pass props to child component.
 * 
 */
  render() {
    const { isLoading, users, error } = this.state;
      const userList = users.map(user => {
        return <PearsonUser
        user={user}
        key={user.id}
        deleteUser={() => this.deleteUserfn(user.id)}/>
      })
    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
        <div className="flex-container">
      {error ? <p>{error.message}</p> : null}
      {!isLoading ? userList :  (
        <h3>Loading...</h3>
      )}
      </div>
      </div>
    );
  }
}
