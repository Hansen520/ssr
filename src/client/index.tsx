/*
 * @Date: 2024-01-19 17:24:53
 * @Description: description
 */
import { hydrateRoot } from 'react-dom/client';
import Home from '@/pages/Home';

hydrateRoot(document.getElementById('root') as Document | Element, <Home />);
