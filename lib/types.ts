export type ReservationStatus = "pending" | "confirmed" | "done" | "cancelled";

export type Store = {
  id: string;
  name: string;
  sort_order: number;
  active: boolean;
  open_time: string;       // "10:00:00"
  close_time: string;      // "20:00:00"
  slot_minutes: number;    // 予約枠の長さ（分）
  capacity: number;        // 同時受付件数
  closed_weekdays: number[]; // 定休曜日 0=日..6=土
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
  is_block: boolean;
  created_at: string;
};

export const STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: "未対応",
  confirmed: "確定",
  done: "来店済み",
  cancelled: "キャンセル",
};

export const STATUS_ORDER: ReservationStatus[] = ["pending", "confirmed", "done", "cancelled"];
