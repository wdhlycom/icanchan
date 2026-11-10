import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './i18n/LangContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StartHere from './pages/StartHere';
import Series from './pages/Series';
import ArticlePage from './pages/ArticlePage';
import Escapes from './pages/Escapes';
import Curated from './pages/Curated';
import About from './pages/About';
import Subscribe from './pages/Subscribe';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* English routes */}
            <Route path="/" element={<Home />} />
            <Route path="/start-here" element={<StartHere />} />
            <Route path="/series/buddhism-101" element={<Series />} />
            <Route path="/series/buddhism-101/:slug" element={<ArticlePage />} />
            <Route path="/escapes" element={<Escapes />} />
            <Route path="/curated" element={<Curated />} />
            <Route path="/about" element={<About />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/search" element={<Search />} />

            {/* Spanish routes */}
            <Route path="/es" element={<Home />} />
            <Route path="/es/start-here" element={<StartHere />} />
            <Route path="/es/series/buddhism-101" element={<Series />} />
            <Route path="/es/series/buddhism-101/:slug" element={<ArticlePage />} />
            <Route path="/es/escapes" element={<Escapes />} />
            <Route path="/es/curated" element={<Curated />} />
            <Route path="/es/about" element={<About />} />
            <Route path="/es/subscribe" element={<Subscribe />} />
            <Route path="/es/search" element={<Search />} />

            {/* Chinese routes */}
            <Route path="/zh" element={<Home />} />
            <Route path="/zh/start-here" element={<StartHere />} />
            <Route path="/zh/series/buddhism-101" element={<Series />} />
            <Route path="/zh/series/buddhism-101/:slug" element={<ArticlePage />} />
            <Route path="/zh/escapes" element={<Escapes />} />
            <Route path="/zh/curated" element={<Curated />} />
            <Route path="/zh/about" element={<About />} />
            <Route path="/zh/subscribe" element={<Subscribe />} />
            <Route path="/zh/search" element={<Search />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;
