export type NetworkQuery = {
  city?: string;
  search?: string;
  page?: number;
  pageSize?: number;
};

export type LocalizedText = {
  ar: string;
  en: string;
};

export type NetworkFacility = {
  id: string;
  category: "hospitals" | "clinics" | "pharmacies" | "other";
  cityId: string;
  name: LocalizedText;
  address: LocalizedText;
  lat: number;
  lng: number;
};

export type NetworkResponse = {
  data: NetworkFacility[];
  meta: {
    cities: Array<{ id: string; name: LocalizedText }>;
    counts: Record<NetworkFacility["category"], number>;
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
};
