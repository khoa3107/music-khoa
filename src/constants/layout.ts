import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Platform } from 'react-native'
import { colors } from './tokens'

const headerStyleIos: NativeStackNavigationOptions = {
	headerLargeTitle: true, // Dùng header lớn cho iOS
	headerLargeStyle: {
		backgroundColor: colors.background,
	},
	headerLargeTitleStyle: {
		color: colors.text,
	},
	headerTintColor: colors.text,
	headerTransparent: true,
	headerBlurEffect: 'prominent',
	headerShadowVisible: false,
}

const headerStyleAndroid: NativeStackNavigationOptions = {
	headerTitleStyle: {
		fontSize: 32, // Cỡ chữ lớn trên Android
		fontWeight: 'bold',
		color: colors.text,
	},
	headerStyle: {
		backgroundColor: colors.background,
	},
	headerTintColor: colors.text,
	headerShadowVisible: false, // Tắt bóng trên Android
}

export const StackScreenWithSearchBar = (title: string): NativeStackNavigationOptions => {
	// Chọn cấu hình phù hợp cho iOS và Android
	const headerOptions = Platform.OS === 'ios' ? headerStyleIos : headerStyleAndroid

	return {
		...headerOptions,
		headerTitle: title, // Gán tiêu đề cho header
	}
}
