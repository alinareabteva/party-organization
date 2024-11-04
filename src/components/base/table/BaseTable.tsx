import {ReactNode} from "react";
import "./BaseTable.scss"

export interface Column<T> {
  title: string;
  fieldName: keyof T;
  render?: (rowItem: T, index: number) => ReactNode;
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
        {columns.map((column) => (
          <th key={column.title} className={column.className}>
            {column.title}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((rowItem, index) => (
        <tr key={dataKey? rowItem[dataKey] as string : index}>
          {columns.map((column) => (
            <td key={index} className={column.className}>
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