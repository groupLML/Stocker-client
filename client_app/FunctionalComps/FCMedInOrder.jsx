import React from 'react'
import { Card } from '@rneui/base';
import FCMedInput from './FCMedInput';
import FCQuantityInput from './FCQuantityInput';

export default function FCMedInOrder() {
    return (
        <Card>
            <FCMedInput/>
            <FCQuantityInput/>
        </Card>
    )
}