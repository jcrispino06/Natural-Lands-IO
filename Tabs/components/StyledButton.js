import { TouchableOpacity, Text, View } from "react-native"

export const StyledButton = ({label, onPress}) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}
