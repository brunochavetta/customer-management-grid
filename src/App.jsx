import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import data from './data.json';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [filters, setFilters] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        country: '',
        ip_address: '',
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

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Filters */}
                    <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-200">
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.first_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.last_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.gender}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.country}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ip_address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <select
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={10}>10 rows</option>
                                <option value={20}>20 rows</option>
                                <option value={50}>50 rows</option>
                                <option value={100}>100 rows</option>
                            </select>
                            <span className="text-sm text-gray-700">
                                Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} results
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronsLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronsRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;