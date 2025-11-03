
export interface SearchFilters {
  province: string;
  city: string;
  category: string;
  invitationType: string;
  startDate: string;
  endDate: string;
}

export interface Exhibition {
  province: string;
  city: string;
  exhibition_name: string;
  category: string;
  start_date: string;
  end_date: string;
  venue: string;
  organizer: string;
  official_website: string;
  invitation_type: string;
  application_link: string;
  contact_email: string;
  contact_phone: string;
  last_updated: string;
  verification_status: boolean;
  consular_acceptance: boolean;
}
