export interface RoutingData {
  routing_number: string;
  bank_name: string;
  address?: string;
  city: string;
  state: string;
  zip?: string;
  phone?: string;
  type?: string; // ACH, Fedwire, Fedwire / ACH. Default is ACH.
}
