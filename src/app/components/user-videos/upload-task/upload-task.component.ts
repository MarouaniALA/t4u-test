import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;
  canceled: boolean;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private authService: AuthService) {
  }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    console.log(this.file);
    // The storage path
    const path = `videos/${Date.now()}_${this.file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    this.task.catch(a => {
        this.canceled = true;
      }
    );
    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.afs.collection('files').add({
          downloadURL: this.downloadURL, path,
          uid: this.authService.userData.uid,
          type: this.file.type
        });
      }),
    );
  }

  isActive(snapshot) {
    console.log(snapshot.state);
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
