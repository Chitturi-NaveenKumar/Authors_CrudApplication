export interface AuthorsData {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
}

export interface coulmnType {
  name: string;
  required: boolean | undefined;
  label: string | undefined;
  align: Alignment | undefined;
  field: string | ((row: any) => any);
  format?: (val: string) => string | undefined;
  sort?: ((a: any, b: any, rowA: any, rowB: any) => number) | undefined;
  sortable?: boolean | undefined;
}

type Alignment = "center" | "left" | "right";
