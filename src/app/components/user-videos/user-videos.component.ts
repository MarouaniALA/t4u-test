import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {IFile} from '../../models/IFile';
import {Router} from '@angular/router';
import {PassObjectService} from '../../services/pass-object.service';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.scss']
})
export class UserVideosComponent implements OnInit {

  userVideos: IFile[] = [];
  files: File[] = [];
  config;
  breakpoint: number;

  constructor(public authService: AuthService, private afs: AngularFirestore, private router: Router,
              private passObjectService: PassObjectService) {
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;

    // this.authService.userData ? this.getMyVideos() :
    setTimeout(() => this.getMyVideos(), 2500);

  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  onDrop(event) {
    // console.log(files);
    this.files.push(...event.addedFiles);

  }

  getMyVideos() {
    this.afs.collection('files', ref =>
      ref.where('uid', '==', this.authService.userData.uid)
        .where('type', '>=', 'video')
    )
      .get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const file = doc.data() as IFile;
        file.id = doc.id;
        this.userVideos.push(file);
      });
    });

  }

  watchVideo(file: IFile) {
    // this.passObjectService.setCurrentWatchFile(file);
    this.router.navigate(['/watchVideos', file.id]);
  }

  logout() {
    this.authService.SignOut();
  }
}
