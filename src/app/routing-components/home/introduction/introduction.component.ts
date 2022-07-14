import { Component, OnInit } from '@angular/core';
import { listAnimation, listItemAnimation } from 'src/app/animations';

@Component({
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class IntroductionComponent implements OnInit {

team = [
  {
    name: "Fabian Reichenberg",
    role: "CEO",
    linkedin: 'https://www.linkedin.com/in/fabian-reichenberg-a8669b144/',
    image: './assets/images/team/fabi.jpg',
    isLoading: false
  },
  {
    name: 'David Merbitz',
    role: 'CMO',
    linkedin: 'https://www.linkedin.com/in/david-merbitz-6b8836232/',
    image: './assets/images/team/david.jpg',
    isLoading: false
  },
  {
    name: 'Felix Wildt',
    role: 'Technical Lead',
    linkedin: 'https://www.linkedin.com/in/felix-wildt-9b5124227/',
    image: './assets/images/team/felix.jpg',
    isLoading: false
  },
  {
    name: 'Alina Reichenberg',
    role: 'HR & Finance',
    linkedin: 'https://www.xing.com/profile/Alina_Reichenberg',
    image: './assets/images/team/alina.jpeg',
    isLoading: false
  },
  {
    name: 'Arianit Gecaj',
    role: 'Frontend Developer',
    linkedin: 'https://www.linkedin.com/in/arianit-gecaj-4955b4156/',
    image: './assets/images/team/ari.png',
    isLoading: false
  },
  {
    name: 'Dennis Lange',
    role: 'Backend-Developer',
    linkedin: 'https://www.linkedin.com/in/dennis-lange-186003227/',
    image: './assets/images/team/dennis.png',
    isLoading: false
  },
  {
    name: 'Alex',
    role: 'Partnership',
    image: './assets/images/team/alex.png',
    isLoading: false
  },
  {
    name: 'Marcel',
    role: 'Marketing',
    image: './assets/images/team/marcel.svg',
    isLoading: false
  },
  {
    name: 'Joscha Reichenberg',
    role: 'App & Game Developer',
    linkedin: 'https://www.linkedin.com/in/joscha-reichenberg-323396227/',
    image: './assets/images/team/joscha.png',
    isLoading: false
  },
];
  isCreator = false;
  constructor() { }

  ngOnInit(): void {
  }

}
