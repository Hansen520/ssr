/*
 * @Date: 2024-01-19 17:24:53
 * @Description: description
 */
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import router from '@/router';
import { clientStore } from '@/store';
import { Provider } from 'react-redux';

const Client = (): JSX.Element => {
  return (
    <Provider store={clientStore}>
      <BrowserRouter>
        <Routes>
          {router?.map((item, index) => {
            return <Route {...item} key={index} />
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

hydrateRoot(document.getElementById('root') as Document | Element, <Client />);
