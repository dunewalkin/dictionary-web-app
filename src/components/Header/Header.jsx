import '../../components/Header/header.scss';
import Toggle from '../Toggle/Toggle';
import Dropdown from '../Dropdown/Dropdown';
import logo from '../../assets/images/logo.svg'


const Header = ({ onToggleTheme }) => {
  return (
    <header className='header-wrapper'>
        <div className='header-logo'>
          <img src={logo} alt="Logo" />
        </div>

        <div className="buttons-container">
            <Dropdown />
            <div className='line'></div>
            <Toggle onToggle={onToggleTheme} />
        </div>    
    </header>
  )
}

export default Header