import { Link } from 'react-router-dom';

function Ostukorv() {
  return ( 
    <div>
      <div>Ostukorv on tühi</div>
      <Link to="/">
        Mine tooteid lisama
      </Link>
    </div>  
    );
}

export default Ostukorv;
