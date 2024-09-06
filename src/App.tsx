import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Invest from './components/Invest/Invest';

/*
* Trabalhos a fazer (TODOS) 
* 1- Rotas de explicação da aplicação, motivação, contato, divulgação app android etc
*   1.1- Rota Home
*   1.2- Rota Sobre
*   1.3- Rota Contato
* 3- Fazer as abas de investimento, que já até estão na rota Invest.
*   3.1- investimento risco baixo
*   3.2- investimento risco médio
*   3.3- investimento risco alto
* 4- Ao clicar na aba de investimento, para aonde vai ? provavelmente outra página do investimento em expecífico,
* que terá informações sobre o investimento, gráfico de oscilação do preço etc.
* 5- Lógica de investimento e desconto do saldo (Será a mesma em todo o código)
* 6- Lógica de oscilação dos preços (com o tempo) das moedas sintéticas que serão simuladas
*   6.1- Lógica para investimento risco baixo
*   6.2- Lógica para investimento risco médio
*   6.3- Lógica para investimento risco alto
* 7- Fazer principal estilo do app
*   7.1- Aplicar estilo nas Rotas
*   7.2- Aplicar estilos nas abas de investimento
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
