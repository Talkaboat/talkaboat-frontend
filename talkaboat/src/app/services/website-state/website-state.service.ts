import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;

  constructor() { }
}
