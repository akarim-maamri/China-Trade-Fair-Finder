
import React from 'react';
import type { Exhibition } from '../types';

interface ResultsDisplayProps {
  results: Exhibition[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

const SkeletonCard: React.FC = () => (
    <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
    </div>
);

const StatusIcon: React.FC<{ status: boolean }> = ({ status }) => {
    return status ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    );
};

const ExhibitionCard: React.FC<{ exhibition: Exhibition }> = ({ exhibition }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{exhibition.exhibition_name}</h3>
          <p className="text-sm text-gray-500">{exhibition.category}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${exhibition.invitation_type === 'Free Invitation' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {exhibition.invitation_type}
        </span>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{exhibition.start_date} to {exhibition.end_date}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>{exhibition.venue}, {exhibition.city}</span>
          </div>
          <div className="flex items-center col-span-1 md:col-span-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <span>{exhibition.organizer}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex space-x-4">
            <div className="flex items-center" title="Verification Status"><StatusIcon status={exhibition.verification_status} /><span className="ml-1.5">Verified</span></div>
            <div className="flex items-center" title="Consular Acceptance"><StatusIcon status={exhibition.consular_acceptance} /><span className="ml-1.5">Consular OK</span></div>
        </div>
        <div className="flex space-x-2">
            <a href={exhibition.official_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Website</a>
            <a href={exhibition.application_link} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Apply</a>
        </div>
      </div>
    </div>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading, error, hasSearched }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Error</p>
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">Find Your Next Trade Fair</h3>
            <p className="mt-1 text-sm text-gray-500">Use the filters to start your search for exhibition invitations in China.</p>
        </div>
      )
  }

  if (results.length === 0) {
    return (
        <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Exhibitions Found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters to find more results.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {results.map((ex, index) => (
        <ExhibitionCard key={`${ex.exhibition_name}-${index}`} exhibition={ex} />
      ))}
    </div>
  );
};
