import React, {Component} from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: {}
        }
    }
    componentDidMount() {
        this.getTodoList()
    }

    computeTodosByUserId(todoList) {
        const todos = {};
        for (let todo of todoList) {
            if (todos[todo.userId]) {
                todos[todo.userId]++;
            } else {
                todos[todo.userId] = 1;
            }

        }
        console.log('computed todo list:', todos);
        return todos;
    }
    getTodoList() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                res.json().then(data => {
                    console.log('res---', data);
                    this.setState({
                        todoList: this.computeTodosByUserId(data)
                    });
                })
                // console.log(this.state.todoList);
            })
            .catch(err => console.log(err));

    }

    render() {
        let userID = Object.keys(this.state.todoList).map(user => {
            return (
                <tr  key={user}>
                    <td>{this.state.todoList[user].userId}</td>
                    <td>{this.state.todoList[user]}</td>
                </tr>
                )
        });


        return (
            <table>
                <tr>
                    <th>User ID</th>
                    <th>todo count</th>
                </tr>
                {userID}

            </table>
        )
    }
}

export default TodoList;