import React, { useEffect } from "react";
import { useState, useRef } from "react";

const Table = () => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <THead />
      <TBody />
    </table>
  );
};

export default Table;

const THead = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Nama
        </th>
        <th scope="col" className="px-6 py-3">
          Jam
        </th>
        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
          Total
        </th>
        <th scope="col" className="px-6 py-3">
          checklist
        </th>
      </tr>
    </thead>
  );
};
const TBody = () => {
  const [queryName, setqueryName] = useState("");
  const [queryTime, setqueryTime] = useState("");
  const [queryTotal, setqueryTotal] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [content, setContent] = useState([]);
  const inputNameRef = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    if (!queryName && !queryTime && !queryTotal) return;
    const data = {
      queryName,
      queryTime,
      queryTotal,
      check: false,
    };

    setContent([...content, data]);

    setqueryName("");
    setqueryTime("");
    setqueryTotal("");
  };

  const handleCheckClick = (queryName) => {
    setContent((content) =>
      content.map((item) =>
        item.queryName == queryName ? { ...item, check: !item.check } : item
      )
    );
  };

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);
  return (
    <tbody>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >
          <input
            type="text"
            className=" border border-black px-2 py-1 rounded-md"
            value={queryName}
            ref={inputNameRef}
            onChange={(e) => setqueryName(e.target.value)}
          />
        </th>
        <td className="px-6 py-4">
          <input
            type="text"
            className=" border border-black px-2 py-1 rounded-md"
            value={queryTime}
            onChange={(e) => setqueryTime(e.target.value)}
          />
        </td>
        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
          <input
            type="number"
            className=" border border-black px-2 py-1 rounded-md"
            value={queryTotal}
            onChange={(e) => setqueryTotal(e.target.value)}
          />
        </td>

        <td className="px-6 py-4">
          <button
            onClick={(e) => handleClick(e)}
            className="px-6 py-2 bg-blue-500 rounded-md  text-white hover:bg-blue-600"
          >
            Enter
          </button>
        </td>
      </tr>
      {content.map((item, i) => (
        <tr
          key={i + crypto.randomUUID()}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          <th
            scope="row"
            className={`${
              item.check && "line-through"
            }  px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800`}
          >
            {item.queryName}
          </th>
          <td className={`${item.check && "line-through"} px-6 py-4`}>
            {item.queryTime}
          </td>
          <td
            className={`${
              item.check && "line-through"
            } px-6 py-4 bg-gray-50 dark:bg-gray-800`}
          >
            {item.queryTotal}
          </td>
          <td className="px-6 py-4">
            <input
              type="checkbox"
              checked={item.check}
              onChange={() => handleCheckClick(item.queryName)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};
