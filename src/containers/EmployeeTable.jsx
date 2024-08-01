import React from 'react'

const EmployeeTable = () => {
  return (
    <div className="mx-5 mb-5">
        <table className="border-collapse w-full border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-500">Id</th>
              <th className="border border-slate-500">Image</th>
              <th className="border border-slate-500">Full Name</th>
              <th className="border border-slate-500">Demography</th>
              <th className="border border-slate-500">Designation</th>
              <th className="border border-slate-500">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => {
              if (filteredItems.length === index + 1) {
                return (
                  <tr key={item.id} ref={lastUserElementRef}>
                    <td className="border border-slate-500">{item.id}</td>
                    <td className="border border-slate-500">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={item.image}
                        alt={item.firstName}
                        width={50}
                      />
                    </td>
                    <td className="border border-slate-500">{`${item.firstName} ${item.maidenName} ${item.lastName}`}</td>
                    <td className="border border-slate-500">
                      {item.gender === "male" ? "M" : "F"}/{item.age}
                    </td>
                    <td className="border border-slate-500">
                      {item.company.title}
                    </td>
                    <td className="border border-slate-500">{`${item.address.state}, ${
                      item.address.country === "United States"
                        ? "USA"
                        : item.address.country
                    }`}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={item.id}>
                    <td className="border border-slate-500">{item.id}</td>
                    <td className="border border-slate-500">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={item.image}
                        alt={item.firstName}
                        width={50}
                      />
                    </td>
                    <td className="border border-slate-500">{`${item.firstName} ${item.maidenName} ${item.lastName}`}</td>
                    <td className="border border-slate-500">
                      {item.gender === "male" ? "M" : "F"}/{item.age}
                    </td>
                    <td className="border border-slate-500">
                      {item.company.title}
                    </td>
                    <td className="border border-slate-500">{`${item.address.state}, ${
                      item.address.country === "United States"
                        ? "USA"
                        : item.address.country
                    }`}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        {loading && <p>Loading more items...</p>}
      </div>
  )
}

export default EmployeeTable
