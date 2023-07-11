import Header from "components/Header";
import React, { Suspense } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
const TodoList = React.lazy(() => import("TodoModule/Todo"));
function App() {
  return (
    <div className="App">
      <Header />
      <Container> 
        <Suspense fallback="Loading...">
          <TodoList />
        </Suspense>
      </Container>
    </div>
  );
}
export default App;
