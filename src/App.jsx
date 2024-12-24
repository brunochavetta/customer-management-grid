import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';
import data from './data.json';

function App() {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [filters, setFilters] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        ip_address: '',
        country: '',
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
            if (sortDirection === 'desc') {
                setSortField(null);
            }
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
            });
        });
    }, [filters]);

    const sortedData = useMemo(() => {
        if (!sortField || !sortDirection) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredData, sortField, sortDirection]);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Filters */}
                    <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200">
                        {Object.keys(filters).map((field) => (
                            <input
                                key={field}
                                type="text"
                                placeholder={`Filter ${field.replace('_', ' ')}`}
                                value={filters[field]}
                                onChange={(e) => handleFilterChange(field, e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

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
