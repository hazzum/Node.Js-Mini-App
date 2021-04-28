import HomePage from './Components/HomePage/HomePage'
import AddS from './Components/AddStudent/AddStudent'
import AddC from './Components/AddCourse/AddCourse'
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/web" exact component={HomePage} />
          <Route path="/web/courses/create" exact component={AddC} />
          <Route path="/web/students/create" exact component={AddS} />
          <Redirect to="/web" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
