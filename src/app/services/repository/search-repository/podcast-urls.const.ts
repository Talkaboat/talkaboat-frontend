export const PODCAST_API = {
  URL: "podcast",
  SEARCH_URL: "/search",
  TYPEAHEAD_DEFAULT_URL: "/search/typeahead/{queue}",
  EPISODE_DETAILS: "/episodes/{id}",
  PODCAST_DETAILS: "/detail",
  PODCAST_EPISODES: "/episodes",
  LIBRARY_URL: "/library",
  LIBRARY_DETAIL_URL: "/library/detail",
  LIBRARY_ADD_URL: "/library/add/{id}",
  LIBRARY_REMOVE_URL: "/library/remove/{id}",
  PLAYLIST_ADD_URL: "/playlist",
  PLAYLIST_ADD_EPISODE_URL: "/playlist/{id}/add/{episode}",
  PLAYLIST_UPDATE_EPISODE_URL: "/playlist/{id}/update/{trackId}/{position}",
  PLAYLIST_REMOVE_EPISODE_URL: "/playlist/{id}/delete/{trackId}",
  PLAYLIST_DELETE_URL: "/playlist/{id}",
  PLAYLIST_GET_URL: "/playlist/{id}",
  PLAYLIST_GET_ALL_URL: "/playlist",
  PODCAST_RANDOM_URL: "/search/random/{amount}",
  PODCAST_RANDOM_RANK_URL: "/search/random/{amount}/rank/{rank}",
  PODCAST_RANDOM_W_GENRES_URL: "/search/random/{amount}/{genres}",
  GENRES_URL: "/genres",
}
