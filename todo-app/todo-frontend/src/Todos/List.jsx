/* eslint-disable react/prop-types */
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map(todo => (
        <Todo
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      )).reduce((acc, cur) => [...acc, <hr key={`hr-${cur.key}`} />, cur], [])}
    </>
  )
}

export default TodoList
