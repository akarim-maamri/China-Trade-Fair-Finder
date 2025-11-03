import React from 'react';
import type { Exhibition } from '../types';
import { useLanguage } from '../LanguageContext';

interface ResultsDisplayProps {
  results: Exhibition[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  onClearCache: () => void;
}

const SkeletonCard: React.FC = () => (
    <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
    </div>
);


const ExhibitionCard: React.FC<{ exhibition: Exhibition }> = ({ exhibition }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white/80 p-4 rounded-lg shadow-md text-start transition-all hover:shadow-xl hover:border-blue-500 border border-transparent">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">{exhibition.name}</h4>
          <p className="text-sm text-gray-600">{exhibition.city}, {exhibition.province} • {exhibition.category}</p>
        </div>
        <div className="text-start sm:text-end mt-2 sm:mt-0 shrink-0 sm:ms-4">
          <p className={`text-sm font-semibold px-2 py-0.5 rounded-full inline-block ${exhibition.invitationType === 'Free' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{exhibition.invitationType}</p>
          <p className="text-sm text-gray-600 mt-1">{exhibition.startDate} → {exhibition.endDate}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
        <a href={exhibition.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{t('website')}</a>
        <button className="text-sm px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200">{t('details')}</button>
      </div>
    </div>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading, error, hasSearched, onClearCache }) => {
  const { t } = useLanguage();

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-s-4 border-red-500 text-red-700 p-4 rounded-md text-start" role="alert">
        <p className="font-bold">{t('errorTitle')}</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!hasSearched) {
      return (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">{t('findNextFairTitle')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('findNextFairMessage')}</p>
        </div>
      )
  }

  if (results.length === 0) {
    return (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">{t('noResultsTitle')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('noResultsMessage')}</p>
        </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/70 p-3 rounded-lg shadow">
        <div className="text-start">
            <h3 className="text-lg font-semibold">{t('resultsCount', {count: results.length})}</h3>
            <p className="text-sm text-gray-600">{t('resultsDescription')}</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <button onClick={handleCopyJson} className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">{t('copyJson')}</button>
            <button onClick={onClearCache} className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">{t('clearCache')}</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {results.map((ex) => (
          <ExhibitionCard key={ex.id} exhibition={ex} />
        ))}
      </div>
    </div>
  );
};