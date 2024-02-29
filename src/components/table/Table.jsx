import React  from 'react';
import './Table.style.css';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = () => {
  return (
    <div className="scroll-table">
      <table>
        <TableHeader />
      </table>
      <div className="scroll-table-body">
        <table>
          <TableBody  />
        </table>
      </div>
    </div>
  );
};

export default Table;