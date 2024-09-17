import { Routes as Routing, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Simulator from '@/pages/Simulator';

export default function Routes() {
  return (
    <Routing>
      <Route path='/' element={<Home />} />
      <Route path='/simulador' element={<Simulator />} />
    </Routing>
  );
}
