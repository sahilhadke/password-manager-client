import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/Home'
import PasswordList from './component/PasswordList'
import AddPassword from './component/AddPassword'
import AddEditPassword from './component/AddEditPassword'
import PasswordDetail from './component/PasswordDetail'

import './style.css'

function App() {

  return (
    <Router>
        <div className="app">

          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/password-list' component={PasswordList} />
          
          <Route path='/add-pass'>
            <AddEditPassword 
              action='add'
              title='add password'
            />
          </Route>

          <Route path='/password/view/:id'>
            <PasswordDetail/>
          </Route>

          <Route path='/password/edit/:id' >
            <AddEditPassword action='edit'/>
          </Route>


        </div>
    </Router>
  );
}

export default App;
