// Dummy data for API monitoring dashboard
// This data is used to populate the table in the API monitoring dashboard
// Each entry in the table represents an API with various attributes
// such as name, status, uptime, latency, error rate, requests per minute, and creator
// The data is structured as an array of arrays, where each inner array represents a row in the table
// The Datagrid component could be used to display this data in a tabular format, it could be customized for any specific use case


// Use Case: API Monitoring Dashboard
// Header configuration for the API monitoring dashboard
export const tableHeaderData = [
    { columnName: 'API Name', sort: true, filter: false },
    { columnName: 'Status', sort: true, filter: true },
    { columnName: 'Uptime', sort: true, filter: false },
    { columnName: 'Avg Latency', sort: true, filter: false },
    { columnName: 'Error Rate', sort: false, filter: false },
    { columnName: 'Requests/Min', sort: true, filter: false },
    { columnName: 'Created By', sort: true, filter: false }
];

// Dummy table data for API monitoring dashboard
export const originalTableData = [
    // Each entry represents a row in the table
    [
        1, // Row ID
        { 'text': 'D - Logistic API' }, // API Name
        {
            'text': 'Down', // Status
            'level': 1,
            'decorator': {
                'status': {
                    "type": 'error', // Status type for UI (error, warning, success)
                    "badge": true,
                }
            }
        },
        '95.5%', // Uptime
        '198ms', // Avg Latency
        '0.5%', // Error Rate
        '10 req/min', // Requests/Min
        {
            'text': 'John Doe', // Created By
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'John Doe',
                }
            }
        }
    ],
    // ... (other rows follow the same structure)
    // For brevity, only the first row is fully commented.
    [
        2,
        { 'text': 'B - Payment API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '111ms',
        '0.9%',
        '20 req/min',
        {
            'text': 'Jane Smith',
            'decorator': {
                'avatar': {
                    'src': 'https://images.pexels.com/photos/1181343/pexels-photo-1181343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'alt': 'Jane Smith',
                }
            }
        }
    ],
    // ... (remaining rows omitted for brevity)
    [
        3,
        { 'text': 'F - User API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '170ms',
        '0.7%',
        '15 req/min',
        {
            'text': 'Alice Johnson',
            'decorator': {
                'avatar': {
                    'src': 'https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'alt': 'Alice Johnson',
                }
            }
        }
    ],
    [
        4,
        { 'text': 'A - Inventory API' },
        {
            'text': 'Error',
            'level': 1,
            'decorator': {
                'status': {
                    "type": 'error',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '140ms',
        '0.4%',
        '5 req/min',
        {
            'text': 'Bob Brown',
            'decorator': {
                'avatar': {
                    'src': 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'alt': 'Bob Brown',
                }
            }
        }
    ],
    [
        5,
        { 'text': 'E - Order API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '101ms',
        '0.1%',
        '25 req/min',
        {
            'text': 'Charlie Davis',
            'decorator': {
                'avatar': {
                    'src': 'https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'alt': 'Charlie Davis',
                }
            }
        }
    ],
    [
        6,
        { 'text': 'C - Shipping API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '120ms',
        '0.3%',
        '30 req/min',
        {
            'text': 'David Wilson',
            'decorator': {
                'avatar': {
                    'src': 'https://images.pexels.com/photos/4974916/pexels-photo-4974916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'alt': 'David Wilson',
                }
            }
        }
    ],
    [
        7,
        { 'text': 'G - Notification API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '90ms',
        '0.2%',
        '12 req/min',
        {
            'text': 'Eve Martinez',
            'decorator': {
                'avatar': {
                    'src': 'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'alt': 'Eve Martinez',
                }
            }
        }
    ],
    [
        8,
        { 'text': 'H - Analytics API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '130ms',
        '0.6%',
        '8 req/min',
        {
            'text': 'Frank Garcia',
            'decorator': {
                'avatar': {
                    'src': 'https://images.pexels.com/photos/6326413/pexels-photo-6326413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    'alt': 'Frank Garcia',
                }
            }
        }
    ],
    [
        9,
        { 'text': 'I - Reporting API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '110ms',
        '0.4%',
        '18 req/min',
        {
            'text': 'Grace Lee',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Grace Lee',
                }
            }
        }
    ],
    [
        10,
        { 'text': 'J - Car API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '125ms',
        '0.5%',
        '22 req/min',
        {
            'text': 'Henry Kim',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Henry Kim',
                }
            }
        }
    ],
    [
        11,
        { 'text': 'K - Alert API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '95ms',
        '0.2%',
        '14 req/min',
        {
            'text': 'Ivy Chen',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Ivy Chen',
                }
            }
        }
    ],
    [
        12,
        { 'text': 'L - Driver API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '135ms',
        '0.6%',
        '16 req/min',
        {
            'text': 'Jack Brown',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Jack Brown',
                }
            }
        }
    ],
    [
        13,
        { 'text': 'M - Emergency API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '100ms',
        '0.1%',
        '20 req/min',
        {
            'text': 'Kathy Wilson',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Kathy Wilson',
                }
            }
        }
    ],
    [
        14,
        { 'text': 'N - GPS API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '115ms',
        '0.4%',
        '12 req/min',
        {
            'text': 'Leo Martinez',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Leo Martinez',
                }
            }
        }
    ],
    [
        15,
        { 'text': 'O - Warning API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '105ms',
        '0.3%',
        '18 req/min',
        {
            'text': 'Mia Taylor',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Mia Taylor',
                }
            }
        }
    ],
    [
        16,
        { 'text': 'P - Route API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '140ms',
        '0.5%',
        '22 req/min',
        {
            'text': 'Noah Anderson',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Noah Anderson',
                }
            }
        }
    ],
    [
        17,
        { 'text': 'Q - Location API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '95ms',
        '0.2%',
        '14 req/min',
        {
            'text': 'Olivia Thomas',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Olivia Thomas',
                }
            }
        }
    ],
    [
        18,
        { 'text': 'R - History API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '130ms',
        '0.6%',
        '16 req/min',
        {
            'text': 'Liam Jackson',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Liam Jackson',
                }
            }
        }
    ],
    [
        19,
        { 'text': 'S - Trip API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '110ms',
        '0.4%',
        '20 req/min',
        {
            'text': 'Sophia White',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Sophia White',
                }
            }
        }
    ],
    [
        20,
        { 'text': 'T - Vehicle API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '125ms',
        '0.5%',
        '22 req/min',
        {
            'text': 'James Harris',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'James Harris',
                }
            }
        }
    ],
    [
        21,
        { 'text': 'U - Fleet API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '95ms',
        '0.2%',
        '14 req/min',
        {
            'text': 'Ava Clark',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Ava Clark',
                }
            }
        }
    ],
    [
        22,
        { 'text': 'V - Driver API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '135ms',
        '0.6%',
        '16 req/min',
        {
            'text': 'Mason Lewis',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Mason Lewis',
                }
            }
        }
    ],
    [
        23,
        { 'text': 'W - Vehicle API' },
        {
            'text': 'Error',
            'level': 1,
            'decorator': {
                'status': {
                    "type": 'error',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '100ms',
        '0.1%',
        '20 req/min',
        {
            'text': 'Isabella Walker',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Isabella Walker',
                }
            }
        }
    ],
    [
        24,
        { 'text': 'X - Fleet API' },
        {
            'text': 'Degraded',
            'level': 2,
            'decorator': {
                'status': {
                    "type": 'warning',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '115ms',
        '0.4%',
        '12 req/min',
        {
            'text': 'Ethan Hall',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Ethan Hall',
                }
            }
        }
    ],
    [
        25,
        { 'text': 'Y - Trip API' },
        {
            'text': 'Up',
            'level': 3,
            'decorator': {
                'status': {
                    "type": 'success',
                    "badge": true,
                }
            }
        },
        '99.9%',
        '105ms',
        '0.3%',
        '18 req/min',
        {
            'text': 'Charlotte Young',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Charlotte Young',
                }
            }
        }
    ],
    [
        26,
        { 'text': 'Z - Location API' },
        {
            'text': 'Error',
            'level': 1,
            'decorator': {
                'status': {
                    "type": 'error',
                    "badge": true,
                }
            }
        },
        '98.8%',
        '140ms',
        '0.5%',
        '22 req/min',
        {
            'text': 'Alexander King',
            'decorator': {
                'avatar': {
                    'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
                    'alt': 'Alexander King',
                }
            }
        }
    ]
];

// Use Case: Cardgrid Component - Donor and Prospect
// Dummy data for Cardgrid component
export const dummyProspects = [
    {
        id: 1,
        name: "Budi Santoso",
        age: 32,
        gender: "Male",
        bloodType: "A+",
        location: "Jakarta",
        phone: "+62 812-3456-7890",
        email: "budi.santoso@email.com",
        lastDonation: "2024-12-10",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        status: "NEW",
        tags: ["Blood Donor", "Potential Donor"]
    },
    {
        id: 2,
        name: "Siti Aminah",
        age: 28,
        gender: "Female",
        bloodType: "O-",
        location: "Bandung",
        phone: "+62 813-9876-5432",
        email: "siti.aminah@email.com",
        lastDonation: "2024-10-22",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        status: "NEW",
        tags: ["Blood Donor"]
    },
    {
        id: 3,
        name: "Agus Wijaya",
        age: 40,
        gender: "Male",
        bloodType: "B+",
        location: "Surabaya",
        phone: "+62 811-2233-4455",
        email: "agus.wijaya@email.com",
        lastDonation: "2024-08-15",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
        status: "NEW",
        tags: ["Blood Donor", "Potential Donor"]
    },
    {
        id: 4,
        name: "Maria Fransiska",
        age: 35,
        gender: "Female",
        bloodType: "AB+",
        location: "Yogyakarta",
        phone: "+62 812-9988-7766",
        email: "maria.fransiska@email.com",
        lastDonation: "2024-07-20",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        status: "NEW",
        tags: ["Blood Donor"]
    },
    {
        id: 5,
        name: "Rizky Pratama",
        age: 29,
        gender: "Male",
        bloodType: "O+",
        location: "Medan",
        phone: "+62 813-5566-7788",
        email: "rizky.pratama@email.com",
        lastDonation: "2024-09-05",
        image: "https://randomuser.me/api/portraits/men/77.jpg",
        status: "NEW",
        tags: ["Potential Donor"]
    },
    {
        id: 6,
        name: "Dewi Lestari",
        age: 27,
        gender: "Female",
        bloodType: "A-",
        location: "Semarang",
        phone: "+62 812-3344-5566",
        email: "dewi.lestari@email.com",
        lastDonation: "2024-06-18",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        status: "NEW",
        tags: ["Blood Donor", "Potential Donor"]
    }
];


// Chart's dummy data
export const donorPieData = [
    { label: 'Active Donors', value: 120 },     // slate-500
    { label: 'Inactive Donors', value: 45 },    // slate-800
    { label: 'New Prospects', value: 60 },      // slate-900
    { label: 'Rejected Prospects', value: 15 },
    { label: 'Pending Verification', value: 22 }, 
    { label: 'Lost Contact', value: 10 },         
    { label: 'Reactivated Donors', value: 8 },    
]

export const stats = [
    { label: 'Donors', value: 120 },
    { label: 'Requests', value: 45 },
    { label: 'Approved', value: 38 },
    { label: 'Rejected', value: 7 },
]

export const chartData = [
    { label: 'Jan', value: 10 },
    { label: 'Feb', value: 20 },
    { label: 'Mar', value: 15 },
    { label: 'Apr', value: 30 },
    { label: 'May', value: 100 },
]

export const donorProspectData = [
    { label: 'Jan', newDonors: 25, newProspects: 40 },
    { label: 'Feb', newDonors: 30, newProspects: 35 },
    { label: 'Mar', newDonors: 28, newProspects: 50 },
    { label: 'Apr', newDonors: 40, newProspects: 45 },
    { label: 'May', newDonors: 38, newProspects: 60 },
]

export const donorProspectSeries = [
    { key: 'newDonors', label: 'New Donors', color: 'primary' },    // slate-500
    { key: 'newProspects', label: 'New Prospects', color: 'secondary' } // sky-500
]

export const dummyMapData = [
    { id: 'ID.JK', name: 'DKI Jakarta', donors: 120, prospects: 60 },
    { id: 'ID.JR', name: 'Jawa Barat', donors: 80, prospects: 40 },
    { id: 'ID.JT', name: 'Jawa Tengah', donors: 70, prospects: 30 },
    { id: 'ID.JI', name: 'Jawa Timur', donors: 90, prospects: 50 },
    { id: 'ID.BT', name: 'Banten', donors: 40, prospects: 20 },
    { id: 'ID.YO', name: 'DI Yogyakarta', donors: 30, prospects: 15 },
]