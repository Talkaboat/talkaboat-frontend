export const PODCAST_API = {
  URL: "podcast",
  SEARCH_URL: "/search",
  EPISODE_DETAILS: "/episodes/{id}",
  PODCAST_DETAILS: "/{id}/{sort}/{pubdate}/{amount}",    //sort: 'asc', 'desc'
  PODCAST_EPISODES: "/{id}/episodes/{sort}/{pubdate}/{amount}",
  LIBRARY_URL: "/library",
  LIBRARY_DETAIL_URL: "/library/detail",
  LIBRARY_ADD_URL: "/library/add/{id}",
  LIBRARY_REMOVE_URL: "/library/remove/{id}",
  PLAYLIST_ADD_URL: "/playlist",
  PLAYLIST_ADD_EPISODE_URL: "/playlist/{id}/add/{episode}",
  PLAYLIST_GET_URL: "/playlist/{id}",
  PLAYLIST_GET_ALL_URL: "/playlist",
  PODCAST_RANDOM_URL: "/random/{amount}",
  PODCAST_RANDOM_W_GENRES_URL: "/random/{amount}/{genres}",
  GENRES_URL: "/genres",
}
