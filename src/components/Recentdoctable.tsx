'use client'
import React from 'react'

export default function RecentDocumentTable() {
    const documents = [
        {
            name: 'Document 1',
            type: 'Type A',
            size: '1.2 MB',
            branch: 'Branch 1',
            unit: 'Unit 1',
            center: 'Center 1',
            status: 'Active',
            uploaded: '2023-10-01'
        },{
            name: 'Document 2',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 3',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 4',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 5',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 6',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 7',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 8',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 9',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 10',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },{
            name: 'Document 11',
            type: 'Type B',
            size: '2.5 MB',
            branch: 'Branch 2',
            unit: 'Unit 2',
            center: 'Center 2',
            status: 'In Active',
            uploaded: '2023-10-02'
        },
    ]
    return (
        <div className="text-[#112D4E]">
            <div className='w-full overflow-x-auto'>
                <table className="min-w-full text-sm text-left text-[#112D4E] bg-white">
                    <thead className='bg-[#CCE3FF] text-[#112D4E] text-sm uppercase font-semibold'>
                        <tr>
                            <th className="py-2 px-2 border-b">Document Name</th>
                            <th className="py-2 px-2 border-b">Document Type</th>
                            <th className="py-2 px-2 border-b">Size</th>
                            <th className="py-2 px-2 border-b">Branch</th>
                            <th className="py-2 px-2 border-b">Unit</th>
                            <th className="py-2 px-2 border-b">Center</th>
                            <th className="py-2 px-2 border-b">Account Status</th>
                            <th className="py-2 px-2 border-b">Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.name} className="hover:bg-[#f0f4ff] transition-colors text-xs rounded-lg text-center">
                                <td className="py-2 px-1 border-b">{doc.name}</td>
                                <td className="py-2 px-1 border-b">{doc.type}</td>
                                <td className="py-2 px-1 border-b">{doc.size}</td>
                                <td className="py-2 px-1 border-b">{doc.branch}</td>
                                <td className="py-2 px-1 border-b">{doc.unit}</td>
                                <td className="py-2 px-1 border-b">{doc.center}</td>
                                <td className="py-2 px-1 border-b">{doc.status}</td>
                                <td className="py-2 px-1 border-b">{doc.uploaded}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}