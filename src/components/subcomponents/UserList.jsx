 import React, { Component } from 'react';
 
 import User from './User.jsx';

 class UserList extends Component {

    handleDelete = user => {
        const userToDelete = this.props.users.filter(item => item === user);
        this.props.onDelete(...userToDelete);
    }

    handleDeleteList = () => {
        this.props.onDeleteList();
    }

    render() {
        const users = (this.props.users).map((user, i) => {
            return <User userData={user}
                whichUser={user}
                onDelete={this.handleDelete}
                key={i} />
        });
        return (
            <div className="section users">
                <header className="users__header">
                    <h2 className="section__header">User list:</h2>
                    <button className="button button_text" onClick={this.handleDeleteList}>Delete list</button>
                </header>
                
                <ul className="users__record-list">
                    {users}
                </ul>
                
            </div>

        );
    }
 }

 export default UserList;