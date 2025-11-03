
export interface SearchFilters {
  province: string;
  city: string;
  category: string;
  invitation: 'Free' | 'Paid' | 'Any';
  startDate: string;
  endDate: string;
}

export interface Exhibition {
  id: string;
  name: string;
  province: string;
  city: string;
  category: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  venue: string;
  organizer: string;
  invitationType: 'Free' | 'Paid';
  website: string;
}
