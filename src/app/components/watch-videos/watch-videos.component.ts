import { Component, OnInit } from '@angular/core';
import {PassObjectService} from '../../services/pass-object.service';
import {IFile} from '../../models/IFile';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-watch-videos',
  templateUrl: './watch-videos.component.html',
  styleUrls: ['./watch-videos.component.scss']
})
export class WatchVideosComponent implements OnInit {

  fileId: string;
  currentWatchFile: IFile;
  suggestedVideos: IFile[] = [];
  constructor(private passObjectService: PassObjectService, private activatedRoute: ActivatedRoute,
              private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.fileId = this.activatedRoute.snapshot.params.fileId;
    this.currentWatchFile = this.passObjectService.getCurrentWatchFile();
    if (!this.currentWatchFile) {
      setTimeout(() => this.getCurrentFile(), 3000);
    }
    console.log(this.currentWatchFile);


  }

  getCurrentFile() {
      this.afs.collection('files').doc(this.fileId)
        .get().subscribe((querySnapshot) => {
        this.currentWatchFile = querySnapshot.data() as IFile;
        this.currentWatchFile.id = this.fileId;
        this.getSuggestedVideos()
        console.log(this.currentWatchFile);
      });
  }

  getSuggestedVideos() {
    this.afs.collection('files', ref =>
      ref.where('type', '>=', 'video')
    )
      .get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const file = doc.data() as IFile;
        file.id = doc.id;
        this.suggestedVideos.push(file);
        this.suggestedVideos.push(file);
        this.suggestedVideos.push(file);
        this.suggestedVideos.push(file);
      });
    });

  }
}
