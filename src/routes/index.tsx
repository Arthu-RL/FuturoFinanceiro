import { Routes as Routing, Route } from 'react-router-dom';

import Invest from '@/pages/Invest';
import Home from '@/pages/Home';

export default function Routes() {
  return (
    <Routing>
      <Route path='/' element={<Home />} />
      <Route path='/investir' element={<Invest />} />
    </Routing>
  );
}
