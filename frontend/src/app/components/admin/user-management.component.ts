import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8080/api/admin/users').subscribe(data => this.users = data);
  }

  promote(id: string) {
    this.http.put(`http://localhost:8080/api/admin/users/${id}/promote`, {}).subscribe(() => this.loadUsers());
  }

  demote(id: string) {
    this.http.put(`http://localhost:8080/api/admin/users/${id}/demote`, {}).subscribe(() => this.loadUsers());
  }

  delete(id: string) {
    this.http.delete(`http://localhost:8080/api/admin/users/${id}`).subscribe(() => this.loadUsers());
  }
}
