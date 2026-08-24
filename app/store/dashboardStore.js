'use client'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const generateId = () => `ORD-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`

const generateOrder = () => {
    const customers = ['John Smith', 'Emma Johnson', 'Michael Chen', 'Sarah Williams', 'David Wilson', 'Lisa Anderson', 'Alex Johnson', 'Maria Garcia', 'Tom Wilson', 'Sarah Miller', 'James Brown', 'Emily Davis']
    const products = ['Premium Plan', 'Basic Plan', 'Enterprise', 'Pro Plan', 'Starter Plan']
    const payments = ['Credit Card', 'PayPal', 'Bank Transfer', 'Stripe']
    const statuses = ['completed', 'processing', 'pending', 'failed']
    const statusWeights = [0.5, 0.25, 0.2, 0.05]

    const randomStatus = () => {
        const random = Math.random()
        let cumulative = 0
        for (let i = 0; i < statuses.length; i++) {
            cumulative += statusWeights[i]
            if (random <= cumulative) return statuses[i]
        }
        return statuses[0]
    }

    const amounts = { 'Premium Plan': 299.99, 'Basic Plan': 99.99, 'Enterprise': 399.99, 'Pro Plan': 199.99, 'Starter Plan': 49.99 }
    const product = products[Math.floor(Math.random() * products.length)]

    return {
        id: generateId(),
        customer: customers[Math.floor(Math.random() * customers.length)],
        date: 'Just now',
        amount: `$${amounts[product]}`,
        status: randomStatus(),
        product: product,
        payment: payments[Math.floor(Math.random() * payments.length)]
    }
}

const initialStats = {
    revenue: { value: 54231, change: 12.5, trend: 'up', details: 'Monthly recurring revenue' },
    users: { value: 2548, change: 18.2, trend: 'up', details: 'Daily active users' },
    orders: { value: 1428, change: 24.1, trend: 'up', details: 'Orders this month' },
    conversion: { value: 4.8, change: 3.7, trend: 'up', details: 'Website to purchase' }
}

const initialOrders = [
    { id: 'ORD-001', customer: 'John Smith', date: 'Today, 10:42 AM', amount: '$249.99', status: 'completed', product: 'Premium Plan', payment: 'Credit Card' },
    { id: 'ORD-002', customer: 'Emma Johnson', date: 'Today, 09:15 AM', amount: '$149.99', status: 'processing', product: 'Basic Plan', payment: 'PayPal' },
    { id: 'ORD-003', customer: 'Michael Chen', date: 'Yesterday, 3:42 PM', amount: '$399.99', status: 'completed', product: 'Enterprise', payment: 'Bank Transfer' },
    { id: 'ORD-004', customer: 'Sarah Williams', date: 'Yesterday, 2:30 PM', amount: '$199.99', status: 'pending', product: 'Pro Plan', payment: 'Credit Card' },
    { id: 'ORD-005', customer: 'David Wilson', date: 'Yesterday, 11:30 AM', amount: '$299.99', status: 'completed', product: 'Premium Plan', payment: 'Stripe' },
    { id: 'ORD-006', customer: 'Lisa Anderson', date: '2 days ago', amount: '$99.99', status: 'failed', product: 'Basic Plan', payment: 'Credit Card' },
]

const initialProducts = [
    { name: 'Premium Plan', revenue: 12450, sales: 245, growth: 24, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Pro Plan', revenue: 8920, sales: 156, growth: 18, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { name: 'Enterprise', revenue: 6780, sales: 89, growth: 32, color: 'bg-gradient-to-r from-emerald-500 to-green-500' },
    { name: 'Basic Plan', revenue: 4560, sales: 67, growth: 12, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
]

const initialActivity = [
    { user: 'Alex Johnson', action: 'added new product', time: '5 min ago', icon: 'Package', color: 'text-purple-500 bg-purple-500/10' },
    { user: 'Maria Garcia', action: 'updated settings', time: '12 min ago', icon: 'Settings', color: 'text-blue-500 bg-blue-500/10' },
    { user: 'Tom Wilson', action: 'completed payment', time: '25 min ago', icon: 'CreditCard', color: 'text-emerald-500 bg-emerald-500/10' },
    { user: 'Sarah Miller', action: 'left review', time: '1 hour ago', icon: 'Star', color: 'text-amber-500 bg-amber-500/10' },
]

const initialChartData = [
    { month: 'Jan', thisYear: 65, lastYear: 45, target: 70 },
    { month: 'Feb', thisYear: 78, lastYear: 52, target: 75 },
    { month: 'Mar', thisYear: 90, lastYear: 65, target: 85 },
    { month: 'Apr', thisYear: 82, lastYear: 58, target: 80 },
    { month: 'May', thisYear: 75, lastYear: 62, target: 78 },
    { month: 'Jun', thisYear: 88, lastYear: 70, target: 85 },
    { month: 'Jul', thisYear: 92, lastYear: 75, target: 90 },
]

export const useDashboardStore = create(
    immer((set, get) => ({
        // State
        stats: initialStats,
        orders: initialOrders,
        products: initialProducts,
        activityLog: initialActivity,
        chartData: initialChartData,
        selectedPeriod: 'month',
        isLive: true,
        simulationInterval: null,

        // Actions
        setSelectedPeriod: (period) => set((state) => {
            state.selectedPeriod = period
            // Generate different data based on period
            const baseData = {
                week: [
                    { month: 'Mon', thisYear: 45, lastYear: 38, target: 50 },
                    { month: 'Tue', thisYear: 62, lastYear: 55, target: 60 },
                    { month: 'Wed', thisYear: 78, lastYear: 65, target: 75 },
                    { month: 'Thu', thisYear: 55, lastYear: 48, target: 60 },
                    { month: 'Fri', thisYear: 85, lastYear: 72, target: 80 },
                    { month: 'Sat', thisYear: 42, lastYear: 35, target: 45 },
                    { month: 'Sun', thisYear: 38, lastYear: 30, target: 40 },
                ],
                month: [
                    { month: 'Jan', thisYear: 65, lastYear: 45, target: 70 },
                    { month: 'Feb', thisYear: 78, lastYear: 52, target: 75 },
                    { month: 'Mar', thisYear: 90, lastYear: 65, target: 85 },
                    { month: 'Apr', thisYear: 82, lastYear: 58, target: 80 },
                    { month: 'May', thisYear: 75, lastYear: 62, target: 78 },
                    { month: 'Jun', thisYear: 88, lastYear: 70, target: 85 },
                    { month: 'Jul', thisYear: 92, lastYear: 75, target: 90 },
                ],
                quarter: [
                    { month: 'Q1', thisYear: 78, lastYear: 54, target: 77 },
                    { month: 'Q2', thisYear: 82, lastYear: 63, target: 81 },
                    { month: 'Q3', thisYear: 90, lastYear: 72, target: 87 },
                    { month: 'Q4', thisYear: 95, lastYear: 80, target: 92 },
                ],
                year: [
                    { month: '2020', thisYear: 45, lastYear: 38, target: 50 },
                    { month: '2021', thisYear: 62, lastYear: 48, target: 65 },
                    { month: '2022', thisYear: 78, lastYear: 58, target: 75 },
                    { month: '2023', thisYear: 85, lastYear: 68, target: 82 },
                    { month: '2024', thisYear: 92, lastYear: 75, target: 90 },
                ]
            }
            state.chartData = baseData[period] || baseData.month
        }),

        addOrder: (order) => set((state) => {
            const newOrder = order || generateOrder()
            state.orders.unshift(newOrder)
            if (state.orders.length > 20) state.orders.pop()

            // Update stats
            const amount = parseFloat(newOrder.amount.replace('$', ''))
            state.stats.revenue.value += amount
            state.stats.orders.value += 1
            state.stats.users.value += Math.floor(Math.random() * 3)

            // Add activity
            state.activityLog.unshift({
                user: newOrder.customer,
                action: `purchased ${newOrder.product}`,
                time: 'Just now',
                icon: 'ShoppingCart',
                color: 'text-emerald-500 bg-emerald-500/10'
            })
            if (state.activityLog.length > 10) state.activityLog.pop()

            // Update products
            const product = state.products.find(p => p.name === newOrder.product)
            if (product) {
                product.sales += 1
                product.revenue += Math.floor(amount)
            }
        }),

        updateOrderStatus: (orderId, newStatus) => set((state) => {
            const order = state.orders.find(o => o.id === orderId)
            if (order) {
                order.status = newStatus
            }
        }),

        deleteOrder: (orderId) => set((state) => {
            state.orders = state.orders.filter(o => o.id !== orderId)
        }),

        updateStats: () => set((state) => {
            // Randomly fluctuate stats
            state.stats.revenue.value += Math.floor(Math.random() * 100 - 30)
            state.stats.users.value += Math.floor(Math.random() * 10 - 3)
            state.stats.conversion.value = parseFloat((state.stats.conversion.value + (Math.random() * 0.2 - 0.1)).toFixed(1))

            // Update chart data
            const lastMonth = state.chartData[state.chartData.length - 1]
            lastMonth.thisYear = Math.min(100, Math.max(0, lastMonth.thisYear + Math.floor(Math.random() * 6 - 2)))
        }),

        addActivity: (activity) => set((state) => {
            state.activityLog.unshift({
                ...activity,
                time: 'Just now'
            })
            if (state.activityLog.length > 10) state.activityLog.pop()
        }),

        toggleLiveMode: () => set((state) => {
            state.isLive = !state.isLive
        }),

        startSimulation: () => set((state) => {
            if (state.simulationInterval) return

            state.simulationInterval = setInterval(() => {
                const { isLive } = get()
                if (!isLive) return

                // Randomly add orders or update stats
                if (Math.random() > 0.7) {
                    get().addOrder()
                } else {
                    get().updateStats()
                }

                // Randomly add activity
                if (Math.random() > 0.8) {
                    const actions = [
                        { action: 'updated dashboard', icon: 'Activity', color: 'text-blue-500 bg-blue-500/10' },
                        { action: 'exported report', icon: 'Download', color: 'text-purple-500 bg-purple-500/10' },
                        { action: 'reviewed analytics', icon: 'BarChart3', color: 'text-amber-500 bg-amber-500/10' },
                    ]
                    const randomAction = actions[Math.floor(Math.random() * actions.length)]
                    const users = ['System', 'Admin', 'Manager', 'Analyst']
                    get().addActivity({
                        user: users[Math.floor(Math.random() * users.length)],
                        ...randomAction
                    })
                }
            }, 3000)
        }),

        stopSimulation: () => set((state) => {
            if (state.simulationInterval) {
                clearInterval(state.simulationInterval)
                state.simulationInterval = null
            }
        }),

        resetData: () => set((state) => {
            state.stats = initialStats
            state.orders = initialOrders
            state.products = initialProducts
            state.activityLog = initialActivity
            state.chartData = initialChartData
        }),

        // Computed
        getFormattedRevenue: () => {
            const { stats } = get()
            return `$${stats.revenue.value.toLocaleString()}`
        },

        getFormattedUsers: () => {
            const { stats } = get()
            return stats.users.value.toLocaleString()
        },

        getFormattedOrders: () => {
            const { stats } = get()
            return stats.orders.value.toLocaleString()
        },

        getFormattedConversion: () => {
            const { stats } = get()
            return `${stats.conversion.value}%`
        }
    }))
)
