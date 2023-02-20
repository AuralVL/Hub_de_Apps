import './style.css'
import { printTemplate as HeaderTemplate } from './components/Header/Header';
import { printTemplate as LoginTemplate } from './pages/Login/Login';
import { printTemplate as HomeTemplate } from './pages/Home/Home';
import { printTemplate as PokemonTemplate} from './pages/Pokemon/Pokemon';
import { printTemplate as FooterTemplate } from './components/Footer/Footer';

export const initContent = (route) => {
    switch (route) {
        case undefined:
            localStorage.getItem("user") ? HomeTemplate() : LoginTemplate();
            break;
        case "Home":
            HomeTemplate(); 
            break;
        case "Pokemon":
            PokemonTemplate();
            break;
    }
}

HeaderTemplate();

initContent();

FooterTemplate();





