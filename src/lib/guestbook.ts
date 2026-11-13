export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  pending?: boolean;
};
