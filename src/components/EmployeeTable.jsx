// src/components/EmployeeTable.js

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortColumn, toggleSortOrder, setSelectedCountry, setSelectedGender } from "../redux/actions";
import { TiFilter } from "react-icons/ti";
import { TbArrowsSort } from "react-icons/tb";

function EmployeeTable() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const selectedCountry = useSelector((state) => state.selectedCountry);
  const selectedGender = useSelector((state) => state.selectedGender);
  const sortColumn = useSelector((state) => state.sortColumn);
  const sortOrder = useSelector((state) => state.sortOrder);

  const observer = useRef();

  const lastUserElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users?limit=10&skip=${(page - 1) * 10}`);
        const json = await res.json();
        if (json.users.length > 0) {
          setItems((prevItems) => [...prevItems, ...json.users]);
          setDataIsLoaded(true);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  const filteredItems = items.filter(
    (item) =>
      (selectedCountry === "country" || item.address.country === selectedCountry) &&
      (selectedGender === "Gender" || item.gender.toLowerCase() === selectedGender.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    let aValue, bValue;
    if (sortColumn === "name") {
      aValue = `${a.firstName} ${a.maidenName} ${a.lastName}`.toLowerCase();
      bValue = `${b.firstName} ${b.maidenName} ${b.lastName}`.toLowerCase();
    } else if (sortColumn === "age") {
      aValue = a.age;
      bValue = b.age;
    } else {
      aValue = a[sortColumn];
      bValue = b[sortColumn];
    }
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (!dataIsLoaded) {
    return (
      <div>
        <h1>Please wait some time....</h1>
      </div>
    );
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      dispatch(toggleSortOrder());
    } else {
      dispatch(setSortColumn(column));
    }
  };

  const handleCountryChange = (event) => {
    dispatch(setSelectedCountry(event.target.value));
  };

  const handleGenderChange = (event) => {
    dispatch(setSelectedGender(event.target.value));
  };

  const getSortIconColor = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? "text-blue-500" : "text-red-500";
    }
    return "text-gray-500";
  };

  return (
    <div className="m-10 border-2 border-gray-400">
      <div className="mx-5 mt-5 p-1">
        <div className="flex h-24 justify-between align-middle">
          <div>
            <h1 className="font-bold text-red-600 text-3xl">Employees</h1>
          </div>
          <div className="flex gap-5 h-10">
            <div>
              <TiFilter style={{ color: "red", height: "30px", width: "30px" }} />
            </div>
            <select value={selectedCountry} onChange={handleCountryChange} className="border border-gray-300 p-2 rounded">
              <option value="country">Select Country</option>
              <option value="United States">USA</option>
              <option value="India">India</option>
              <option value="Nepal">Nepal</option>
              <option value="China">China</option>
            </select>
            <select value={selectedGender} onChange={handleGenderChange} className="border border-gray-300 p-2 rounded">
              <option value="Gender">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mx-5 mb-5 relative max-h-[400px] overflow-y-auto">
        <table className="border-collapse w-full border border-slate-500">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th
                className="border border-slate-500 p-2 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  Id <TbArrowsSort className={`ml-1 ${getSortIconColor("id")}`} />
                </div>
              </th>
              <th className="border border-slate-500 p-2">Image</th>
              <th
                className="border border-slate-500 p-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name <TbArrowsSort className={`ml-1 ${getSortIconColor("name")}`} />
                </div>
              </th>
              <th
                className="border border-slate-500 p-2 cursor-pointer"
                onClick={() => handleSort("age")}
              >
                <div className="flex items-center">
                  Age <TbArrowsSort className={`ml-1 ${getSortIconColor("age")}`} />
                </div>
              </th>
              <th className="border border-slate-500 p-2">Demography</th>
              <th className="border border-slate-500 p-2">Designation</th>
              <th className="border border-slate-500 p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item, index) => {
              const isLastItem = sortedItems.length === index + 1;
              return (
                <tr key={item.id} ref={isLastItem ? lastUserElementRef : null}>
                  <td className="border border-slate-500 p-2">{item.id}</td>
                  <td className="border border-slate-500 p-2">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={item.image}
                      alt={item.firstName}
                      width={50}
                    />
                  </td>
                  <td className="border border-slate-500 p-2">{`${item.firstName} ${item.maidenName} ${item.lastName}`}</td>
                  <td className="border border-slate-500 p-2">{item.age}</td>
                  <td className="border border-slate-500 p-2">
                    {item.gender === "male" ? "M" : "F"}
                  </td>
                  <td className="border border-slate-500 p-2">{item.company.title}</td>
                  <td className="border border-slate-500 p-2">{`${item.address.state}, ${
                    item.address.country === "United States" ? "USA" : item.address.country
                  }`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {hasMore && <p className="text-center p-2">Loading more items...</p>}
      </div>
    </div>
  );
}

export default EmployeeTable;





