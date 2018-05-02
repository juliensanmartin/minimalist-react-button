import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../lib';
import theme from './styles/theme';

const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '25px 0px'
};

const App = () => (
  <div>
    <h1>Button</h1>
    <div style={styles}>
      <Button label="Default" theme={theme} />
      <Button label="Primary" primary theme={theme} />
      <Button label="disabled" disabled theme={theme} />
      <Button label="Raised" raised theme={theme} />
      <Button label="Raised" raised primary theme={theme} />
      <Button label="disabled" raised disabled theme={theme} />
    </div>
    <div style={styles}>
      <Button floating primary theme={theme} />
      <Button floating theme={theme} />
      <Button floating primary theme={theme} color={'red'} />
      <Button floating primary disabled theme={theme} color={'red'} />
      <Button floating primary disabled theme={theme} />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
