import type { ReactNode } from 'react';
import './table.css';

export interface TableColumn<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  getRowKey?: (row: T, index: number) => string | number;
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No records found',
  getRowKey,
}: TableProps<T>): React.ReactElement => {
  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={String(column.key)} className={`align-${column.align ?? 'left'}`}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="ui-table-empty">{emptyMessage}</td></tr>
          ) : data.map((row, rowIndex) => (
            <tr key={getRowKey?.(row, rowIndex) ?? rowIndex}>
              {columns.map(column => (
                <td key={String(column.key)} className={`align-${column.align ?? 'left'}`}>
                  {column.render ? column.render(row, rowIndex) : String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
