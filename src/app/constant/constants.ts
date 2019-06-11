import { HttpClient, HttpHeaders } from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const url: any = 'http://momandkidsbooks.com/';
// export const url: any = '';
