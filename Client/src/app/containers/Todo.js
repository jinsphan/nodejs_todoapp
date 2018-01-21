import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import { Form, ListTodo } from "../components/todo";
import CircularProgress from "material-ui/CircularProgress";
import {
  addTodo,
  getTodos,
  checkedTodo,
  deleteTodos,
} from "../actions/todos";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isAdding: false,
      isHandlingTodo: false,
      filter: 0,
      todo: {
        text: "",
        date_deadline: "",
        time_deadline: "",
      },
      errors: {
        text: "",
        date_deadline: "",
        time_deadline: "",
      },
    };
  }

  async componentWillMount() {
    try {
      await this.props.getTodos();
    } catch (er) {
      console.log("May be something errors");
    }
    this.setState({
      isLoading: false,
    });
  }

  handleAddTodo = e => {
    e.preventDefault();
    this.validate(async isValid => {
      if (isValid) {
        const todo = {
          name: this.state.todo.text,
          deadline: `${this.state.todo.date_deadline} ${this.state.todo.time_deadline}`,
        };
        this.setState({ isAdding: true });
        try {
          await this.props.addTodo(todo);
        } catch (er) {
          this.setState({
            errors: {
              text: "todo's name has in your list todos.",
            },
          });
        }
        this.setState({ isAdding: false });
      }
    });
  }

  validate = callback => {
    const patternForText = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|>|\?|\/|""|;/;
    const errors = {};
    if (this.state.todo.text === "") errors.text = "Todo text cant empty!";
    if (patternForText.test(this.state.todo.text)) errors.text = "Todo text invalid";
    if (this.state.todo.date_deadline === "") errors.date_deadline = "Todo text invalid";
    if (this.state.todo.time_deadline === "") errors.time_deadline = "Todo text invalid";
    let isValid = Object.keys(errors).reduce((ac, cur) => {
      return ac && !errors[cur];
    }, true);
    if (isValid) {
      const deadline = `${this.state.todo.date_deadline} ${this.state.todo.time_deadline}`;
      const numDiffDays = moment(deadline).diff(moment());
      if (numDiffDays <= 0) {
        errors.date_deadline = "Oh no. Deadline time not before from now";
        isValid = false;
      }
    }
    this.setState({
      errors,
    });
    callback(isValid);
  }

  handleChangeForm = type => {
    return (e, value) => {
      switch (type) {
        case "text" : {
          this.setState({
            todo: {
              ...this.state.todo,
              [type]: e.target.value,
            },
            errors: {
              ...this.state.errors,
              [type]: !e.target.value ? "Todo text cant empty!" : "",
            },
          });
          break;
        }
        case "date_deadline" : {
          const date = moment(value).format("YYYY-MM-DD");
          this.setState({
            todo: {
              ...this.state.todo,
              [type]: date,
            },
            errors: {
              ...this.state.errors,
              [type]: "",
            },
          });
          break;
        }
        case "time_deadline" : {
          const time = moment(value).format("HH:mm:ss");
          this.setState({
            todo: {
              ...this.state.todo,
              [type]: time,
            },
            errors: {
              ...this.state.errors,
              [type]: "",
            },
          });
          break;
        }
      }
    };
  }

  handleDeleteTodo = id => async () => {
    this.setState({
      isHandlingTodo: true,
    });
    try {
      await this.props.deleteTodos([id]);
    } catch (er) {
      console.log(er);
    }
    this.setState({
      isHandlingTodo: false,
    });
  }

  handleCheckBox = id => async () => {
    this.setState({
      isHandlingTodo: true,
    });
    try {
      await this.props.checkedTodo(id);
    } catch (er) {
      console.log(er);
    }
    this.setState({
      isHandlingTodo: false,
    });
  }

  handleFilting = (e, filter) => {
    this.setState({
      filter,
    });
  }

  handleDeleteAll = async () => {
    if (window.confirm("Are you sure!")) {
      const todosDelete = this.props.todos.filter(
        todo => this.state.filter === 0 || todo.done === this.state.filter - 1,
      ).map(todo => todo.id);
      try {
        this.setState({
          isHandlingTodo: true,
        });
        await this.props.deleteTodos(todosDelete);
      } catch (er) {
        console.log(er);
      }
      this.setState({
        isHandlingTodo: false,
      });
    }
  }

  render() {
    return (
      <div className="todo-app">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Form
                errors={this.state.errors}
                handleAddTodo={this.handleAddTodo}
                onChangeText={this.handleChangeForm("text")}
                onChangeDate={this.handleChangeForm("date_deadline")}
                onChangeTime={this.handleChangeForm("time_deadline")}
                isAdding={this.state.isAdding}
              />
            </div>
            <div className="list-todo col-md-6">
              {
                this.state.isLoading === true
                ? <div style={{ textAlign: "center", marginTop: "50px" }}><CircularProgress /></div>
                : <ListTodo
                    filter={this.state.filter}
                    todos={this.props.todos}
                    isHandlingTodo={this.state.isHandlingTodo}
                    onDeleteTodo={this.handleDeleteTodo}
                    onDeleteAll={this.handleDeleteAll}
                    onChecking={this.handleCheckBox}
                    onFilting={this.handleFilting}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  addTodo: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired,
  checkedTodo: PropTypes.func.isRequired,
  deleteTodos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDistpachToProps = {
  addTodo,
  getTodos,
  checkedTodo,
  deleteTodos,
};

export default connect(
  mapStateToProps,
  mapDistpachToProps,
)(Todo);
