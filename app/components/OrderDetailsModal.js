'use client'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Chip,
    Badge,
    Divider
} from '@heroui/react'
import { 
    CheckCircle, 
    Clock, 
    AlertCircle, 
    Package, 
    CreditCard, 
    User,
    Calendar,
    DollarSign,
    ExternalLink,
    FileText
} from 'lucide-react'

const statusConfig = {
    completed: { label: 'Completed', color: 'success', icon: CheckCircle },
    processing: { label: 'Processing', color: 'primary', icon: Clock },
    pending: { label: 'Pending', color: 'warning', icon: Clock },
    failed: { label: 'Failed', color: 'danger', icon: AlertCircle }
}

const paymentColors = {
    'Credit Card': 'text-blue-500',
    'PayPal': 'text-blue-400',
    'Bank Transfer': 'text-emerald-500',
    'Stripe': 'text-purple-500'
}

export default function OrderDetailsModal({ isOpen, onClose, order }) {
    if (!order) return null

    const status = statusConfig[order.status]
    const StatusIcon = status.icon

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span>Order Details</span>
                                <Chip 
                                    color={status.color} 
                                    variant="bordered"
                                    size="sm"
                                    startContent={<StatusIcon className="w-3 h-3" />}
                                >
                                    {status.label}
                                </Chip>
                            </div>
                            <p className="text-sm text-default-500">{order.id}</p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-6">
                                {/* Order Summary */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <DollarSign className="w-4 h-4 text-primary" />
                                            <span className="text-sm text-default-500">Total Amount</span>
                                        </div>
                                        <p className="text-2xl font-bold">{order.amount}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-emerald-500/10 border border-success/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4 text-success" />
                                            <span className="text-sm text-default-500">Order Date</span>
                                        </div>
                                        <p className="text-lg font-semibold">{order.date}</p>
                                    </div>
                                </div>

                                <Divider />

                                {/* Customer Info */}
                                <div>
                                    <h4 className="text-sm font-medium text-default-500 mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Customer Information
                                    </h4>
                                    <div className="p-4 rounded-lg bg-default-100/50">
                                        <p className="font-semibold text-lg">{order.customer}</p>
                                        <p className="text-sm text-default-500">Customer ID: CUST-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div>
                                    <h4 className="text-sm font-medium text-default-500 mb-3 flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        Product Details
                                    </h4>
                                    <div className="p-4 rounded-lg bg-default-100/50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{order.product}</p>
                                                <p className="text-sm text-default-500">SKU: PRD-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
                                            </div>
                                            <Chip color="primary" variant="shadow">
                                                In Stock
                                            </Chip>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div>
                                    <h4 className="text-sm font-medium text-default-500 mb-3 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Payment Information
                                    </h4>
                                    <div className="p-4 rounded-lg bg-default-100/50">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-default-200 ${paymentColors[order.payment] || 'text-default-500'}`}>
                                                <CreditCard className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{order.payment}</p>
                                                <p className="text-sm text-default-500">Transaction ID: TXN-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div>
                                    <h4 className="text-sm font-medium text-default-500 mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Order Timeline
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-success"></div>
                                            <span className="text-sm">Order created</span>
                                            <span className="text-xs text-default-500 ml-auto">{order.date}</span>
                                        </div>
                                        {order.status !== 'pending' && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                <span className="text-sm">Payment confirmed</span>
                                                <span className="text-xs text-default-500 ml-auto">Just now</span>
                                            </div>
                                        )}
                                        {order.status === 'completed' && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-success"></div>
                                                <span className="text-sm">Order completed</span>
                                                <span className="text-xs text-default-500 ml-auto">Just now</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button 
                                color="primary" 
                                startContent={<ExternalLink className="w-4 h-4" />}
                                onPress={() => alert('Opening full order details...')}
                            >
                                View Full Details
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
