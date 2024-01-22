/*
 * @Date: 2024-01-19 17:24:53
 * @Description: description
 */
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import router from '@/router';

const Client = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {router?.map((item, index) => {
          return <Route {...item} key={index} />
        })}
      </Routes>
    </BrowserRouter>  
  )
}

hydrateRoot(document.getElementById('root') as Document | Element, <Client />);
