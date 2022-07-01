export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  affectedRows: any;
  insertId: any;
}
