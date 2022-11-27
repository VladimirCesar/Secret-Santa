import './styles/head-form.css';
import { Auth } from './pages/Auth';
import { Timer } from './elements/common/Timer';
import { Menu } from './elements/common/Menu';

function App() {

  return (
    <div className="App head-form">
      <Menu />
      <Auth />
      <Timer />
    </div>
  );
}

export default App;
