import { useState, useEffect } from 'react';
import './App.css';
import Main from './pages/Main/index';
import Profile from './pages/Profile/index';
import Saved from './pages/Saved/index';
import Basket from './pages/Basket/index';
import Catalog from './pages/Catalog/index';
import ProductDetail from './pages/ProductDetail/index';

import Header from './components/Header/index';
import Navigation from './components/Navigation/index';
import Login from './components/Login/index';

import { BrowserRouter, Route, Routes } from 'react-router';
import { useDispatch } from 'react-redux';
import { SearchProvider, useSearch } from './context/SearchContext';

// import LogoIcon from './assets/media/logo_xp.jpeg';

import type { User } from './types/user';
import type { ApiPartialResponse } from './types/api';

function App() {
  const dispatch = useDispatch();
  const [fastSearchStrings, setFastSearchStrings] = useState<string[]>([]);
  const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);
  const [person, setPerson] = useState<User[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('http://noxer-test.ru/webapp/api/products/on_main');
        if (!res.ok) throw new Error('Server error');

        const data: ApiPartialResponse = await res.json();

        dispatch({ type: 'SET_CARDS', payload: data.products || [] });
        dispatch({ type: 'SET_TYPES', payload: data.categories || [] });

        if (data.special_project_parameters_json?.fast_search_strings?.parameters_list) {
          setFastSearchStrings(data.special_project_parameters_json.fast_search_strings.parameters_list);
        } else {
          setFastSearchStrings([]);
        }
      } catch (e) {
        console.warn('Не удалось загрузить данные с сервера. Используем локальные...', e);

        try {
          const localRes = await fetch('/data.json');
          const localData: ApiPartialResponse = await localRes.json();

          dispatch({ type: 'SET_CARDS', payload: localData.products || [] });
          dispatch({ type: 'SET_TYPES', payload: localData.categories || [] });

          if (localData.special_project_parameters_json?.fast_search_strings?.parameters_list) {
            setFastSearchStrings(localData.special_project_parameters_json.fast_search_strings.parameters_list);
          } else {
            setFastSearchStrings([]);
          }
        } catch (localError) {
          console.error('Не удалось загрузить локальные данные:', localError);
          dispatch({ type: 'SET_CARDS', payload: [] });
          dispatch({ type: 'SET_TYPES', payload: [] });
          setFastSearchStrings([]);
        }
      }
    };

    loadData();
  }, [dispatch]);

  useEffect(() => {
    const savedPerson = localStorage.getItem('person');
    if (savedPerson) {
      try {
        const parsedPerson = JSON.parse(savedPerson) as User[];
        setPerson(parsedPerson);
        if (parsedPerson.length > 0) {
          setIsLogin(true);
        }
      } catch (e) {
        console.error('Ошибка при загрузке данных из localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (person.length > 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [person]);

  const handleSaveUser = (email: string, password: string) => {
    const updatedPerson = [{ email, password }];
    setPerson(updatedPerson);
    localStorage.setItem('person', JSON.stringify(updatedPerson));
  };

  function NavigationToggle() {
    const { isSearchActive } = useSearch();
    return !isSearchActive ? <Navigation /> : null;
  }

  function BlurredRoute({ children }: { children: React.ReactNode }) {
    return (
      <div className={isSettingsActive ? 'contentBlur' : ''}>
        {children}
      </div>
    );
  }

  function LoginRoute({ children }: { children: React.ReactNode }) {
    return isLogin ? children : <Login onSaveUser={handleSaveUser} />;
  }

  return (
    <BrowserRouter>
      <SearchProvider>
        <Header
          isSettingsActive={isSettingsActive}
          setIsSettingsActive={setIsSettingsActive}
        />

        <Routes>
          <Route
            index
            element={
              <BlurredRoute>
                <Main fastSearchStrings={fastSearchStrings} />
              </BlurredRoute>
            }
          />

          <Route
            path="product/:id"
            element={
              <BlurredRoute>
                <ProductDetail />
              </BlurredRoute>
            }
          />

          <Route
            path="catalog"
            element={
              <BlurredRoute>
                <Catalog />
              </BlurredRoute>
            }
          />

          <Route
            path="saved"
            element={
              <LoginRoute>
                <BlurredRoute>
                  <Saved />
                </BlurredRoute>
              </LoginRoute>
            }
          />

          <Route
            path="basket"
            element={
              <LoginRoute>
                <BlurredRoute>
                  <Basket />
                </BlurredRoute>
              </LoginRoute>
            }
          />

          <Route
            path="profile"
            element={
              <LoginRoute>
                <BlurredRoute>
                  <Profile person={person} setPerson={setPerson} />
                </BlurredRoute>
              </LoginRoute>
            }
          />
        </Routes>

        <NavigationToggle />
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;