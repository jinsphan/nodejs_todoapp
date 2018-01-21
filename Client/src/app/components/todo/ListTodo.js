import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RaisedButton, Subheader, List, ListItem, DropDownMenu, MenuItem, FlatButton, Checkbox } from "material-ui";
import ActionDelete from "material-ui/svg-icons/action/delete";
import moment from "moment";

const DoneBox = props => {
  return (
    <Checkbox
      disabled={props.isHandlingTodo}
      style={{ width: "auto", float: "left" }}
      checked={props.isDone === 1}
      onClick={props.onChecking}
    />
  );
};
DoneBox.propTypes = {
  isDone: PropTypes.number.isRequired,
  isHandlingTodo: PropTypes.bool.isRequired,
  onChecking: PropTypes.func.isRequired,
};

const ListTodo = props => {
  return (
    <div className="Todo-content">
      <div style={{ textAlign: "right" }}>
        <Link to="/login"><FlatButton label="Logout" rippleColor="red" secondary /></Link>
      </div>
      <List className="list" style={{ minWidth: "300px" }} >
        <Subheader
          style={{
            textAlign: "left",
            lineHeight: "22px",
          }}>
          <DropDownMenu value={props.filter} onChange={props.onFilting}>
            <MenuItem value={0} primaryText="All" />
            <MenuItem value={1} primaryText="To do" />
            <MenuItem value={2} primaryText="Done" />
          </DropDownMenu>
          <RaisedButton
            label="Delete All"
            style={{ float: "right", margin: "12px 4px" }}
            onClick={props.onDeleteAll}
          />
        </Subheader>

        {
          props.todos.filter(
            todo => props.filter === 0 || props.filter === todo.done + 1,
          ).map((todo, index) => (
            <ListItem
              key={index}
              leftIcon={
                <DoneBox
                  isHandlingTodo={props.isHandlingTodo}
                  isDone={todo.done}
                  onChecking={props.onChecking(todo.id)}
                />
              }
              rightIcon={
                <ActionDelete
                  color={`${props.isHandlingTodo ? "grey" : "black"}`}
                  hoverColor="red"
                  onClick={props.onDeleteTodo(todo.id)}
                  style={{ pointerEvents: `${props.isHandlingTodo ? "none" : ""}` }}
                />
              }
              primaryText={<span>{todo.name}</span>}
              secondaryText={`${moment(todo.created).fromNow()}, ${moment(todo.deadline).format("DD-MM-YYYY HH:mm")}`}
              innerDivStyle={{ padding: "20px" }}
              style={{ padding: "0px" }}
              className="-no-select"
            />
          ))
        }
      </List>
    </div>
  );
};
ListTodo.propTypes = {
  todos: PropTypes.array.isRequired,
  isHandlingTodo: PropTypes.bool.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onDeleteAll: PropTypes.func.isRequired,
  onChecking: PropTypes.func.isRequired,
  filter: PropTypes.number.isRequired,
  onFilting: PropTypes.func.isRequired,
};

export default ListTodo;
