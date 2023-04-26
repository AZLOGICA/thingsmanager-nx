import React, { useEffect } from 'react'
import { useTable, usePagination, useSortBy} from 'react-table'

export const Table = ({
  columns,
  data,
  fetchData,
  loading,
  totalSize,
  customPageSize = 20,
  pageCount: controlledPageCount,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
   
    //useSortBy,
    usePagination,
  )

  useEffect( ()=> {
  //  setPageSize(customPageSize)
  }, [])

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  // Render the UI for your table
  return (
    <>

      <table className="table w-full rounded-xl border-lg shadow-lg" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="!bg-slate-50 align-baseline" {...column.getHeaderProps()}>
                  <div className="flex ">
                    <div className="text-xs text-slate-600  px-2 ">
                      {column.render('Header')}
                    </div>


                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}  className="hover text-sm font-normal">
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
                   <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              /*  <td colSpan="10000">Loading...</td> */
              <td colSpan="10000">
                <div className="p-4">
                  <button
                    type="button"
                    className="  flex text-lg font-bold"
                    disabled
                  >
                    <svg
                      className="animate-spin h-5 w-5 mr-3 bg-slate-800  "
                      viewBox="0 0 24 24"
                    ></svg>
                    Cargando...
                  </button>
                </div>
              </td>
            ) : (
              <td colSpan="10000" className="text-sm font-bold">
             Mostrando {page.length} de {totalSize}{" "}
                resultados
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
        <div className="pagination my-6">
        {/*<button
          className="btn btn-square btn-sm bg-slate-800"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
   
          {"<<"}
        </button>
         */}
        <button
          className="btn btn-square  btn-sm bg-slate-800"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="btn btn-square  btn-sm bg-slate-800"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>
        {/*}
        <button
          className="btn btn-square  btn-sm bg-slate-800"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
        */}
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        {/*
        <span>
          | Ir a la página:{" "}
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>
        */}
        <span> |   Items en total <span className='font-bold'>{totalSize}</span></span>
        {/*
        <select
          className="select select-bordered w-full max-w-xs"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[20,50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrando {pageSize} items
            </option>
          ))}
        </select>
        */}
       
      </div>
    </>
  )
}
