import {BrowserRouter as Router, Route} from 'react-router-dom'
import DetailsPage from './component/DetailsPage'
import PasswordView from './component/PasswordView'

import './style.css'

function App() {

  return (
    <Router>
        <div className="app container">

          <Route path='/' exact>
            <DetailsPage
              isHome={true}
              setClose={false} 
              setBin={false} 
              setMainButton={false} 
              setSideText={false} 
            />
          </Route>

          <Route path='/login'>
            <DetailsPage
              pageTitle='login'
              mainButton='login'
              setMainButton={true} 
              sideText='register'
              setSideText={true} 

              setForm={true}
              emailInput={true}
              passwordInput={true}
              mainAction='login'
              sideTextLink='/register'

              setEmailAs='email'
            />
          </Route>

          <Route path='/register'>
            <DetailsPage
              pageTitle='register'
              mainButton='register'
              setMainButton={true} 
              sideText='login'
              setSideText={true} 
              usernameInput={true}
              nameLabel='name'

              setForm={true}
              emailInput={true}
              passwordInput={true}
              mainAction='register'
              sideTextLink='/login'
              setWebsiteAs='name'
              setEmailAs='email'
            />
          </Route>

          <Route path='/password/view' exact>
            <PasswordView />
          </Route>

          <Route path='/password/add'>
            <DetailsPage
              pageTitle='add password'
              mainButton='add password'
              setMainButton={true} 
              setClose={true}
              usernameInput={true}
              nameLabel='website'
              emailLabel='username / email'

              setForm={true}
              emailInput={true}
              passwordInput={true}
              mainAction='addPassword'

              setWebsiteAs='website'
              setEmailAs='username'
            />
          </Route>


          <Route path='/password/view/:id'>
            <DetailsPage
                pageTitle='password details'
                fetchPassword={true}
                mainButton='edit password'
                setMainButton={true} 
                setClose={true}
                usernameInput={true}
                nameLabel='website'
                emailLabel='username / email'
                disableIcons={true}
                readOnly={true}
                setForm={true}
                emailInput={true}
                passwordInput={true}
                mainAction='editPassword'

                setWebsiteAs='website'
                setEmailAs='username'
              />
          </Route>

          <Route path='/password/edit/:id' >
            <DetailsPage
              pageTitle='edit password'
              mainButton='save password'
              setMainButton={true} 
              setClose={true}
              setBin={true}
              binAction='deletePassword'
              usernameInput={true}
              nameLabel='website'
              emailLabel='username / email'
              setForm={true}
              emailInput={true}
              passwordInput={true}
              mainAction='savePassword'
              fetchPassword={true}
              deletePassword={true}

              setWebsiteAs='website'
              setEmailAs='username'
            />
          </Route>


        </div>
    </Router>
  );
}

export default App;
