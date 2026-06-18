export type ReservationStatus = "pending" | "confirmed" | "done" | "cancelled";

export type Store = {
  id: string;
  name: string;
  sort_order: number;
  active: boolean;
};

export type Reservation = {
  id: string;
  store_id: string;
  customer_name: string;
  phone: string | null;
  email: string | null;
  menu: string | null;
  reserved_date: string;
  reserved_time: string;
  num_people: number;
  status: ReservationStatus;
  note: string | null;
  created_at: string;
};

export const STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: "未対応",
  confirmed: "確定",
  done: "来店済み",
  cancelled: "キャンセル",
};

export const STATUS_ORDER: ReservationStatus[] = ["pending", "confirmed", "done", "cancelled"];
