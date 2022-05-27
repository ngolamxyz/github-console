import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.scss';


const ClientOnly = ({ children, ...delegated }) => {

const [hasMounted, setHasMounted] = React.useState(false);

React.useEffect(() => {
setHasMounted(true);
}, []);

if (!hasMounted) return null

return (
<React.Fragment {...delegated}>
{children}
</React.Fragment>
);
}


const App = () => (
  <ClientOnly>
    <Switch>
      <Route exact={true} path="/" component={Home} />
    </Switch>
  </ClientOnly>
);

export default App;
