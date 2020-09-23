import {Injectable} from '@angular/core';
import {IFile} from '../models/IFile';

@Injectable({
  providedIn: 'root'
})
export class PassObjectService {
  currentWatchFile: IFile;

  constructor() {
  }

  getCurrentWatchFile() {
    return this.currentWatchFile;
  }

  setCurrentWatchFile(file: IFile) {
    this.currentWatchFile = file;
  }
}
