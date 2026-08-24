'use client'

import {
    Card,
    CardBody,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Chip,
    Badge,
    Progress,
    Avatar,
    AvatarGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from '@heroui/react'
import {
    Users,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    BarChart3,
    Activity,
    Calendar,
    ArrowUpRight,
    ChevronRight,
    TrendingDown,
    Clock,
    Target,
    Package,
    CreditCard,
    Star,
    Zap,
    Award,
    Download,
    Filter,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    Clock as ClockIcon,
    AlertCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import DemoControls from './DemoControls'
import OrderDetailsModal from './OrderDetailsModal'

export default function Dashboard() {
    const [mounted, setMounted] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [statusFilter, setStatusFilter] = useState('all')

    // Zustand store
    const {
        stats,
        orders,
        products,
        activityLog,
        chartData,
        selectedPeriod,
        setSelectedPeriod,
        updateOrderStatus,
        deleteOrder,
        startSimulation,
        stopSimulation,
        isLive,
        getFormattedRevenue,
        getFormattedUsers,
        getFormattedOrders,
        getFormattedConversion
    } = useDashboardStore()

    // Initialize only on client side to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
        startSimulation()
        return () => stopSimulation()
    }, [startSimulation, stopSimulation])

    // Enhanced stats with more vibrant colors
    const statsConfig = [
        {
            title: 'Total Revenue',
            value: getFormattedRevenue(),
            change: `+${stats.revenue.change.toFixed(1)}%`,
            icon: DollarSign,
            color: 'from-emerald-500 to-green-400',
            bgColor: 'bg-gradient-to-br from-emerald-500/20 to-green-400/20',
            iconColor: 'text-emerald-500',
            trend: stats.revenue.trend,
            details: stats.revenue.details
        },
        {
            title: 'Active Users',
            value: getFormattedUsers(),
            change: `+${stats.users.change.toFixed(1)}%`,
            icon: Users,
            color: 'from-blue-500 to-cyan-400',
            bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20',
            iconColor: 'text-blue-500',
            trend: stats.users.trend,
            details: stats.users.details
        },
        {
            title: 'Total Orders',
            value: getFormattedOrders(),
            change: `+${stats.orders.change.toFixed(1)}%`,
            icon: ShoppingCart,
            color: 'from-purple-500 to-pink-400',
            bgColor: 'bg-gradient-to-br from-purple-500/20 to-pink-400/20',
            iconColor: 'text-purple-500',
            trend: stats.orders.trend,
            details: stats.orders.details
        },
        {
            title: 'Conversion Rate',
            value: getFormattedConversion(),
            change: `+${stats.conversion.change.toFixed(1)}%`,
            icon: TrendingUp,
            color: 'from-amber-500 to-orange-400',
            bgColor: 'bg-gradient-to-br from-amber-500/20 to-orange-400/20',
            iconColor: 'text-amber-500',
            trend: stats.conversion.trend,
            details: stats.conversion.details
        },
    ]

    const periods = [
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
        { key: 'quarter', label: 'Quarter' },
        { key: 'year', label: 'Year' },
    ]

    const statusColorMap = {
        completed: {
            label: 'Completed',
            color: 'success',
            icon: CheckCircle
        },
        processing: {
            label: 'Processing',
            color: 'primary',
            icon: ClockIcon
        },
        pending: {
            label: 'Pending',
            color: 'warning',
            icon: ClockIcon
        },
        failed: {
            label: 'Failed',
            color: 'danger',
            icon: AlertCircle
        }
    }

    const paymentMethods = {
        'Credit Card': { color: 'text-blue-500', bg: 'bg-blue-500/10' },
        'PayPal': { color: 'text-blue-400', bg: 'bg-blue-400/10' },
        'Bank Transfer': { color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        'Stripe': { color: 'text-purple-500', bg: 'bg-purple-500/10' }
    }

    const columns = [
        { name: "ORDER ID", uid: "id", sortable: true },
        { name: "CUSTOMER", uid: "customer", sortable: true },
        { name: "PRODUCT", uid: "product" },
        { name: "DATE", uid: "date", sortable: true },
        { name: "PAYMENT", uid: "payment" },
        { name: "AMOUNT", uid: "amount", sortable: true },
        { name: "STATUS", uid: "status", sortable: true },
        { name: "ACTIONS", uid: "actions" },
    ];

    const iconMap = {
        Package: Package,
        Settings: Settings,
        CreditCard: CreditCard,
        Star: Star,
        ShoppingCart: ShoppingCart,
        Activity: Activity,
        Download: Download,
        BarChart3: BarChart3
    }

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "status":
                const status = statusColorMap[cellValue];
                const StatusIcon = status.icon;
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Chip
                                className="capitalize border-none cursor-pointer"
                                color={status.color}
                                size="sm"
                                variant="bordered"
                                startContent={<StatusIcon className="w-4 h-4" />}
                            >
                                {status.label}
                            </Chip>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Status options"
                            onAction={(key) => updateOrderStatus(item.id, key)}
                        >
                            <DropdownItem key="completed" color="success">Completed</DropdownItem>
                            <DropdownItem key="processing" color="primary">Processing</DropdownItem>
                            <DropdownItem key="pending" color="warning">Pending</DropdownItem>
                            <DropdownItem key="failed" color="danger">Failed</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                );
            case "payment":
                const payment = paymentMethods[cellValue] || { color: 'text-default-500', bg: 'bg-default-100' };
                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${payment.bg}`}>
                            <CreditCard className={`w-4 h-4 ${payment.color}`} />
                        </div>
                        <span className="text-sm">{cellValue}</span>
                    </div>
                );
            case "amount":
                return (
                    <span className="font-bold text-foreground">
                        {cellValue}
                    </span>
                );
            case "date":
                return (
                    <span className="text-default-500">
                        {cellValue}
                    </span>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="primary"
                            aria-label="View order"
                            onPress={() => {
                                setSelectedOrder(item)
                                setIsOrderModalOpen(true)
                            }}
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => deleteOrder(item.id)}
                            aria-label="Delete order"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    // Helper component for animated sparkles
    const Sparkle = ({ className = '' }) => (
        <div className={`absolute ${className}`}>
            <div className="w-1 h-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 animate-pulse"></div>
        </div>
    )

    // Skeleton loading state
    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-content1 to-gray-900 p-4 md:p-8">
                <div className="animate-pulse">
                    <div className="h-32 bg-default-200 rounded-2xl mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-40 bg-default-200 rounded-xl"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 h-96 bg-default-200 rounded-xl"></div>
                        <div className="h-96 bg-default-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-content1 to-gray-900 p-4 md:p-8">
            {/* Header with gradient background */}
            <div className="relative mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                                Analytics Dashboard
                            </h1>
                            <div className="text-default-500 mt-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                <Chip color="primary" variant="bordered" className="ml-2">
                                    Live Data
                                </Chip>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <DemoControls />
                            
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        startContent={<Download className="w-4 h-4" />}
                                        aria-label="Export data"
                                        color="primary"
                                    >
                                        Export
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Export options" onAction={(key) => alert(`Exporting as ${key}...`)}>
                                    <DropdownItem key="CSV">Export as CSV</DropdownItem>
                                    <DropdownItem key="PDF">Export as PDF</DropdownItem>
                                    <DropdownItem key="Excel">Export as Excel</DropdownItem>
                                    <DropdownItem key="JSON">Export as JSON</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown>
                                <DropdownTrigger>
                                <Button
                                    variant="light"
                                    startContent={<Filter className="w-4 h-4" />}
                                    aria-label="Filter data"
                                    color={statusFilter !== 'all' ? "primary" : "default"}
                                >
                                    {statusFilter === 'all' ? 'Filter' : `Filter: ${statusFilter}`}
                                </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Filter options" onAction={(key) => setStatusFilter(key)}>
                                    <DropdownItem key="all">All Orders</DropdownItem>
                                    <DropdownItem key="completed" color="success">Completed</DropdownItem>
                                    <DropdownItem key="processing" color="primary">Processing</DropdownItem>
                                    <DropdownItem key="pending" color="warning">Pending</DropdownItem>
                                    <DropdownItem key="failed" color="danger">Failed</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        size="sm"
                                        color="default"
                                        aria-label="More options"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="More options">
                                    <DropdownItem key="settings">Dashboard Settings</DropdownItem>
                                    <DropdownItem key="refresh">Refresh Data</DropdownItem>
                                    <DropdownItem key="share">Share Dashboard</DropdownItem>
                                    <DropdownItem key="help">Help & Support</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid with animated borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsConfig.map((stat, index) => {
                    const Icon = stat.icon
                    const isPositive = stat.trend === 'up'

                    return (
                        <Card
                            key={index}
                            className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 bg-content1/50 backdrop-blur-sm border border-default-100"
                        >
                            {/* Animated border effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            <CardBody className="p-6 relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-sm text-default-500 mb-1">{stat.title}</p>
                                        <p className="text-2xl font-bold mt-2 text-foreground">{stat.value}</p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600' : 'bg-red-100 dark:bg-red-500/20 text-red-600'}`}>
                                                {isPositive ? (
                                                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                                                ) : (
                                                    <TrendingDown className="w-3 h-3" aria-hidden="true" />
                                                )}
                                                <span className="text-xs font-medium">{stat.change}</span>
                                            </div>
                                            <span className="text-xs text-default-500">{stat.details}</span>
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                        <Icon className={`w-6 h-6 ${stat.iconColor || 'text-foreground'}`} aria-hidden="true" />
                                    </div>
                                </div>

                                {/* Progress bar for each stat */}
                                <div className="mt-4">
                                    <Progress
                                        value={isPositive ? 75 : 40}
                                        color={isPositive ? "success" : "danger"}
                                        size="sm"
                                        classNames={{
                                            track: "bg-default-100",
                                        }}
                                        aria-label={`${stat.title} progress`}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Left Column - Charts */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Interactive Chart Card */}
                    <Card className="bg-content1/50 backdrop-blur-sm border border-default-100">
                        <CardBody className="p-6">
                            {/* Header with title and period buttons */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Revenue Performance</h3>
                                    <p className="text-default-500 text-sm">Real-time revenue tracking</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {periods.map((period) => (
                                        <Button
                                            key={period.key}
                                            size="sm"
                                            variant={selectedPeriod === period.key ? "solid" : "bordered"}
                                            color={selectedPeriod === period.key ? "primary" : "default"}
                                            onPress={() => setSelectedPeriod(period.key)}
                                            className="text-xs"
                                            aria-label={`View ${period.label} data`}
                                        >
                                            {period.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Chart Area - clearly separated */}
                            <div className="relative h-[280px] mt-4">
                                {/* Chart bars container */}
                                <div className="absolute inset-x-0 top-0 bottom-12 flex items-end justify-between px-2">
                                    {chartData.length === 0 ? (
                                        <div className="w-full flex items-center justify-center h-full">
                                            <p className="text-default-500">No data available</p>
                                        </div>
                                    ) : chartData.map((data) => {
                                        const allValues = [...chartData.map(d => d.thisYear), ...chartData.map(d => d.lastYear), ...chartData.map(d => d.target)]
                                        const maxValue = Math.max(...allValues, 1)
                                        const thisYearHeight = Math.max((data.thisYear / maxValue) * 100, 8)
                                        const lastYearHeight = Math.max((data.lastYear / maxValue) * 100, 8)
                                        const targetHeight = Math.max((data.target / maxValue) * 100, 8)

                                        return (
                                            <div key={data.month} className="flex flex-col items-center flex-1 h-full mx-1">
                                                {/* Bars container */}
                                                <div className="relative w-full flex-1 flex items-end justify-center gap-1 mb-2">
                                                    {/* Target Line - spans full width ON TOP with z-index */}
                                                    <div
                                                        className="absolute w-full border-t-2 border-dashed border-amber-500 z-30 pointer-events-none"
                                                        style={{ bottom: `${targetHeight}%` }}
                                                    >
                                                        <span className="absolute -top-4 right-0 text-[10px] text-amber-500 font-medium bg-black/50 px-1 rounded">Target</span>
                                                    </div>

                                                    {/* Last Year Bar (Previous) - left side, purple */}
                                                    <div
                                                        className="w-5/12 bg-gradient-to-t from-purple-500/60 via-purple-400/60 to-purple-300/60 rounded-t-md transition-all duration-500 hover:opacity-80 cursor-pointer group relative"
                                                        style={{ height: `${lastYearHeight}%` }}
                                                    >
                                                        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                                            ${(data.lastYear * 1000).toLocaleString()}
                                                        </div>
                                                    </div>

                                                    {/* This Year Bar (Current) - right side, blue */}
                                                    <div
                                                        className="w-5/12 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300 rounded-t-md transition-all duration-500 hover:opacity-80 cursor-pointer group relative shadow-lg shadow-blue-500/20"
                                                        style={{ height: `${thisYearHeight}%` }}
                                                    >
                                                        <div className="absolute bottom-1/2  left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-1000 pointer-events-none">
                                                            ${(data.thisYear * 1000).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Month label */}
                                                <span className="text-sm font-medium text-foreground">{data.month}</span>
                                                {/* Growth indicator */}
                                                <span className={`text-xs ${data.thisYear > data.lastYear ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    {data.thisYear > data.lastYear ? '+' : ''}{((data.thisYear - data.lastYear) / data.lastYear * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Legend - clearly separated below chart */}
                            <div className="flex justify-center gap-6 pt-4 border-t border-default-200/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-gradient-to-t from-blue-500 to-blue-300"></div>
                                    <span className="text-xs text-default-500">This Year</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-gradient-to-t from-purple-400 to-purple-200 opacity-50"></div>
                                    <span className="text-xs text-default-500">Last Year</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 border border-dashed border-amber-500"></div>
                                    <span className="text-xs text-default-500">Target</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Top Products */}
                    <Card className="bg-content1/50 backdrop-blur-sm border border-default-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Top Products</h3>
                                    <p className="text-default-500 text-sm">By revenue generated</p>
                                </div>
                                <Chip color="primary" variant="bordered">
                                    This Month
                                </Chip>
                            </div>

                            <div className="space-y-4">
                                {products.map((product, index) => {
                                    const percentage = (product.sales / 500) * 100
                                    return (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-default-100/50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg ${product.color} flex items-center justify-center`}>
                                                    <Package className="w-5 h-5 text-white" aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-foreground">{product.name}</div>
                                                    <div className="text-xs text-default-500">{product.sales} sales</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-foreground">${product.revenue.toLocaleString()}</div>
                                                <div className={`text-xs flex items-center justify-end ${product.growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    {product.growth >= 0 ? (
                                                        <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />
                                                    ) : (
                                                        <TrendingDown className="w-3 h-3 mr-1" aria-hidden="true" />
                                                    )}
                                                    {product.growth > 0 ? '+' : ''}{product.growth}%
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* Performance Metrics */}
                    <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border border-primary/20">
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-foreground">Performance</h3>
                                <Award className="w-5 h-5 text-amber-500" aria-hidden="true" />
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: 'Page Load Speed', value: '1.2s', target: '< 2s', progress: 90, color: 'success' },
                                    { label: 'API Response Time', value: '180ms', target: '< 200ms', progress: 85, color: 'primary' },
                                    { label: 'Uptime', value: '99.9%', target: '99.9%', progress: 100, color: 'emerald' },
                                    { label: 'Error Rate', value: '0.2%', target: '< 0.5%', progress: 95, color: 'warning' },
                                ].map((metric, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-foreground">{metric.label}</span>
                                            <span className="text-sm font-bold text-foreground">{metric.value}</span>
                                        </div>
                                        <Progress
                                            value={metric.progress}
                                            color={metric.color}
                                            size="sm"
                                            classNames={{
                                                track: "bg-default-100",
                                            }}
                                            aria-label={`${metric.label} progress`}
                                        />
                                        <div className="flex justify-between mt-1">
                                            <span className="text-xs text-default-500">Target: {metric.target}</span>
                                            <span className="text-xs text-default-500">{metric.progress}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="bg-content1/50 backdrop-blur-sm border border-default-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
                                    <p className="text-default-500 text-sm">Team updates</p>
                                </div>
                                <AvatarGroup max={3}>
                                    <Avatar src="https://i.pravatar.cc/150?img=1" alt="Team member 1" />
                                    <Avatar src="https://i.pravatar.cc/150?img=2" alt="Team member 2" />
                                    <Avatar src="https://i.pravatar.cc/150?img=3" alt="Team member 3" />
                                    <Avatar src="https://i.pravatar.cc/150?img=4" alt="Team member 4" />
                                </AvatarGroup>
                            </div>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide">
                                {activityLog.map((activity, index) => {
                                    const Icon = iconMap[activity.icon] || Activity
                                    return (
                                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-default-100/50 transition-colors">
                                            <div className={`p-2 rounded-lg ${activity.color}`}>
                                                <Icon className="w-4 h-4" aria-hidden="true" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-medium text-foreground">{activity.user}</span>{' '}
                                                    <span className="text-default-500">{activity.action}</span>
                                                </p>
                                                <p className="text-xs text-default-500 mt-1">{activity.time}</p>
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" role="presentation" aria-hidden="true"></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Recent Orders Table - Following HeroUI Documentation */}
            <Card className="bg-content1/50 backdrop-blur-sm border border-default-100">
                <CardBody className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>
                            <p className="text-default-500 text-sm">Latest customer transactions</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="light"
                                endContent={<ChevronRight className="w-4 h-4" />}
                                className="text-primary"
                                aria-label="View all orders"
                                onPress={() => setStatusFilter('all')}
                            >
                                View All Orders
                            </Button>
                            <p>
                                {statusFilter === 'all' ? orders.length : orders.filter(o => o.status === statusFilter).length} {statusFilter === 'all' ? 'Total' : 'filtered'}
                            </p>
                        </div>
                    </div>

                    <Table
                        isHeaderSticky
                        aria-label="Recent orders table"
                        color="primary"
                        classNames={{
                            base: "max-h-[400px] overflow-auto scrollbar-hide",
                            wrapper: "bg-transparent scrollbar-hide",
                            table: "min-w-[700px] bg-transparent",
                            thead: "",
                            th: "bg-primary/10 text-default-500 px-6 text-sm font-medium top-0 backdrop-blur-sm",
                            td: "border-b border-divider py-4 px-6",
                            tr: "hover:bg-default-100/50 transition-colors data-[selected=true]:bg-primary/10",
                        }}
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter)}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>

            {/* Order Details Modal */}
            <OrderDetailsModal 
                isOpen={isOrderModalOpen} 
                onClose={() => setIsOrderModalOpen(false)} 
                order={selectedOrder}
            />

            {/* Footer Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                    <div className="text-sm text-default-500">Monthly Goal</div>
                    <div className="text-2xl font-bold text-foreground mt-1">87%</div>
                    <Progress value={87} color="primary" size="sm" className="mt-2" aria-label="Monthly goal progress" />
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-success/10 to-emerald-500/10 border border-success/20">
                    <div className="text-sm text-default-500">Active Campaigns</div>
                    <div className="text-2xl font-bold text-foreground mt-1">12</div>
                    <div className="text-xs text-success mt-1">+2 this week</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-warning/10 to-amber-500/10 border border-warning/20">
                    <div className="text-sm text-default-500">Pending Tasks</div>
                    <div className="text-2xl font-bold text-foreground mt-1">8</div>
                    <div className="text-xs text-warning mt-1">Due today: 3</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-cyan-500/10 border border-secondary/20">
                    <div className="text-sm text-default-500">Team Members</div>
                    <div className="text-2xl font-bold text-foreground mt-1">24</div>
                    <div className="text-xs text-secondary mt-1">Online: 18</div>
                </div>
            </div>
        </div>
    )
}

// Missing icon component
const Settings = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
)
