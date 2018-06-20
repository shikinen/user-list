import React, { Component } from 'react';

class User extends Component {

    handleDelete = () => {
        this.props.onDelete(this.props.whichUser);
    }

    render() {
        const user = this.props.userData;
        return (
            <li className="users__record">
                
                <div className="users__record-item users__record-item_name">{user.nickname}</div>
                <div className="users__record-item users__record-item_email"><span className="users__record-item_label">Email:</span>{user.email}</div>
                <div className="users__record-item users__record-item_ip"><span className="users__record-item_label">IP:</span>{user.ip}</div>
                <button className="users__record-item button button_text" onClick={this.handleDelete}>Delete user</button>
            </li>
        );
    }
}

export default User;