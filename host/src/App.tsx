import Header from "components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Container } from "react-bootstrap";
import { RemoteComponent } from "remote/RemoteComponent";
function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <RemoteComponent
          remoteName="TodoModule"
          remoteUrl={"http://localhost:3001/remoteEntry.js"}
          module="Todo"
        />
      </Container>
    </div>
  );
}
export default App;
