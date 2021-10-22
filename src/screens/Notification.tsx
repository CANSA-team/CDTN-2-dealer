import React from 'react'
import { StyleSheet } from 'react-native'
import { Divider, List, ListItem } from '@ui-kitten/components'

export default function Notification() {

    const renderItem = ({ item, index }) => (
        <ListItem
          title={`${item.title} ${index + 1}`}
          description={`${item.description} ${index + 1}`}
        />
      );

    return (
        <>
            
        </>
    )
}
