import { useEffect } from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  useEffect(() => {
    localStorage.setItem('theme', 'light');
  }, []);
  return (
    <>
      <div>
        <h1>Hello World</h1>
      </div>
      <ThemeSwitcher />
    </>
  );
}

export default App;
