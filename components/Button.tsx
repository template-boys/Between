import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button as RNEButton } from 'react-native-elements';

interface Props {
    type: string,
    title: string,
    buttonStyle?: object
}

const Button = (props: Props) => {
    const backgroundColor = props.type === 'primary' ? '#3a86ff' : 'transparent'
    const borderColor = props.type === 'secondary' ? '#3a86ff' : ''
    const borderWidth = props.type === 'secondary' ? 4 : 0
    const titleStyle = props.type === 'secondary' ? { color: 'black' } : {}
    const buttonStyle = [styles.buttonStyle, { backgroundColor, borderColor, borderWidth }, props.buttonStyle]
    return (
        <RNEButton
            buttonStyle={buttonStyle}
            titleStyle={titleStyle}
            title={props.title}
            borderWith={1}
            minWidth={130}
            height={40}
        />
    )
}

export default Button


const styles = StyleSheet.create({
    buttonStyle: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 25,
    },
});
