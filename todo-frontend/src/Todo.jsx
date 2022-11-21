import "./Todo.css";

const Todo = ({ todoText, onClick }) => {
  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: todoText }}></p>
      <button onClick={onClick}> Delete</button>
    </div>
  );
};

export default Todo;
