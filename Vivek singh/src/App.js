import {
  
  Switch,
  Route,
 
} from "react-router-dom";
import './App.css';

import Login from './Component/login/Login';
import Chat from './Component/Chat/chat';


function App() {
  return (
    <div >
    
     <Switch>
          <Route exact path="/" component={Login}/>
         
         
          <Route exact path="/chat" component={Chat}/>
          
          
          
        </Switch>
    </div>
  );
}

export default App;
