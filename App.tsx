
import React, { useState, useCallback } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Visualizations } from './components/Visualizations';
import { fetchExhibitions } from './services/geminiService';
import type { Exhibition, SearchFilters } from './types';

type View = 'results' | 'visualizations';

const App: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [results, setResults] = useState<Exhibition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('results');

  const handleSearch = useCallback(async (searchFilters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    setFilters(searchFilters);
    setView('results');
    try {
      const data = await fetchExhibitions(searchFilters);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch exhibition data. Please check your API key and try again.');
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded" viewBox="0 0 90 60">
                <rect width="90" height="60" fill="#DE2910"/>
                <path d="M22.5,15 L20.3,21.5 26.8,17.2 18.2,17.2 24.7,21.5" fill="#FFDE00"/>
                <path d="M37.5,6 L36.9,8.2 38.7,6.6 36.3,6.6 38.1,8.2" fill="#FFDE00" transform="rotate(23.4 37.5 7.5)"/>
                <path d="M45,15 L44.4,17.2 46.2,15.6 43.8,15.6 45.6,17.2" fill="#FFDE00" transform="rotate(45.8 45 15)"/>
                <path d="M45,24 L44.4,26.2 46.2,24.6 43.8,24.6 45.6,26.2" fill="#FFDE00" transform="rotate(69.2 45 22.5)"/>
                <path d="M37.5,30 L36.9,32.2 38.7,30.6 36.3,30.6 38.1,32.2" fill="#FFDE00" transform="rotate(90 37.5 30)"/>
              </svg>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">China Trade Fair Finder</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="sticky top-20">
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </aside>

          <div className="lg:col-span-9 xl:col-span-9 mt-6 lg:mt-0">
            {filters && (
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Exhibition Directory</h2>
                    {results.length > 0 && (
                        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                        <button
                            onClick={() => setView('results')}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${view === 'results' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            Results
                        </button>
                        <button
                            onClick={() => setView('visualizations')}
                            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${view === 'visualizations' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            Visualizations
                        </button>
                        </div>
                    )}
                </div>
              </div>
            )}
            
            {view === 'results' ? (
              <ResultsDisplay results={results} isLoading={isLoading} error={error} hasSearched={!!filters} />
            ) : (
              <Visualizations data={results} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
