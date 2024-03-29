// partners = [
//   {
//     name: 'The Moon',
//     role: 'Investor',
//     url: 'https://twitter.com/TheMoonCarl',
//     image: './assets/images/partners/themoon.jpg',
//     isLoading: false
//   },
//   {
//     name: 'AMCrypto',
//     role: 'Investor',
//     url: 'https://www.youtube.com/channel/UCNvJ5QckHYb3CeRBbbZry-A',
//     image: './assets/images/partners/amc.png',
//     isLoading: false
//   },
//   {
//     name: 'Cryptobeard',
//     role: 'Advisor',
//     url: 'https://www.linkedin.com/in/roman-engel-9809141ba',
//     image: './assets/images/partners/cryptobeard.png',
//     isLoading: false
//   },
//   {
//     name: 'Cryptospacefleet',
//     role: 'Partnership',
//     url: 'https://www.cryptospacefleet.com/',
//     image: './assets/images/partners/csf.png',
//     isLoading: false
//   },
//   {
//     name: 'Blockster',
//     role: 'Partnership',
//     url: 'https://blockster.com/aboat',
//     image: './assets/images/partners/bxr.png',
//     isLoading: false
//   },
//   {
//     name: "Instincy",
//     role: "Advisor & Partner",
//     url: 'https://www.instincy.com/',
//     image: './assets/images/partners/david.jpg',
//     isLoading: false
//   }
// ];
// team = [
//   {
//     name: "Fabian Reichenberg",
//     role: "CEO",
//     linkedin: 'https://www.linkedin.com/in/fabian-reichenberg-a8669b144/',
//     image: './assets/images/team/fabi.jpg',
//     isLoading: false
//   },
//   {
//     name: 'Felix Wildt',
//     role: 'Technical Lead',
//     linkedin: 'https://www.linkedin.com/in/felix-wildt-9b5124227/',
//     image: './assets/images/team/felix.jpg',
//     isLoading: false
//   },
//   {
//     name: 'Alina Reichenberg',
//     role: 'HR & Finance',
//     linkedin: 'https://www.xing.com/profile/Alina_Reichenberg',
//     image: './assets/images/team/alina.jpeg',
//     isLoading: false
//   },
//   {
//     name: 'Arianit Gecaj',
//     role: 'Frontend Developer',
//     linkedin: 'https://www.linkedin.com/in/arianit-gecaj-4955b4156/',
//     image: './assets/images/team/ari.png',
//     isLoading: false
//   },
//   {
//     name: 'Dennis Lange',
//     role: 'Backend-Developer',
//     linkedin: 'https://www.linkedin.com/in/dennis-lange-186003227/',
//     image: './assets/images/team/dennis.png',
//     isLoading: false
//   },
//   {
//     name: 'Alex',
//     role: 'Marketing',
//     image: './assets/images/team/alex.png',
//     isLoading: false
//   },
//   {
//     name: 'Alex Völkl',
//     role: 'Frontend Developer',
//     linkedin: 'https://www.linkedin.com/in/alexander-v%C3%B6lkl-9b6b7838/',
//     image: './assets/images/team/alex_v.png',
//     isLoading: false
//   },
//   {
//     name: 'Joscha Reichenberg',
//     role: 'App & Game Developer',
//     linkedin: 'https://www.linkedin.com/in/joscha-reichenberg-323396227/',
//     image: './assets/images/team/joscha.png',
//     isLoading: false
//   },
//   {
//     name: 'David Merbitz',
//     role: 'Social Media Marketing',
//     linkedin: 'https://www.linkedin.com/in/david-merbitz-6b8836232/',
//     image: './assets/images/team/david.png',
//     isLoading: false
//   },
// ];

// isCreator: boolean = false;
// items: Podcast[] = [];
// genres: Genre[] = [];

// selectedGenres: Genre[] = [];
// subscription: Subscription[] = [];
// podcastDiscoveryIsLoading = true;
// dropdownSettings: IDropdownSettings = {
//   idField: 'id',
//   enableCheckAll: false,
//   allowSearchFilter: true,
//   textField: 'name',
//   limitSelection: 3
// };
// constructor(private readonly podcastRepo: PodcastRepositoryService, private readonly mediaHelperService: MediaHelperService) { }

// ngOnInit(): void {
//   this.genres = this.mediaHelperService.genreData;
//   this.subscription.push(this.mediaHelperService.onGenreDataChanged.subscribe(genres => {
//     this.genres = genres;
//   }));
//   this.apply();
// }

// apply() {
//   this.podcastDiscoveryIsLoading = true;
//   this.items = [];
//   if (this.selectedGenres && this.selectedGenres.length > 0) {
//     this.podcastRepo.getRandomPodcastWithGenre(this.selectedGenres).subscribe(result => this.applyResults(result));
//   } else {
//     this.podcastRepo.getRandomPodcast().subscribe(result => this.applyResults(result));
//   }
// }

// applyResults(podcasts: Podcast[]) {
//   this.items = podcasts;
//   this.podcastDiscoveryIsLoading = false;
// }
