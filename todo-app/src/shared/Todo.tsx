import store from "app/state/store";
import { Provider } from "react-redux";
import Todo from "components/Todo";

function TodoWrapper() {
  return (
    <>
      <Provider store={store}>
        <Todo />
      </Provider>
    </>
  );
}

export default TodoWrapper;
