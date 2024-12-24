import React, { useState } from 'react';

function App() {
  const [filters, setFilters] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    ip_address: '',
    country: '',
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(filters).map((field) => (
                    <th
                      key={field}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort(field)}
                    >
                      <div className="flex items-center gap-2">
                        {field.replace('_', ' ')}
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.first_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
