import {Component, OnInit} from '@angular/core';
import {PassObjectService} from '../../services/pass-object.service';
import {IFile} from '../../models/IFile';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-watch-videos',
  templateUrl: './watch-videos.component.html',
  styleUrls: ['./watch-videos.component.scss']
})
export class WatchVideosComponent implements OnInit {

  fileId: string;
  currentWatchFile: IFile;
  suggestedVideos: IFile[] = [];
  showSpinner = true;

  constructor(private passObjectService: PassObjectService, private activatedRoute: ActivatedRoute,
              private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.fileId = this.activatedRoute.snapshot.params.fileId;
    this.currentWatchFile = this.passObjectService.getCurrentWatchFile();
    if (!this.currentWatchFile) {
      setTimeout(() => this.getCurrentFile(), 3000);
    } else {
      this.getSuggestedVideos();
    }
  }

  getCurrentFile() {
    this.showSpinner = true;
    this.afs.collection('files').doc(this.fileId)
      .get()
      .pipe(finalize(() => this.showSpinner = false))
      .subscribe((querySnapshot) => {
        this.currentWatchFile = querySnapshot.data() as IFile;
        this.currentWatchFile.id = this.fileId;
        this.getSuggestedVideos();
      });
  }

  getSuggestedVideos() {
    this.showSpinner = true;
    this.afs.collection('files', ref =>
      ref.where('type', '>=', 'video')
    )
      .get()
      .pipe(finalize(() => this.showSpinner = false))
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const file = doc.data() as IFile;
          file.id = doc.id;
          file.views = Math.floor(Math.random() * 10000);
          this.suggestedVideos.push(file);
        });
        this.removeVideo(this.fileId);
      });
  }

  changeVideo(file: IFile) {
    this.currentWatchFile.views = Math.floor(Math.random() * 10000);
    this.suggestedVideos.push(this.currentWatchFile);
    this.currentWatchFile = file;
    this.removeVideo(file.id);
  }

  removeVideo(id) {
    this.suggestedVideos = this.suggestedVideos.filter(value => value.id !== id);

  }
}
