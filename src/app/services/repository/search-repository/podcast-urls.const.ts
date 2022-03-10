export const PODCAST_API = {
  URL: "podcast",
  SEARCH_URL: "/search",
  EPISODE_DETAILS: "/episodes/{id}",
  PODCAST_DETAILS: "/podcasts/{id}/{sort}/{pubdate}",    //sort: 'asc', 'desc'
  LIBRARY_URL: "/library",
  LIBRARY_DETAIL_URL: "/library/detail",
  LIBRARY_ADD_URL: "/library/add/{id}",
  LIBRARY_REMOVE_URL: "/library/remove/{id}",
  PLAYLIST_ADD_URL: "/playlist",
  PLAYLIST_ADD_EPISODE_URL: "/playlist/{id}/add/{episode}",
  PLAYLIST_GET_URL: "/playlist/{id}",
  PLAYLIST_GET_ALL_URL: "/playlist",
}
