import Form, { useForm } from "./packages/form";

function App() {
  useForm();
  return (
    <div className="App">
      <Form>
        <button>submit</button>
      </Form>
    </div>
  );
}

export default App;
