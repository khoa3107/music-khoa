import { colors } from '@/constants/tokens'
import { useNavigation } from 'expo-router'
import { useLayoutEffect, useState } from 'react'
import { Platform, StyleSheet, TextInput } from 'react-native'
import { SearchBarProps } from 'react-native-screens'

const defaultSearchOptions: SearchBarProps = {
	tintColor: colors.primary,
	hideWhenScrolling: false,
}

// Khai báo kiểu cho props của SearchInputAndroid
interface SearchInputAndroidProps {
	value: string
	onChangeText: (text: string) => void
}

const SearchInputAndroid = ({ value, onChangeText }: SearchInputAndroidProps) => {
	return (
		<TextInput
			style={styles.searchInput}
			value={value}
			onChangeText={onChangeText} // Chỉ truyền text (string)
			placeholder="Search..."
			placeholderTextColor="#aaa"
		/>
	)
}

export const useNavigationSearch = ({
	searchBarOptions,
}: {
	searchBarOptions?: SearchBarProps
}) => {
	const [search, setSearch] = useState('')
	const navigation = useNavigation()

	const handleOnChangeText = (text: string) => {
		setSearch(text) // Cập nhật state bằng text (string)
	}

	useLayoutEffect(() => {
		const headerOptions = {
			headerTitle:
				Platform.OS === 'ios'
					? 'Songs'
					: () => <SearchInputAndroid value={search} onChangeText={handleOnChangeText} />,
			...(Platform.OS === 'ios' && {
				headerSearchBarOptions: {
					...defaultSearchOptions,
					...searchBarOptions,
					onChangeText: handleOnChangeText,
				},
			}),
		}

		navigation.setOptions(headerOptions)
	}, [navigation, search, searchBarOptions])

	return search
}

const styles = StyleSheet.create({
	searchInput: {
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 8,
		width: '100%',
		marginTop: 0,
		color: '#aaa',
		fontSize: 20,
	},
})
