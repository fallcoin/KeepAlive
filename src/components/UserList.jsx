import React from 'react';

const UserList = props => {
    const users = new Array(100).fill(0);
    return (
        <ul style={{ height: '200px', overflow: 'scroll' }}>
            {
                users.map((user, index) => (
                    <li key={index}>
                        <div>{index}</div>
                    </li>
                ))
            }
        </ul>
    )
}

export default UserList;