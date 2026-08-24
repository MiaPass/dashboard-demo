'use client'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem
} from '@heroui/react'
import { useState } from 'react'
import { useDashboardStore } from '../store/dashboardStore'

const products = [
    { name: 'Premium Plan', price: 299.99 },
    { name: 'Pro Plan', price: 199.99 },
    { name: 'Enterprise', price: 399.99 },
    { name: 'Basic Plan', price: 99.99 },
    { name: 'Starter Plan', price: 49.99 }
]

const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Stripe']

export default function AddOrderModal({ isOpen, onClose }) {
    const { addOrder } = useDashboardStore()
    const [formData, setFormData] = useState({
        customer: '',
        product: '',
        payment: 'Credit Card',
        status: 'pending'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = () => {
        if (!formData.customer || !formData.product) return

        setIsSubmitting(true)
        
        const product = products.find(p => p.name === formData.product)
        
        const newOrder = {
            id: `ORD-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
            customer: formData.customer,
            date: 'Just now',
            amount: `$${product.price}`,
            status: formData.status,
            product: formData.product,
            payment: formData.payment
        }

        addOrder(newOrder)
        
        setTimeout(() => {
            setIsSubmitting(false)
            setFormData({ customer: '', product: '', payment: 'Credit Card', status: 'pending' })
            onClose()
        }, 500)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Add New Order
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                <Input
                                    label="Customer Name"
                                    placeholder="Enter customer name"
                                    value={formData.customer}
                                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                    isRequired
                                />
                                
                                <Select
                                    label="Product"
                                    placeholder="Select a product"
                                    selectedKeys={formData.product ? [formData.product] : []}
                                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                    isRequired
                                >
                                    {products.map((product) => (
                                        <SelectItem key={product.name} value={product.name}>
                                            {product.name} - ${product.price}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Payment Method"
                                    placeholder="Select payment method"
                                    selectedKeys={[formData.payment]}
                                    onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                                >
                                    {paymentMethods.map((method) => (
                                        <SelectItem key={method} value={method}>
                                            {method}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Status"
                                    placeholder="Select status"
                                    selectedKeys={[formData.status]}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <SelectItem key="pending" value="pending">Pending</SelectItem>
                                    <SelectItem key="processing" value="processing">Processing</SelectItem>
                                    <SelectItem key="completed" value="completed">Completed</SelectItem>
                                    <SelectItem key="failed" value="failed">Failed</SelectItem>
                                </Select>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button 
                                color="primary" 
                                onPress={handleSubmit}
                                isLoading={isSubmitting}
                                isDisabled={!formData.customer || !formData.product}
                            >
                                Add Order
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
