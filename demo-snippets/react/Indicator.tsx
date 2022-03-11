import * as React from 'react';
import { Pager } from '@nativescript-community/ui-pager/react';

const items = [
    {title: "First", color: "#e67e22"},
    {title: "Second", color: "#3498db"},
    {title: "Third", color: "#e74c3c"},
    {title: "Fourth", color: "#9b59b6"},
];

interface Item {
    title: string;
    color: string;
}

const cellFactory = (item: Item) => (
    <gridLayout backgroundColor={item.color} height={{ unit: "%", value: 100 }}>
        <label 
            //@ts-ignore
            width="100%"
            text={item.title} 
            textAlignment={"center"} 
            verticalAlignment={"middle"}
            fontSize={35}
            textTransform={"uppercase"}
            color={"white"} />
    </gridLayout>
);

export function Indicator() {
    return (
        <stackLayout>
            <Pager
                height={{ unit: "dip", value: 300 }}
                items={items}
                indicator="fill"
                showIndicator={true}
                cellFactory={cellFactory} />
        </stackLayout>
    );
}
