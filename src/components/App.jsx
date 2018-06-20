import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { confirmAlert } from "react-confirm-alert";
import "./sass/main.scss";

import UserList from "./subcomponents/UserList.jsx";
import FormContainer from "./subcomponents/FormContainer.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelBodyVisible: false,
            json: [],
            users: [
                {
                    nickname: "rafal",
                    email: "rafalmiodowski@gmail.com",
                    ip: "1.1.1.1"
                }
            ],
            
        }
    }

    deleteUser = user => {
        const updatedUsers = this.state.users.filter(item => item !== user);
        this.setState({
            users: updatedUsers
        });
    };

    toggleAddDisplay = () => {
        const tempVisibility = !this.state.panelBodyVisible;
        this.setState({
            panelBodyVisible: tempVisibility
        });
    }

    addUser = user => { 
        const tempUsers = this.state.users;
        tempUsers.push(user);
        this.setState({
            users: tempUsers
        });
    }


    deleteList = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure that you want to delete the entire user list?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.setState( { users: [] } )
                },
                {
                    label: 'No',
                    onClick: () => false
                }
            ]
        })
    }

    render() {
        return (
            <div className="app">
                <FormContainer panelBodyVisible={this.state.panelBodyVisible}
                    handleDisplayToggle={this.toggleAddDisplay}
                    onAdd={this.addUser} />
                {this.state.users.length > 0 &&
                    <UserList onDelete={this.deleteUser}
                            users={this.state.users}
                            onDeleteList={this.deleteList} />
                }
            </div>
            
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);