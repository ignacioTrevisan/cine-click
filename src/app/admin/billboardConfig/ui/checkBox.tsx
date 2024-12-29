"use client"
import { UpdateBillboardConfig } from '@/app/core/use-cases/billboardConfig/updateBillboardConfig';
import React, { useState } from 'react'

interface Props {
    isChecked: boolean
    id: string,
    mode: 'NewRelease' | 'soon'
}
export const CheckBox = ({ isChecked, id, mode }: Props) => {
    //TODO: Ocupar useOptimistic
    const [isCheckedState, setIsCheckedState] = useState(isChecked);
    const toogleMode = async () => {
        const resp = await UpdateBillboardConfig({ id, mode });
        if (resp.ok) {
            setIsCheckedState(!isCheckedState);
        }
    }
    return (
        <input
            type="checkbox"
            checked={isCheckedState}
            onChange={() => toogleMode()}
        />
    )
}
