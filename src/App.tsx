import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Invest from './components/Invest/Invest';

/*
* Trabalhos a fazer (TODOS) 
* 1- Rotas de Explicação da aplicação, divulgação app android etc
* 2- Aba de Sobre e Contato, faz parte do TODO número 1
* 3- Fazer as abas de investimento, que já até está na rota Invest, mas se houver uma ideia melhor do que esta rota, 
* é só fazer
* 4- Ao clicar na aba de investimento, para aonde vai ? provavelmente outra página do investimento em expecífico,
* que terá informações sobre o investimento, gráfico de oscilação do preço, etc.
* 5- Lógica de investimento e desconto do salbo (Variável global que quase todos os componentes terão acesso) 
* 6- Lógica de oscilação dos preços das moedas sintéticas que serão simuladas
* 7- ....
*/

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Invest" element={<Invest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
