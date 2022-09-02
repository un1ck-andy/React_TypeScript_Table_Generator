import React from 'react';
import { useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { IPerson } from '../makeData/makeData';
import makeData from '../makeData/makeData';
import './Table.css';


function Table() {
  const data: IPerson[] = useMemo(() => makeData(100), [])

  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        sortType: 'basic',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        sortType: 'basic',
      },
      {
        Header: 'Course',
        accessor: 'course',
        sortType: 'basic',
      },
      {
        Header: 'Grade',
        accessor: 'grade',
        sortType: 'basic',
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <div className="main">
        <div className="table">
          <div className="wrapper">
            <div className="table-name">
              <h3>Table name</h3>
            </div>
          </div>
          <div>
            <table className='dynamic-table' {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        </div>

    </>
  );
}

export default Table;
