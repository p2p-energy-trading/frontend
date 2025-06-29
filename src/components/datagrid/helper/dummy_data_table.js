// Use Case: API Monitoring Dashboard
// Header configuration for the API monitoring dashboard
export const apiMonitorTableHeaderData = [
    { columnName: 'API Name', sort: true, filter: false },
    { columnName: 'Status', sort: true, filter: true },
    { columnName: 'Uptime', sort: true, filter: false },
    { columnName: 'Avg Latency', sort: true, filter: false },
    { columnName: 'Error Rate', sort: false, filter: false },
    { columnName: 'Requests/Min', sort: true, filter: false },
    { columnName: 'Created By', sort: true, filter: false }
];

// Dummy table data for API monitoring dashboard
export const apiMonitorTableData = [
    // Each entry represents a row in the table
    [
        1, // Row ID
        'D - Logistic API', // API Name
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
        'B - Payment API',
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
        'F - User API',
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
        'A - Inventory API',
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
        'E - Order API' ,
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
        'C - Shipping API' ,
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
        'G - Notification API' ,
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
        'H - Analytics API' ,
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
        'I - Reporting API',
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
        'J - Car AP',
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
        'K - Alert API',
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
        'L - Driver API',
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
        'M - Emergency API',
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
        'N - GPS API',
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
        'O - Warning API',
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
        'P - Route API',
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
        'Q - Location API',
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
        'R - History API',
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
        'S - Trip API',
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
        'T - Vehicle API',
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
        'U - Fleet API',
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
        'V - Driver API',
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
        'W - Vehicle API',
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
        'X - Fleet API',
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
        'Y - Trip API',
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
        'Z - Location API',
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



// Use Case: ecommerce 
// Header configuration 
export const ecommerceTableHeaderData = [
    {
        columnName: 'Name', sort: {
            'behavior': 'text',
        }, filter: false
    },
    { columnName: 'Profile', sort: true, filter: false },
    {
        columnName: 'Amount', sort: {
            'behavior': 'number',
        }, filter: false
    },
    { columnName: 'Product Name', sort: true, filter: false },
    {
        columnName: 'Purchase Date', sort: {
            'behavior': 'date',
        }, filter: false
    },
    { columnName: 'OrderID', sort: false, filter: false },
    { columnName: 'Email', sort: true, filter: false },
    { columnName: 'Phone Number', sort: true, filter: false },
    { columnName: 'Status', sort: true, filter: true },
    { columnName: 'Payment Method', sort: true, filter: true },
    { columnName: 'Shipping Address', sort: false, filter: false },
    { columnName: 'City', sort: true, filter: false },
    { columnName: 'Country', sort: true, filter: false },
    {
        columnName: 'Discount', sort: {
            'behavior': 'number',
        }, filter: false
    },
    {
        columnName: 'Tax', sort: {
            'behavior': 'number',
        }, filter: false
    },
    {
        columnName: 'Total Amount', sort: {
            'behavior': 'number',
        }, filter: false
    },
    { columnName: 'PIC', sort: true, filter: false },
    {
        columnName: 'Last Updated', sort: {
            'behavior': 'date',
        }, filter: false
    },
    { columnName: 'Notes', sort: false, filter: false }
];

// Dummy table data 
export const ecommerceTableData = [
    // Each entry represents a row in the table
    [
        1,
        {
            'text': 'Hamzah Syarif',
            'decorator': {
                'avatar': { 'src': 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp', 'alt': 'Hamzah Syarif' }
            }
        },
        { 'text': 'https://example.com/profile/hamzah', 'decorator': "link" },
        '73.5$',
        'Alpan Shoes L20',
        '2023-10-01',
        'ORDER-ID-123842390458102943',
        'test@test.com',
        '+1-234-567-8900',
        {
            'text': 'Shipped', 'level': 2,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Credit Card',
        '123 Main St, Apt 4B',
        'New York',
        'USA',
        '10%',
        '5%',
        '88.5$',
        'John Doe',
        '2023-10-02',
        'No notes available',
    ],
    [
        2,
        {
            'text': 'Gita Prameswari',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/2.jpg', 'alt': 'Gita Prameswari' }
            }
        },
        { 'text': 'https://example.com/profile/gita', 'decorator': "link" },
        '112.0$',
        'Nimbus Jacket',
        '2023-09-12',
        'ORDER-ID-5692487298374',
        'gita@email.com',
        '+1-345-678-1234',
        {
            'text': 'Processing', 'level': 1,
            'decorator': { 'status': { "type": 'warning', "badge": true } }
        },
        'PayPal',
        '456 Elm St',
        'Los Angeles',
        'USA',
        '15%',
        '8%',
        '124.0$',
        'Jane Smith',
        '2023-09-13',
        'Delayed due to stock',
    ],
    [
        3,
        {
            'text': 'Rahmat Hidayat',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/3.jpg', 'alt': 'Rahmat Hidayat' }
            }
        },
        { 'text': 'https://example.com/profile/rahmat', 'decorator': "link" },
        '45.0$',
        'Sahara T-Shirt',
        '2023-11-05',
        'ORDER-ID-1234567890',
        'rahmat@domain.com',
        '+1-222-333-4444',
        {
            'text': 'Delivered', 'level': 3,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Bank Transfer',
        '789 Pine St',
        'Chicago',
        'USA',
        '0%',
        '5%',
        '47.25$',
        'Arian Putra',
        '2023-11-06',
        'Package left at door',
    ],
    [
        4,
        {
            'text': 'Lisa Kosasih',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/4.jpg', 'alt': 'Lisa Kosasih' }
            }
        },
        { 'text': 'https://example.com/profile/lisa', 'decorator': "link" },
        '88.9$',
        'Mystic Jeans',
        '2023-10-15',
        'ORDER-ID-9876543210',
        'lisa.k@email.com',
        '+1-777-888-9999',
        {
            'text': 'Returned', 'level': 0,
            'decorator': { 'status': { "type": 'error', "badge": true } }
        },
        'COD',
        '174 Northway',
        'Houston',
        'USA',
        '5%',
        '4%',
        '85.1$',
        'Budi Putra',
        '2023-10-16',
        'Damaged item',
    ],
    [
        5,
        {
            'text': 'Ahmad Fauzi',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/5.jpg', 'alt': 'Ahmad Fauzi' }
            }
        },
        { 'text': 'https://example.com/profile/ahmad', 'decorator': "link" },
        '99.0$',
        'Velocity Runner',
        '2023-12-21',
        'ORDER-ID-1234567890',
        'fauzi@shop.com',
        '+1-666-321-1234',
        {
            'text': 'Pending', 'level': 1,
            'decorator': { 'status': { "type": 'warning', "badge": true } }
        },
        'Debit Card',
        '321 Willow Ct',
        'San Francisco',
        'USA',
        '20%',
        '7%',
        '106.5$',
        'Addin Syah',
        '2023-12-22',
        'Waiting for payment',
    ],
    [
        6,
        {
            'text': 'Rina Melati',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/6.jpg', 'alt': 'Rina Melati' }
            }
        },
        { 'text': 'https://example.com/profile/rina', 'decorator': "link" },
        '59.5$',
        'Sigma Dress',
        '2023-08-20',
        'ORDER-ID-1234567890',
        'rina@flower.com',
        '+1-888-234-5678',
        {
            'text': 'Shipped', 'level': 2,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'E-Wallet',
        '213 Sunset Ave',
        'Seattle',
        'USA',
        '0%',
        '5%',
        '62.5$',
        'Wulan Rahayu',
        '2023-08-21',
        'Express shipping',
    ],
    [
        7,
        {
            'text': 'Bryan Yudhistira',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/7.jpg', 'alt': 'Bryan Yudhistira' }
            }
        },
        { 'text': 'https://example.com/profile/bryan', 'decorator': "link" },
        '230.0$',
        'Tropical Suit',
        '2023-07-13',
        'ORDER-ID-1234567890',
        'yudhistira@outlook.com',
        '+1-444-222-3333',
        {
            'text': 'Paid', 'level': 1,
            'decorator': { 'status': { "type": 'info', "badge": true } }
        },
        'Apple Pay',
        '565 Park Blvd',
        'Miami',
        'USA',
        '8%',
        '10%',
        '252.8$',
        'Arif Budiman',
        '2023-07-14',
        'Gift wrapped',
    ],
    [
        8,
        {
            'text': 'Dewi Kumala',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/8.jpg', 'alt': 'Dewi Kumala' }
            }
        },
        { 'text': 'https://example.com/profile/dewi', 'decorator': "link" },
        '66.6$',
        'Aurora Scarf',
        '2023-10-23',
        'ORDER-ID-1234567890',
        'dewi@email.id',
        '+1-654-321-7890',
        {
            'text': 'Pending', 'level': 1,
            'decorator': { 'status': { "type": 'warning', "badge": true } }
        },
        'Credit Card',
        '935 Ocean Dr',
        'Santa Monica',
        'USA',
        '0%',
        '2%',
        '67.9$',
        'Reza Syamsu',
        '2023-10-24',
        'Customer requested invoice',
    ],
    [
        9,
        {
            'text': 'Indra Setiawan',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/9.jpg', 'alt': 'Indra Setiawan' }
            }
        },
        { 'text': 'https://example.com/profile/indra', 'decorator': "link" },
        '120.3$',
        'Eclipse Backpack',
        '2023-12-04',
        'ORDER-ID-1234567890',
        'indra@testing.com',
        '+1-555-123-4567',
        {
            'text': 'Cancelled', 'level': 0,
            'decorator': { 'status': { "type": 'error', "badge": true } }
        },
        'Bank Transfer',
        '849 Tree Ln',
        'Portland',
        'USA',
        '12%',
        '4%',
        '113.05$',
        'Nina Kusuma',
        '2023-12-05',
        'Duplicate order',
    ],
    [
        10,
        {
            'text': 'Siti Zulaiha',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/10.jpg', 'alt': 'Siti Zulaiha' }
            }
        },
        { 'text': 'https://example.com/profile/siti', 'decorator': "link" },
        '79.99$',
        'Classic Wallet',
        '2023-11-22',
        'ORDER-ID-1234567890',
        'siti@gmail.com',
        '+1-123-555-4321',
        {
            'text': 'Delivered', 'level': 3,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Go-Pay',
        '12 Cedar St',
        'Phoenix',
        'USA',
        '0%',
        '3%',
        '82.39$',
        'Dewi Lestari',
        '2023-11-23',
        'Reviewed by customer',
    ],
    [
        11,
        {
            'text': 'Kevin Anggara',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/11.jpg', 'alt': 'Kevin Anggara' }
            }
        },
        { 'text': 'https://example.com/profile/kevin', 'decorator': "link" },
        '134.50$',
        'Urban Watch',
        '2023-08-29',
        'ORDER-ID-1234567890',
        'kevinda@urban.com',
        '+1-232-435-9876',
        {
            'text': 'Paid', 'level': 1,
            'decorator': { 'status': { "type": 'info', "badge": true } }
        },
        'Credit Card',
        '55 Hilltop',
        'San Diego',
        'USA',
        '5%',
        '6%',
        '146.58$',
        'Anita Putri',
        '2023-08-30',
        'High value item',
    ],
    [
        12,
        {
            'text': 'Dian Octaviani',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/12.jpg', 'alt': 'Dian Octaviani' }
            }
        },
        { 'text': 'https://example.com/profile/dian', 'decorator': "link" },
        '53.5$',
        'Retro Necklace',
        '2023-09-15',
        'ORDER-ID-1234567890',
        'dian@retro.com',
        '+1-643-112-8293',
        {
            'text': 'Shipped', 'level': 2,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Ovo',
        '78 Woodside Dr',
        'Baltimore',
        'USA',
        '20%',
        '8%',
        '56.78$',
        'Rangga Yudha',
        '2023-09-16',
        'Gift card applied',
    ],
    [
        13,
        {
            'text': 'Yosep Aditya',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/13.jpg', 'alt': 'Yosep Aditya' }
            }
        },
        { 'text': 'https://example.com/profile/yosep', 'decorator': "link" },
        '150$',
        'Horizon Belt',
        '2023-06-10',
        'ORDER-ID-1234567890',
        'yosep@beltstore.com',
        '+1-456-789-1234',
        {
            'text': 'Returned', 'level': 0,
            'decorator': { 'status': { "type": 'error', "badge": true } }
        },
        'Debit Card',
        '211 West Way',
        'Boston',
        'USA',
        '0%',
        '2%',
        '153$',
        'Linda Melly',
        '2023-06-11',
        'Broken clasp',
    ],
    [
        14,
        {
            'text': 'Raisa Zuhra',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/14.jpg', 'alt': 'Raisa Zuhra' }
            }
        },
        { 'text': 'https://example.com/profile/raisa', 'decorator': "link" },
        '199.99$',
        'Prestige Shoes',
        '2023-05-20',
        'ORDER-ID-1234567890',
        'raisa@fashion.com',
        '+1-987-654-3210',
        {
            'text': 'Delivered', 'level': 3,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Credit Card',
        '809 Maple St',
        'Las Vegas',
        'USA',
        '0%',
        '5%',
        '209.99$',
        'Diana Aulia',
        '2023-05-21',
        'Urgent delivery requested',
    ],
    [
        15,
        {
            'text': 'Arif Ramadhan',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/15.jpg', 'alt': 'Arif Ramadhan' }
            }
        },
        { 'text': 'https://example.com/profile/arif', 'decorator': "link" },
        '89.5$',
        'Monsoon Watch',
        '2023-03-11',
        'ORDER-ID-1234567890',
        'arif@watches.com',
        '+1-201-392-4857',
        {
            'text': 'Cancelled', 'level': 0,
            'decorator': { 'status': { "type": 'error', "badge": true } }
        },
        'Bank Transfer',
        '422 South St',
        'Denver',
        'USA',
        '10%',
        '4%',
        '102$',
        'Fikri Syamsul',
        '2023-03-12',
        'Duplicate transaction',
    ],
    [
        16,
        {
            'text': 'Tasya Pramudita',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/16.jpg', 'alt': 'Tasya Pramudita' }
            }
        },
        { 'text': 'https://example.com/profile/tasya', 'decorator': "link" },
        '27.99$',
        'Electra Sunglasses',
        '2023-01-30',
        'ORDER-ID-1234567890',
        'tasya@electra.com',
        '+1-712-392-7843',
        {
            'text': 'Paid', 'level': 1,
            'decorator': { 'status': { "type": 'info', "badge": true } }
        },
        'BCA Virtual Account',
        '9 Lakeview',
        'Austin',
        'USA',
        '30%',
        '8%',
        '32.25$',
        'Wilman Yuda',
        '2023-01-31',
        'Promo order',
    ],
    [
        17,
        {
            'text': 'Syifa Dwi Lestari',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/17.jpg', 'alt': 'Syifa Dwi Lestari' }
            }
        },
        { 'text': 'https://example.com/profile/syifa', 'decorator': "link" },
        '49.99$',
        'Classic Backpack',
        '2022-12-15',
        'ORDER-ID-1234567890',
        'syifa@classic.com',
        '+1-876-345-0987',
        {
            'text': 'Delivered', 'level': 3,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Mandiri',
        '504 Mountain Rd',
        'Columbus',
        'USA',
        '5%',
        '2%',
        '51.49$',
        'Wawan Susanto',
        '2022-12-16',
        'Customer satisfied',
    ],
    [
        18,
        {
            'text': 'Bagas Wicaksono',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/18.jpg', 'alt': 'Bagas Wicaksono' }
            }
        },
        { 'text': 'https://example.com/profile/bagas', 'decorator': "link" },
        '105.1$',
        'Nexa Hoodie',
        '2022-11-02',
        'ORDER-ID-1234567890',
        'bagas@nexa.com',
        '+1-543-765-0981',
        {
            'text': 'Shipped', 'level': 2,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Credit Card',
        '676 Willow Way',
        'Raleigh',
        'USA',
        '0%',
        '3%',
        '108.25$',
        'Fitri Nuraini',
        '2022-11-03',
        'Requested early shipment',
    ],
    [
        19,
        {
            'text': 'Melati Cahyaningsih',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/women/19.jpg', 'alt': 'Melati Cahyaningsih' }
            }
        },
        { 'text': 'https://example.com/profile/melati', 'decorator': "link" },
        '149.9$',
        'Galaxy Purse',
        '2023-04-05',
        'ORDER-ID-1234567890',
        'melati@purse.com',
        '+1-210-343-5437',
        {
            'text': 'Delivered', 'level': 3,
            'decorator': { 'status': { "type": 'success', "badge": true } }
        },
        'Paypal',
        '92 Lincoln Ave',
        'Dallas',
        'USA',
        '10%',
        '7%',
        '159.79$',
        'Arman Surya',
        '2023-04-06',
        'Preferred customer',
    ],
    [
        20,
        {
            'text': 'Yusuf Al Fajri',
            'decorator': {
                'avatar': { 'src': 'https://randomuser.me/api/portraits/men/20.jpg', 'alt': 'Yusuf Al Fajri' }
            }
        },
        { 'text': 'https://example.com/profile/yusuf', 'decorator': "link" },
        '87.5$',
        'Delta Boots',
        '2023-06-18',
        'ORDER-ID-1234567890',
        'yusuf@boots.com',
        '+1-987-654-2345',
        {
            'text': 'Cancelled', 'level': 0,
            'decorator': { 'status': { "type": 'error', "badge": true } }
        },
        'Credit Card',
        '81 Gateway Ave',
        'San Jose',
        'USA',
        '0%',
        '5%',
        '92$',
        'Nadia Firdha',
        '2023-06-19',
        'Bulk order cancelled',
    ],
];


// Seminar Attedance Management
export const seminarTableHeaderData = [
    { columnName: 'Name', sort: true, filter: false },
    { columnName: 'Seminar Name', sort: true, filter: false },
    { columnName: 'Seminar Date', sort: true, filter: false },
    { columnName: 'Email', sort: true, filter: false },
    { columnName: 'Phone Number', sort: true, filter: false },
    { columnName: 'Status', sort: true, filter: true },
];

// Seminar Attendance Management - Dummy Data
export const seminarTableData = [
    [
        1,
        {
            text: 'Andi Wijaya',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/31.jpg', alt: 'Andi Wijaya' }
            }
        },
        'AI for Everyone',
        '2024-05-01',
        'andi@seminar.com',
        '+62-812-1111-2222',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        2,
        {
            text: 'Siti Rahma',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/32.jpg', alt: 'Siti Rahma' }
            }
        },
        'Data Science 101',
        '2024-05-02',
        'siti@seminar.com',
        '+62-813-2222-3333',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
    [
        3,
        {
            text: 'Budi Santoso',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/33.jpg', alt: 'Budi Santoso' }
            }
        },
        'Cloud Computing',
        '2024-05-03',
        'budi@seminar.com',
        '+62-814-3333-4444',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        4,
        {
            text: 'Dewi Lestari',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/34.jpg', alt: 'Dewi Lestari' }
            }
        },
        'Cybersecurity Basics',
        '2024-05-04',
        'dewi@seminar.com',
        '+62-815-4444-5555',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        }
    ],
    [
        5,
        {
            text: 'Rizky Pratama',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/35.jpg', alt: 'Rizky Pratama' }
            }
        },
        'Machine Learning Intro',
        '2024-05-05',
        'rizky@seminar.com',
        '+62-816-5555-6666',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        6,
        {
            text: 'Nina Kartika',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/36.jpg', alt: 'Nina Kartika' }
            }
        },
        'Big Data Analytics',
        '2024-05-06',
        'nina@seminar.com',
        '+62-817-6666-7777',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
    [
        7,
        {
            text: 'Fajar Nugroho',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/37.jpg', alt: 'Fajar Nugroho' }
            }
        },
        'Digital Marketing',
        '2024-05-07',
        'fajar@seminar.com',
        '+62-818-7777-8888',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        8,
        {
            text: 'Putri Maharani',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/38.jpg', alt: 'Putri Maharani' }
            }
        },
        'UI/UX Design',
        '2024-05-08',
        'putri@seminar.com',
        '+62-819-8888-9999',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        }
    ],
    [
        9,
        {
            text: 'Agus Saputra',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/39.jpg', alt: 'Agus Saputra' }
            }
        },
        'Web Development',
        '2024-05-09',
        'agus@seminar.com',
        '+62-820-9999-0000',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        10,
        {
            text: 'Maya Sari',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/40.jpg', alt: 'Maya Sari' }
            }
        },
        'Mobile App Dev',
        '2024-05-10',
        'maya@seminar.com',
        '+62-821-0000-1111',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
    [
        11,
        {
            text: 'Dian Prasetyo',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/41.jpg', alt: 'Dian Prasetyo' }
            }
        },
        'Blockchain Basics',
        '2024-05-11',
        'dian@seminar.com',
        '+62-822-1111-2222',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        12,
        {
            text: 'Lina Marlina',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/42.jpg', alt: 'Lina Marlina' }
            }
        },
        'Startup Funding',
        '2024-05-12',
        'lina@seminar.com',
        '+62-823-2222-3333',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        }
    ],
    [
        13,
        {
            text: 'Rama Pradana',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/43.jpg', alt: 'Rama Pradana' }
            }
        },
        'Agile Management',
        '2024-05-13',
        'rama@seminar.com',
        '+62-824-3333-4444',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        14,
        {
            text: 'Sari Dewi',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Sari Dewi' }
            }
        },
        'Digital Transformation',
        '2024-05-14',
        'sari@seminar.com',
        '+62-825-4444-5555',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
    [
        15,
        {
            text: 'Yusuf Hidayat',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/45.jpg', alt: 'Yusuf Hidayat' }
            }
        },
        'IoT for Beginners',
        '2024-05-15',
        'yusuf@seminar.com',
        '+62-826-5555-6666',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        16,
        {
            text: 'Mega Putri',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/46.jpg', alt: 'Mega Putri' }
            }
        },
        'Digital Branding',
        '2024-05-16',
        'mega@seminar.com',
        '+62-827-6666-7777',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        }
    ],
    [
        17,
        {
            text: 'Fikri Ramadhan',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/47.jpg', alt: 'Fikri Ramadhan' }
            }
        },
        'SEO Optimization',
        '2024-05-17',
        'fikri@seminar.com',
        '+62-828-7777-8888',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        18,
        {
            text: 'Ayu Lestari',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/48.jpg', alt: 'Ayu Lestari' }
            }
        },
        'Content Marketing',
        '2024-05-18',
        'ayu@seminar.com',
        '+62-829-8888-9999',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
    [
        19,
        {
            text: 'Rendi Saputra',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/49.jpg', alt: 'Rendi Saputra' }
            }
        },
        'Business Intelligence',
        '2024-05-19',
        'rendi@seminar.com',
        '+62-830-9999-0000',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        20,
        {
            text: 'Dina Sari',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/50.jpg', alt: 'Dina Sari' }
            }
        },
        'Project Management',
        '2024-05-20',
        'dina@seminar.com',
        '+62-831-0000-1111',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        }
    ],
    [
        21,
        {
            text: 'Galih Pratama',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/51.jpg', alt: 'Galih Pratama' }
            }
        },
        'Mobile Security',
        '2024-05-21',
        'galih@seminar.com',
        '+62-832-1111-2222',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        22,
        {
            text: 'Nadya Kusuma',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/52.jpg', alt: 'Nadya Kusuma' }
            }
        },
        'Cloud Security',
        '2024-05-22',
        'nadya@seminar.com',
        '+62-833-2222-3333',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
    [
        23,
        {
            text: 'Rizal Hakim',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/53.jpg', alt: 'Rizal Hakim' }
            }
        },
        'Data Visualization',
        '2024-05-23',
        'rizal@seminar.com',
        '+62-834-3333-4444',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        24,
        {
            text: 'Tari Ayuningtyas',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/54.jpg', alt: 'Tari Ayuningtyas' }
            }
        },
        'Startup Pitching',
        '2024-05-24',
        'tari@seminar.com',
        '+62-835-4444-5555',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        }
    ],
    [
        25,
        {
            text: 'Dimas Prakoso',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/55.jpg', alt: 'Dimas Prakoso' }
            }
        },
        'AI in Healthcare',
        '2024-05-25',
        'dimas@seminar.com',
        '+62-836-5555-6666',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        26,
        {
            text: 'Vina Melati',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/56.jpg', alt: 'Vina Melati' }
            }
        },
        'Digital Ethics',
        '2024-05-26',
        'vina@seminar.com',
        '+62-837-6666-7777',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
    [
        27,
        {
            text: 'Rafi Pradipta',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/57.jpg', alt: 'Rafi Pradipta' }
            }
        },
        'Product Management',
        '2024-05-27',
        'rafi@seminar.com',
        '+62-838-7777-8888',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        28,
        {
            text: 'Salsa Dewi',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/58.jpg', alt: 'Salsa Dewi' }
            }
        },
        'Business Analytics',
        '2024-05-28',
        'salsa@seminar.com',
        '+62-839-8888-9999',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        }
    ],
    [
        29,
        {
            text: 'Yoga Prasetya',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/59.jpg', alt: 'Yoga Prasetya' }
            }
        },
        'Digital Leadership',
        '2024-05-29',
        'yoga@seminar.com',
        '+62-840-9999-0000',
        {
            text: 'Present', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        }
    ],
    [
        30,
        {
            text: 'Citra Anggraini',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/60.jpg', alt: 'Citra Anggraini' }
            }
        },
        'Remote Work Culture',
        '2024-05-30',
        'citra@seminar.com',
        '+62-841-0000-1111',
        {
            text: 'Absent', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        }
    ],
];


// new scenario
// Employee Leave Management
export const leaveTableHeaderData = [
    { columnName: 'Employee Name', sort: { behavior: 'text' }, filter: false },
    { columnName: 'Department', sort: true, filter: true },
    { columnName: 'Leave Type', sort: true, filter: true },
    { columnName: 'Start Date', sort: { behavior: 'date' }, filter: false },
    { columnName: 'End Date', sort: { behavior: 'date' }, filter: false },
    { columnName: 'Status', sort: true, filter: true },
    { columnName: 'Approver', sort: true, filter: false },
];

export const leaveTableData = [
    [
        1,
        {
            text: 'Ayu Pratiwi',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/61.jpg', alt: 'Ayu Pratiwi' }
            }
        },
        'Finance',
        'Annual Leave',
        '2024-06-01',
        '2024-06-05',
        {
            text: 'Approved', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        },
        'Budi Santoso'
    ],
    [
        2,
        {
            text: 'Budi Santoso',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/62.jpg', alt: 'Budi Santoso' }
            }
        },
        'IT',
        'Sick Leave',
        '2024-06-03',
        '2024-06-04',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        },
        'Clara Wijaya'
    ],
    [
        3,
        {
            text: 'Clara Wijaya',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/63.jpg', alt: 'Clara Wijaya' }
            }
        },
        'HR',
        'Maternity Leave',
        '2024-05-15',
        '2024-08-15',
        {
            text: 'Approved', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        },
        'Dewi Lestari'
    ],
    [
        4,
        {
            text: 'Dewi Lestari',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/64.jpg', alt: 'Dewi Lestari' }
            }
        },
        'Marketing',
        'Annual Leave',
        '2024-06-10',
        '2024-06-12',
        {
            text: 'Rejected', level: 0,
            decorator: { status: { type: 'error', badge: true } }
        },
        'Eko Prabowo'
    ],
    [
        5,
        {
            text: 'Eko Prabowo',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/65.jpg', alt: 'Eko Prabowo' }
            }
        },
        'Finance',
        'Unpaid Leave',
        '2024-06-15',
        '2024-06-20',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        },
        'Ayu Pratiwi'
    ],
    [
        6,
        {
            text: 'Fajar Nugroho',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/66.jpg', alt: 'Fajar Nugroho' }
            }
        },
        'IT',
        'Annual Leave',
        '2024-06-18',
        '2024-06-22',
        {
            text: 'Approved', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        },
        'Budi Santoso'
    ],
    [
        7,
        {
            text: 'Gita Prameswari',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/women/67.jpg', alt: 'Gita Prameswari' }
            }
        },
        'HR',
        'Sick Leave',
        '2024-06-05',
        '2024-06-07',
        {
            text: 'Approved', level: 2,
            decorator: { status: { type: 'success', badge: true } }
        },
        'Clara Wijaya'
    ],
    [
        8,
        {
            text: 'Hendra Saputra',
            decorator: {
                avatar: { src: 'https://randomuser.me/api/portraits/men/68.jpg', alt: 'Hendra Saputra' }
            }
        },
        'Marketing',
        'Annual Leave',
        '2024-06-12',
        '2024-06-15',
        {
            text: 'Pending', level: 1,
            decorator: { status: { type: 'warning', badge: true } }
        },
        'Dewi Lestari'
    ],
];


// Complex Scenario: University Student Academic Records
export const studentAcademicTableHeaderData = [
    { columnName: 'StudentID', sort: true, filter: false },
    { columnName: 'Name', sort: true, filter: false },
    { columnName: 'Major', sort: true, filter: true },
    { columnName: 'Year', sort: { behavior: 'number' }, filter: true },
    { columnName: 'Semester', sort: { behavior: 'number' }, filter: true },
    { columnName: 'Course Code', sort: true, filter: true },
    { columnName: 'Course Name', sort: true, filter: true },
    { columnName: 'Credits', sort: { behavior: 'number' }, filter: false },
    { columnName: 'Grade', sort: true, filter: true },
    { columnName: 'GPA', sort: { behavior: 'number' }, filter: false },
    { columnName: 'Status', sort: true, filter: true },
    { columnName: 'Advisor', sort: true, filter: false },
    { columnName: 'Enrollment Date', sort: { behavior: 'date' }, filter: false },
    { columnName: 'Last Updated', sort: { behavior: 'date' }, filter: false },
    { columnName: 'Remarks', sort: false, filter: false }
];

export const studentAcademicTableData = (() => {
    const students = [
        {
            studentId: 'S001',
            name: 'Andi Wijaya',
            major: 'Computer Science',
            year: 2021,
            semester: 6,
            advisor: 'Dr. Budi Santoso',
            enrollmentDate: '2021-08-15',
            lastUpdated: '2024-05-01',
            courses: [
                ['CS601', 'Artificial Intelligence', 'A', 3.85, 'Excellent performance'],
                ['CS602', 'Machine Learning', 'A-', 3.75, 'Good understanding'],
                ['CS603', 'Data Mining', 'B+', 3.45, 'Needs improvement in projects'],
                ['CS604', 'Computer Vision', 'A', 3.90, 'Outstanding project'],
                ['CS605', 'Natural Language Processing', 'A-', 3.80, 'Participated in competition'],
            ]
        },
        {
            studentId: 'S002',
            name: 'Rina Melati',
            major: 'Information Systems',
            year: 2020,
            semester: 8,
            advisor: 'Dr. Clara Wijaya',
            enrollmentDate: '2020-08-15',
            lastUpdated: '2024-05-01',
            courses: [
                ['IS801', 'Enterprise Systems', 'B', 3.20, 'Average participation'],
                ['IS802', 'Business Intelligence', 'B+', 3.40, 'Improved in final exam'],
                ['IS803', 'ERP Systems', 'A', 3.80, 'Excellent teamwork'],
                ['IS804', 'IT Governance', 'B', 3.10, 'Needs more class participation'],
                ['IS805', 'Digital Transformation', 'A-', 3.60, 'Good project presentation'],
            ]
        },
        {
            studentId: 'S003',
            name: 'Budi Santoso',
            major: 'Software Engineering',
            year: 2022,
            semester: 4,
            advisor: 'Dr. Eko Prabowo',
            enrollmentDate: '2022-08-15',
            lastUpdated: '2024-05-01',
            courses: [
                ['SE401', 'Software Design', 'A', 3.90, 'Excellent design skills'],
                ['SE402', 'Testing & QA', 'B+', 3.55, 'Good testing practice'],
                ['SE403', 'DevOps', 'A-', 3.70, 'Active in class'],
                ['SE404', 'Agile Methods', 'B', 3.30, 'Needs more participation'],
                ['SE405', 'Mobile Development', 'A', 3.95, 'Great mobile app'],
            ]
        }
    ];
    const status = { text: 'Active', level: 2, decorator: { status: { type: 'success', badge: true } } };
    const data = [];
    let id = 1;
    while (data.length < 299) {
        for (const s of students) {
            for (const c of s.courses) {
                if (data.length >= 299) break;
                data.push([
                    id++,
                    s.studentId,
                    s.name,
                    s.major,
                    s.year,
                    s.semester,
                    c[0],
                    c[1],
                    3,
                    c[2],
                    c[3],
                    status,
                    s.advisor,
                    s.enrollmentDate,
                    s.lastUpdated,
                    c[4]
                ]);
            }
        }
    }
    return data;
})();