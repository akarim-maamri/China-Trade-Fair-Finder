
import React, { useState } from 'react';
import { PROVINCES, CITIES, CATEGORIES, INVITATION_TYPES } from '../constants';
import type { SearchFilters } from '../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
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

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [province, setProvince] = useState('Guangdong');
  const [city, setCity] = useState('Guangzhou');
  const [category, setCategory] = useState('Any');
  const [invitationType, setInvitationType] = useState('Any');
  const [startDate, setStartDate] = useState(getDefaultDateRange().start);
  const [endDate, setEndDate] = useState(getDefaultDateRange().end);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ province, city, category, invitationType, startDate, endDate });
  };

  const formElementClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Search Filters</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="province" className={labelClass}>Province</label>
          <select id="province" value={province} onChange={(e) => setProvince(e.target.value)} className={formElementClass}>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>City</label>
          <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className={formElementClass}>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={formElementClass}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="invitationType" className={labelClass}>Invitation Type</label>
          <select id="invitationType" value={invitationType} onChange={(e) => setInvitationType(e.target.value)} className={formElementClass}>
            {INVITATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
            <label className={labelClass}>Exhibition Date Range</label>
            <div className="flex items-center space-x-2">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={formElementClass} />
                <span className="text-gray-500">to</span>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={formElementClass} />
            </div>
        </div>
        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors">
          {isLoading ? (
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          )}
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};
