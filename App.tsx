import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Visualizations } from './components/Visualizations';
import { fetchExhibitions } from './services/geminiService';
import type { Exhibition, SearchFilters } from './types';
import { useLanguage } from './LanguageContext';

const DeveloperInfoModal = lazy(() => import('./components/DeveloperInfoModal'));
const VisaInfoModal = lazy(() => import('./components/VisaInfoModal'));


type View = 'results' | 'visualizations';
type VisaType = 'L' | 'M' | 'Z';

const PROFILE_IMAGE = 'https://i.ibb.co/b3s1M0N/china-flag-icon.png';

// Simple Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    console.error('Unhandled error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-600">
          An unexpected error occurred. Please reload the page.
        </div>
      );
    }
    return this.props.children;
  }
}

const getDefaultDateRange = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    };
};

const App: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const [filters, setFilters] = useState<SearchFilters>(() => ({
      province: 'Guangdong',
      city: 'Guangzhou',
      category: 'Any',
      invitation: 'Any',
      startDate: getDefaultDateRange().start,
      endDate: getDefaultDateRange().end,
  }));
  
  const [results, setResults] = useState<Exhibition[]>(() => {
    const cached = localStorage.getItem('lastResults');
    return cached ? JSON.parse(cached) : [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('results');
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState<VisaType | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const handleSearch = useCallback(async (searchFilters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setFilters(searchFilters);
    setView('results');
    try {
      const data = await fetchExhibitions(searchFilters);
      setResults(data);
      localStorage.setItem('lastResults', JSON.stringify(data));
    } catch (err) {
      setError(t('errorMessage'));
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleClearCache = () => {
    localStorage.removeItem('lastResults');
    setResults([]);
  };

  const handleVisaSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as VisaType;
    setSelectedVisa(type);
    e.target.value = ''; // Reset dropdown after selection to allow re-selection
  };


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-transparent text-gray-900 transition-colors">
        <header className="bg-white/80 sticky top-0 backdrop-blur-md z-30 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden me-3 shadow shrink-0">
                <img src={PROFILE_IMAGE} alt="logo" className="object-cover w-full h-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t('appTitle')}</h1>
                <p className="text-xs text-gray-600">{t('appSubtitle')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <select
                  value=""
                  onChange={handleVisaSelect}
                  className="rounded border px-2 py-1 bg-white/60 hover:bg-gray-100 cursor-pointer"
                  aria-label={t('visaInfo')}
              >
                  <option value="" disabled hidden>{t('selectVisaType')}</option>
                  <option value="L">{t('visaL')}</option>
                  <option value="M">{t('visaM')}</option>
                  <option value="Z">{t('visaZ')}</option>
              </select>
              
              <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
                  className="rounded border px-2 py-1 bg-white/60"
                  aria-label={t('language')}
              >
                  <option value="en">{t('english')}</option>
                  <option value="ar">{t('arabic')}</option>
              </select>
              
               <button onClick={() => setIsDevOpen(true)} title={t('aboutDeveloper')} className="p-2 rounded-full animate-pulse-blue relative flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
             <div className="sticky top-20">
                <SearchForm onSearch={handleSearch} isLoading={isLoading} initialFilters={filters} />
                <div className="mt-4 text-sm text-gray-100 bg-black/20 p-3 rounded-lg text-start">
                    <p><strong>{t('tipTitle')}:</strong> {t('tipMessage')}</p>
                </div>
             </div>
          </aside>

          <section className="lg:col-span-9">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">{t('exhibitionDirectory')}</h2>
              {results.length > 0 && (
                <div className="flex items-center space-x-2 bg-gray-200/50 p-1 rounded-lg">
                  <button onClick={() => setView('results')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${view==='results' ? 'bg-white text-blue-600 shadow' : 'text-gray-100 hover:bg-white/20'}`}>{t('results')}</button>
                  <button onClick={() => setView('visualizations')} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${view==='visualizations' ? 'bg-white text-blue-600 shadow' : 'text-gray-100 hover:bg-white/20'}`}>{t('visualizations')}</button>
                </div>
              )}
            </div>

            <div>
              {view === 'results' ? (
                <ResultsDisplay 
                  results={results} 
                  isLoading={isLoading} 
                  error={error} 
                  hasSearched={results.length > 0 || isLoading || !!error}
                  onClearCache={handleClearCache}
                />
              ) : (
                <Suspense fallback={<div className="p-6 text-center">{t('loading')}...</div>}>
                  <Visualizations data={results} />
                </Suspense>
              )}
            </div>
          </section>
        </main>

        <footer className="bg-white/80 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm text-gray-700">
            <p className="font-semibold">{t('devName')}</p>
            <p>© 2025 All Rights Reserved — Developed with passion ❤️ in Djelfa — Version 1.0.0</p>
          </div>
        </footer>

        <Suspense fallback={null}>
          <DeveloperInfoModal isOpen={isDevOpen} onClose={() => setIsDevOpen(false)} />
          <VisaInfoModal visaType={selectedVisa} onClose={() => setSelectedVisa(null)} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default App;