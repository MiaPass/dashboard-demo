'use client'

import { Button, Chip, Tooltip, useDisclosure } from '@heroui/react'
import { Play, Pause, RotateCcw, Plus, Zap } from 'lucide-react'
import { useDashboardStore } from '../store/dashboardStore'
import AddOrderModal from './AddOrderModal'

export default function DemoControls() {
    const { isLive, toggleLiveMode, resetData, startSimulation, stopSimulation } = useDashboardStore()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <div className="flex items-center gap-2">
                <Tooltip content={isLive ? 'Pause live updates' : 'Resume live updates'}>
                    <Button
                        size="sm"
                        variant={isLive ? 'solid' : 'bordered'}
                        color={isLive ? 'success' : 'default'}
                        onPress={() => {
                            if (!isLive) {
                                startSimulation()
                            } else {
                                stopSimulation()
                            }
                            toggleLiveMode()
                        }}
                        startContent={isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        className="min-w-[100px]"
                    >
                        {isLive ? 'Live' : 'Paused'}
                    </Button>
                </Tooltip>

                <Tooltip content="Add order with form">
                    <Button
                        size="sm"
                        variant="bordered"
                        color="primary"
                        onPress={onOpen}
                        startContent={<Plus className="w-4 h-4" />}
                    >
                        Add Order
                    </Button>
                </Tooltip>

                <Tooltip content="Reset all data">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => {
                            stopSimulation()
                            resetData()
                        }}
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </Tooltip>

                {isLive && (
                    <Chip
                        color="success"
                        variant="dot"
                        size="sm"
                        className="animate-pulse"
                    >
                        <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Simulating
                        </span>
                    </Chip>
                )}
            </div>

            <AddOrderModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
