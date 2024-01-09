import { AfterViewInit, Component, ViewChild, OnInit, Pipe } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environment/environment';
import { ApplicationUrls } from '../../enum/application-urls';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})


export class UserTableComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'maidenName', 'age', 'gender', 'email', 'phone', 'username', 'password', 'birthDate', 'bloodGroup', 'height', 'weight', 'eyeColor'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commonService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.users = [];
    this.commonService.getRequest(environment.baseUrl + ApplicationUrls.Users).subscribe((response) => {
      if (response) {
        this.users = JSON.parse(JSON.stringify(response)).users;
      }
    });
  }

  onUserInput() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
    });
  }
  
}
