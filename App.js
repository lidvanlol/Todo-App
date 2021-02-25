import React from 'react';
import Navigator from './src/components/navigation/Router';
import {
  AuthUserProvider,
  AuthUserContext,
} from './src/components/navigation/AuthUserProvider';


const App = () => {
  return (
    <AuthUserProvider>
      <Navigator />
    </AuthUserProvider>
  );
};
export default App;
