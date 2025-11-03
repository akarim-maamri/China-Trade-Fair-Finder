
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
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
