import {ReactNode} from "react";
import "./BaseTable.scss"

export interface Column<T> {
  title: string;
  fieldName: keyof T;
  render?: (rowItem: T, index: number) => ReactNode;
  renderHeader?: (column: Column<T>, cellIndex: number) => ReactNode;
  className?: string;
}

interface BaseTableProps<T> {
  columns: Array<Column<T>>;
  data:  Array<T>;
  dataKey?: keyof T;
}

function BaseTable<T> ({columns, data, dataKey}: BaseTableProps<T>) {
  return (
    <table className="base-table">
      <thead>
      <tr>
        {columns.map((column, columnIndex) => (
          <th key={column.title} className={column.className}>
            {column.renderHeader ? (column.renderHeader(column, columnIndex)) : column.title}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((rowItem, index) => (
        <tr key={dataKey? rowItem[dataKey] as string : index}>
          {columns.map((column, columnIndex) => (
            <td key={columnIndex} className={column.className}>
              {column.render ? (column.render(rowItem, index)) : rowItem[column.fieldName]?.toString()}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default BaseTable;