import library from '@/assets/data/library.json'
import { unknownTrackImageUri } from '@/constants/images'
import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => {
			const updatedTracks = state.tracks.map((currentTrack) =>
				currentTrack.url === track.url
					? { ...currentTrack, rating: currentTrack.rating === 1 ? 0 : 1 }
					: currentTrack,
			)
			return { tracks: updatedTracks }
		}),
	addToPlaylist: (track, playlistName) =>
		set((state) => {
			const updatedTracks = state.tracks.map((currentTrack) =>
				currentTrack.url === track.url
					? {
							...currentTrack,
							playlist: Array.from(new Set([...(currentTrack.playlist ?? []), playlistName])), // Đảm bảo không trùng playlist
						}
					: currentTrack,
			)
			return { tracks: updatedTracks }
		}),
}))

export const useTracks = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	return tracks
}

export const useFavorites = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	const favorites = tracks.filter((track) => track.rating === 1)

	return { favorites, toggleTrackFavorite }
}

export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	const artists = tracks.reduce((acc, track) => {
		const artistName = track.artist ?? 'Unknown'
		const existingArtist = acc.find((artist) => artist.name === artistName)

		if (existingArtist) {
			existingArtist.tracks.push(track)
		} else {
			acc.push({ name: artistName, tracks: [track] })
		}

		return acc
	}, [] as Artist[])

	return artists
}

export const usePlaylists = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	const playlists = tracks.reduce((acc, track) => {
		track.playlist?.forEach((playlistName) => {
			const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

			if (existingPlaylist) {
				existingPlaylist.tracks.push(track)
			} else {
				acc.push({
					name: playlistName,
					tracks: [track],
					artworkPreview: track.artwork ?? unknownTrackImageUri,
				})
			}
		})
		return acc
	}, [] as Playlist[])

	return { playlists, addToPlaylist }
}
